package com.bobvu84.lunar.calendar

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.*

class WidgetSyncModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "WidgetSync"

    @ReactMethod
    fun updateWidget(jsonString: String, promise: Promise) {
        try {
            val prefs = reactApplicationContext
                .getSharedPreferences("lunar_widget_prefs", Context.MODE_PRIVATE)
            prefs.edit().putString("lunarData", jsonString).apply()
            triggerWidgetUpdate()
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("WIDGET_SYNC_ERROR", e.message)
        }
    }

    @ReactMethod
    fun reloadTimelines(promise: Promise) {
        triggerWidgetUpdate()
        promise.resolve(null)
    }

    @ReactMethod
    fun setTheme(theme: String, promise: Promise) {
        try {
            val prefs = reactApplicationContext
                .getSharedPreferences("lunar_widget_prefs", Context.MODE_PRIVATE)
            prefs.edit().putString("widgetTheme", theme).apply()
            triggerWidgetUpdate()
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("WIDGET_THEME_ERROR", e.message)
        }
    }

    private fun triggerWidgetUpdate() {
        val ctx = reactApplicationContext
        val manager = AppWidgetManager.getInstance(ctx)
        val component = ComponentName(ctx, LunarCalendarWidgetProvider::class.java)
        val ids = manager.getAppWidgetIds(component)
        val intent = Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE).apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
        }
        ctx.sendBroadcast(intent)
    }
}
