package com.lunar.calendar

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import org.json.JSONException
import org.json.JSONObject
import java.util.Calendar

class LunarCalendarWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        appWidgetIds.forEach { id ->
            updateWidget(context, appWidgetManager, id)
        }
    }

    private fun updateWidget(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int
    ) {
        val views = RemoteViews(context.packageName, R.layout.lunar_calendar_widget)

        // Read shared data written by the React Native app
        val prefs = context.getSharedPreferences("lunar_widget_prefs", Context.MODE_PRIVATE)
        val json = prefs.getString("lunarData", null)

        val solarDay: String
        val lunarFull: String
        val ganZhiZodiac: String
        val festival: String

        if (json != null) {
            try {
                val obj = JSONObject(json)
                val now = Calendar.getInstance()
                val day = obj.optInt("solarDay", now.get(Calendar.DAY_OF_MONTH))
                val month = obj.optInt("solarMonth", now.get(Calendar.MONTH) + 1)
                solarDay = String.format("%02d/%02d", day, month)
                val lunarMonth = obj.optString("lunarMonth", "")
                val lunarDay = obj.optString("lunarDay", "")
                lunarFull = "$lunarDay $lunarMonth"
                val ganZhiYear = obj.optString("ganZhiYear", "")
                val zodiac = obj.optString("zodiac", "")
                ganZhiZodiac = "Năm $ganZhiYear · $zodiac"
                val fest = obj.optString("festival", "")
                val term = obj.optString("solarTerm", "")
                festival = when {
                    fest.isNotEmpty() -> fest
                    term.isNotEmpty() -> term
                    else -> ""
                }
            } catch (e: JSONException) {
                return
            }
        } else {
            val now = Calendar.getInstance()
            solarDay = String.format("%02d/%02d", now.get(Calendar.DAY_OF_MONTH), now.get(Calendar.MONTH) + 1)
            lunarFull = ""
            ganZhiZodiac = ""
            festival = ""
        }

        views.setTextViewText(R.id.widget_solar_day, solarDay)
        views.setTextViewText(R.id.widget_lunar_full, lunarFull)
        views.setTextViewText(R.id.widget_ganzhi, ganZhiZodiac)
        views.setTextViewText(R.id.widget_festival, festival)
        views.setViewVisibility(
            R.id.widget_festival,
            if (festival.isEmpty()) android.view.View.GONE else android.view.View.VISIBLE
        )

        // Tap opens the app
        val intent = context.packageManager.getLaunchIntentForPackage(context.packageName)
        if (intent != null) {
            val pendingIntent = PendingIntent.getActivity(
                context, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)
        }

        appWidgetManager.updateAppWidget(appWidgetId, views)
    }
}
