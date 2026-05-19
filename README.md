# Lịch Âm Dương — Lunar Calendar

A React Native (Expo) app displaying the Vietnamese Lunar Calendar alongside the Solar Calendar, with home-screen widget support for both iOS and Android.

---

## Features

- **Dual calendar view** — every cell shows the solar date and its Vietnamese lunar equivalent (Mùng 1, Rằm, Tháng Giêng …)
- **24 solar terms** — Lập Xuân, Xuân Phân, Thanh Minh … highlighted in the grid
- **Festivals** — Tết Nguyên Đán, Tết Trung Thu, Vu Lan, Giao Thừa … shown inline
- **Can Chi (Ganzhi)** — year, month, and day in Vietnamese Heavenly Stem / Earthly Branch notation
- **Con giáp** — Vietnamese zodiac (Tý/Chuột through Hợi/Heo; uses Mèo instead of Thỏ)
- **Day detail modal** — tap any date for the full Dương Lịch + Âm Lịch breakdown
- **Today screen** — large hero card with today's complete lunar information
- **iOS widget** — Small and Medium WidgetKit extensions (refreshes at midnight)
- **Android widget** — AppWidget with a matching red-gradient design

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18 or later |
| npm | 9 or later |
| Expo CLI | bundled via `npx` |
| Xcode | 15+ (iOS widget builds) |
| Android Studio | Hedgehog+ (Android widget builds) |
| iOS device / simulator | iOS 16+ (WidgetKit requires iOS 14+, widget previews need iOS 16+) |
| Android device / emulator | API 26+ |

---

## Installation

```bash
git clone <repo-url>
cd lunar-calendar
npm install
```

---

## Running the App

### Expo Go (quickest — no widget support)

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone, or press `i` for iOS Simulator / `a` for Android Emulator.

> **Note:** The widget tab will render a preview and setup guide, but the actual home-screen widgets require a native build (see below).

### Native build with widgets

```bash
# Generate native ios/ and android/ directories
npx expo prebuild

# iOS — opens Xcode automatically
npx expo run:ios

# Android — opens Android Studio build
npx expo run:android
```

---

## iOS Widget Setup

### 1. Generate the native project

```bash
npx expo prebuild
```

The Expo config plugin (`plugins/withLunarWidget.js`) automatically:
- Copies `ios-widget/LunarCalendarWidget.swift` into `ios/LunarCalendarWidget/`
- Adds the App Group entitlement `group.com.lunar.calendar.widget` to the main target
- Registers the `LunarCalendarWidget` extension target in the Xcode project

### 2. Open in Xcode

```bash
open ios/LunarCalendar.xcworkspace
```

### 3. Configure signing

1. Select the **LunarCalendar** target → **Signing & Capabilities**
2. Choose your Apple Developer team
3. Select the **LunarCalendarWidget** target → repeat the same signing setup
4. Verify both targets share the App Group `group.com.lunar.calendar.widget`

### 4. Build and install

Select your device or simulator in the scheme picker, then press **Run (⌘R)**.

Both the app and the widget extension are installed together.

### 5. Add the widget to your home screen

1. Long-press the home screen
2. Tap **+** (top-left)
3. Search **Lunar Calendar**
4. Choose **Small** or **Medium**
5. Tap **Add Widget**

### How data flows

The React Native app writes today's lunar data to `UserDefaults` in the shared App Group container every time the app becomes active. The widget reads from the same container and refreshes its timeline at midnight each day.

---

## Android Widget Setup

### 1. Generate the native project

```bash
npx expo prebuild
```

The Expo config plugin automatically:
- Copies `android-widget/LunarCalendarWidgetProvider.kt` into the correct Java package directory
- Copies layout, drawable, and XML resource files into `android/app/src/main/res/`
- Registers the `LunarCalendarWidgetProvider` broadcast receiver in `AndroidManifest.xml`

### 2. Open in Android Studio

```bash
open -a "Android Studio" android
# or: studio android
```

### 3. Build and run

Click **Run ▶** in Android Studio (or use the terminal):

```bash
npx expo run:android
```

### 4. Add the widget to your home screen

1. Long-press the home screen
2. Tap **Widgets**
3. Scroll to find **Lunar Calendar**
4. Drag it to the home screen

### How data flows

The React Native app writes today's lunar data to `SharedPreferences` (key `lunarData`, file `lunar_widget_prefs`) whenever the app becomes active. The widget provider reads from the same preferences and updates its `RemoteViews` on each broadcast.

---

## Project Structure

