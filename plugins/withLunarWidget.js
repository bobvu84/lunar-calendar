/**
 * Expo Config Plugin — adds the Lunar Calendar widget to both iOS and Android builds.
 *
 * iOS: adds a WidgetKit extension target + App Group entitlement.
 * Android: copies the widget provider, layout, and drawable files into the
 *          generated Android project and registers them in AndroidManifest.xml.
 */

const { withXcodeProject, withEntitlementsPlist, withAndroidManifest, withDangerousMod } = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs');

const APP_GROUP = 'group.com.lunar.calendar.widget';
const WIDGET_TARGET = 'LunarCalendarWidget';
const ANDROID_PACKAGE = 'com.lunar.calendar';

// ─── iOS ──────────────────────────────────────────────────────────────────────

function withIOSAppGroup(config) {
  return withEntitlementsPlist(config, (mod) => {
    const entitlements = mod.modResults;
    const groups = entitlements['com.apple.security.application-groups'] ?? [];
    if (!groups.includes(APP_GROUP)) {
      entitlements['com.apple.security.application-groups'] = [...groups, APP_GROUP];
    }
    return mod;
  });
}

function withIOSWidgetExtension(config) {
  return withXcodeProject(config, (mod) => {
    const project = mod.modResults;
    const projectRoot = mod.modRequest.projectRoot;
    const iosDir = path.join(projectRoot, 'ios');
    const widgetDir = path.join(iosDir, WIDGET_TARGET);

    // Copy widget Swift source into ios/LunarCalendarWidget/
    if (!fs.existsSync(widgetDir)) {
      fs.mkdirSync(widgetDir, { recursive: true });
    }

    const src = path.join(projectRoot, 'ios-widget', 'LunarCalendarWidget.swift');
    const dst = path.join(widgetDir, 'LunarCalendarWidget.swift');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
    }

    const plistSrc = path.join(projectRoot, 'ios-widget', 'Info.plist');
    const plistDst = path.join(widgetDir, 'Info.plist');
    if (fs.existsSync(plistSrc)) {
      fs.copyFileSync(plistSrc, plistDst);
    }

    // Copy native WidgetSync module
    const nativeSrc = path.join(projectRoot, 'modules', 'widget-sync', 'ios');
    const nativeDst = path.join(iosDir);
    ['WidgetSyncModule.swift', 'WidgetSyncModule.m'].forEach((file) => {
      const fileSrc = path.join(nativeSrc, file);
      const fileDst = path.join(nativeDst, file);
      if (fs.existsSync(fileSrc) && !fs.existsSync(fileDst)) {
        fs.copyFileSync(fileSrc, fileDst);
      }
    });

    // Add widget extension target to the Xcode project
    const targets = project.pbxTargetByName(WIDGET_TARGET);
    if (!targets) {
      const bundleId = mod.ios?.bundleIdentifier ?? 'com.lunar.calendar';
      project.addTarget(
        WIDGET_TARGET,
        'app_extension',
        WIDGET_TARGET,
        `${bundleId}.widget`
      );
    }

    return mod;
  });
}

// ─── Android ─────────────────────────────────────────────────────────────────

function withAndroidWidget(config) {
  config = withDangerousMod(config, [
    'android',
    async (mod) => {
      const projectRoot = mod.modRequest.projectRoot;
      const androidDir = path.join(projectRoot, 'android', 'app', 'src', 'main');
      const srcWidget = path.join(projectRoot, 'android-widget');

      // Copy Kotlin provider
      const ktSrc = path.join(projectRoot, 'android-widget', 'LunarCalendarWidgetProvider.kt');
      const ktDst = path.join(
        androidDir,
        'java',
        ...ANDROID_PACKAGE.split('.'),
        'LunarCalendarWidgetProvider.kt'
      );
      if (fs.existsSync(ktSrc)) {
        fs.mkdirSync(path.dirname(ktDst), { recursive: true });
        fs.copyFileSync(ktSrc, ktDst);
      }

      // Copy WidgetSyncModule.kt
      const syncSrc = path.join(projectRoot, 'modules', 'widget-sync', 'android', 'WidgetSyncModule.kt');
      const syncDst = path.join(
        androidDir,
        'java',
        ...ANDROID_PACKAGE.split('.'),
        'WidgetSyncModule.kt'
      );
      if (fs.existsSync(syncSrc)) {
        fs.mkdirSync(path.dirname(syncDst), { recursive: true });
        fs.copyFileSync(syncSrc, syncDst);
      }

      // Copy res files
      const resDst = path.join(androidDir, 'res');
      const copyDir = (src, dst) => {
        if (!fs.existsSync(src)) return;
        fs.mkdirSync(dst, { recursive: true });
        fs.readdirSync(src).forEach((file) => {
          const s = path.join(src, file);
          const d = path.join(dst, file);
          if (fs.statSync(s).isDirectory()) copyDir(s, d);
          else fs.copyFileSync(s, d);
        });
      };

      copyDir(path.join(srcWidget, 'res', 'layout'), path.join(resDst, 'layout'));
      copyDir(path.join(srcWidget, 'res', 'xml'), path.join(resDst, 'xml'));
      copyDir(path.join(srcWidget, 'res', 'drawable'), path.join(resDst, 'drawable'));

      return mod;
    },
  ]);

  return withAndroidManifest(config, (mod) => {
    const manifest = mod.modResults;
    const app = manifest.manifest.application[0];

    // Ensure receiver is not already registered
    const receivers = app.receiver ?? [];
    const alreadyAdded = receivers.some(
      (r) => r.$?.['android:name'] === `.${ANDROID_PACKAGE}.LunarCalendarWidgetProvider`
    );

    if (!alreadyAdded) {
      app.receiver = [
        ...receivers,
        {
          $: {
            'android:name': `.LunarCalendarWidgetProvider`,
            'android:exported': 'true',
          },
          'intent-filter': [
            {
              action: [{ $: { 'android:name': 'android.appwidget.action.APPWIDGET_UPDATE' } }],
            },
          ],
          'meta-data': [
            {
              $: {
                'android:name': 'android.appwidget.provider',
                'android:resource': '@xml/lunar_calendar_widget_info',
              },
            },
          ],
        },
      ];
    }

    return mod;
  });
}

// ─── Main export ─────────────────────────────────────────────────────────────

module.exports = function withLunarWidget(config) {
  config = withIOSAppGroup(config);
  config = withIOSWidgetExtension(config);
  config = withAndroidWidget(config);
  return config;
};