```
lunar-calendar/
├── app/
│   ├── _layout.tsx              # Root layout (expo-router); triggers widget sync
│   └── (tabs)/
│       ├── _layout.tsx          # Tab bar: Lịch / Hôm Nay / Widget
│       ├── index.tsx            # Calendar screen
│       ├── today.tsx            # Today detail screen
│       └── widget.tsx           # Widget preview + setup guide
│
├── components/
│   ├── CalendarGrid.tsx         # Month grid; builds rows of DayCell
│   ├── DayCell.tsx              # Single day cell (solar date + lunar label)
│   ├── WeekHeader.tsx           # CN T2 T3 T4 T5 T6 T7 header row
│   ├── MonthNavigator.tsx       # Prev/next month + Can Chi badge
│   └── DayDetailModal.tsx       # Slide-up modal with full date info
│
├── utils/
│   └── lunar.ts                 # Lunar calendar logic + Vietnamese translation layer
│
├── hooks/
│   └── useWidgetSync.ts         # Syncs today's lunar data to native widget storage
│
├── constants/
│   └── theme.ts                 # Colours, typography, spacing
│
├── types/
│   └── lunar-javascript.d.ts    # TypeScript declarations for lunar-javascript
│
├── modules/widget-sync/
│   ├── index.ts                 # JS API: syncWidgetData(), reloadWidget()
│   ├── ios/
│   │   ├── WidgetSyncModule.swift   # Writes to App Group UserDefaults
│   │   └── WidgetSyncModule.m       # Objective-C bridge header
│   └── android/
│       └── WidgetSyncModule.kt      # Writes to SharedPreferences + triggers update
│
├── ios-widget/
│   ├── LunarCalendarWidget.swift    # WidgetKit extension (Small + Medium views)
│   └── Info.plist                   # Extension point declaration
│
├── android-widget/
│   ├── LunarCalendarWidgetProvider.kt   # AppWidgetProvider
│   └── res/
│       ├── layout/lunar_calendar_widget.xml   # Widget layout
│       ├── drawable/widget_background.xml     # Red gradient background
│       ├── drawable/festival_badge_bg.xml     # Festival pill background
│       └── xml/lunar_calendar_widget_info.xml # Widget metadata (size, update interval)
│
├── plugins/
│   └── withLunarWidget.js       # Expo config plugin — wires widgets into native builds
│
├── app.json                     # Expo config (scheme, bundle IDs, App Group, plugins)
├── package.json
├── tsconfig.json
└── babel.config.js
```

---

## Vietnamese Localisation Notes

The underlying library (`lunar-javascript`) returns all strings in Chinese. `utils/lunar.ts` contains translation lookup tables that convert every output to Vietnamese before it reaches any component:

| Library output | Displayed |
|---|---|
| `初一` … `初十` | Mùng 1 … Mùng 10 |
| `十五` | Rằm |
| `正月` | Tháng Giêng |
| `腊月` | Tháng Chạp |
| `甲辰` | Giáp Thìn |
| `龙` | Rồng |
| `兔` | **Mèo** (Vietnam uses Cat, not Rabbit) |
| `春节` | Tết Nguyên Đán |
| `中秋节` | Tết Trung Thu |
| `立春` | Lập Xuân |

All 24 solar terms, 12 zodiac animals, 10 Heavenly Stems, 12 Earthly Branches, and ~50 festivals are fully mapped.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo` ~54 | Build toolchain + native runtime |
| `expo-router` | File-based navigation |
| `lunar-javascript` | Lunar calendar calculations |
| `react-native-safe-area-context` | Safe area insets |
| `@react-native-async-storage/async-storage` | Local storage |

---

## Troubleshooting

**Widget shows placeholder data after install**
Open the app once — the widget sync runs on every app activation and writes current data to the shared container.

**iOS build fails: "No such module WidgetKit"**
Ensure the deployment target for the `LunarCalendarWidget` extension is iOS 14.0 or later in Xcode → target → General → Minimum Deployments.

**iOS App Group entitlement mismatch**
Both the main app target and the widget extension target must have identical App Groups: `group.com.lunar.calendar.widget`. Check under Signing & Capabilities for each target.

**Android widget not appearing in widget picker**
Run `adb shell am broadcast -a android.appwidget.action.APPWIDGET_UPDATE` to force a refresh, or reinstall the app.

**`expo prebuild` overwrites my changes**
All native customisations are applied by `plugins/withLunarWidget.js` which runs automatically on every prebuild. Edit the plugin rather than editing the generated native files directly.

---

## Licence

MIT
