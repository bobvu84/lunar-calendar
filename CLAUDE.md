# Lunar Calendar — Claude Project Context

> **Expo SDK 54**: Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

---

## Project Overview

A React Native (Expo) app displaying the Vietnamese Lunar Calendar alongside the Solar Calendar, with home-screen widget support for iOS and Android.

**App entry**: `expo-router/entry` (file-based routing under `app/`)  
**Package manager**: npm with `--legacy-peer-deps` (peer dep conflict between expo-router and react)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Expo SDK ~54 |
| Navigation | expo-router ~6.0.23 (file-based) |
| Lunar data | `lunar-javascript` ^1.7.7 |
| Language | TypeScript (strict mode) |
| iOS widget | WidgetKit (Swift, App Groups) |
| Android widget | AppWidget (Kotlin, SharedPreferences) |

---

## Project Structure

```
lunar-calendar/
├── app/
│   ├── _layout.tsx              # Root layout; triggers widget sync on activation
│   └── (tabs)/
│       ├── _layout.tsx          # Tab bar: Lịch / Hôm Nay / Widget
│       ├── index.tsx            # Calendar screen (month grid)
│       ├── today.tsx            # Today detail screen (hero card)
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
│   └── lunar.ts                 # ALL lunar logic + Vietnamese translation layer
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
│   └── Info.plist
│
├── android-widget/
│   ├── LunarCalendarWidgetProvider.kt
│   └── res/
│       ├── layout/lunar_calendar_widget.xml
│       ├── drawable/widget_background.xml
│       ├── drawable/festival_badge_bg.xml
│       └── xml/lunar_calendar_widget_info.xml
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

## Core Logic: `utils/lunar.ts`

This is the single source of truth for all lunar calendar data. The `lunar-javascript` library returns **all strings in Chinese** — `lunar.ts` translates everything to Vietnamese before it reaches any component.

### Translation Tables

| Table | Purpose |
|-------|---------|
| `LUNAR_MONTHS_VI` | `正` → `Tháng Giêng` … `腊` → `Tháng Chạp` |
| `LUNAR_MONTHS_SHORT_VI` | Abbreviated months for small calendar cells |
| `LUNAR_DAYS_VI` | `初一` → `Mùng 1`, `十五` → `Rằm` … `三十` → `30` |
| `HEAVENLY_STEMS_VI` | `甲` → `Giáp` … `癸` → `Quý` (10 stems) |
| `EARTHLY_BRANCHES_VI` | `子` → `Tý` … `亥` → `Hợi` (12 branches) |
| `ZODIAC_VI` | `兔` → **`Mèo`** (Vietnam uses Cat, not Rabbit), `龙` → `Rồng` … |
| `SOLAR_TERMS_VI` | All 24 solar terms (Lập Xuân, Xuân Phân …) |
| `FESTIVALS_VI` | ~55 lunar + solar festivals |

### Key Translation Functions

```typescript
// Splits "甲辰" → ["甲","辰"] → ["Giáp","Thìn"] → "Giáp Thìn"
function translateGanZhi(cn: string): string

// Exact match first, then prefix match for decorated strings like "母亲节（五月第二个星期日）"
function translateFestivals(list: string[]): string[]

function translateSolarTerms(list: string[]): string[]
```

### `getLunarInfo(year, month, day): LunarDayInfo`

Returns all lunar data for a given solar date, fully translated to Vietnamese:
- `lunarMonthStr` — `Tháng Giêng`, `Tháng Hai` …
- `lunarMonthShort` — `Th.Giêng` (for small cells)
- `lunarDayStr` — `Mùng 1`, `Rằm`, `16` …
- `isLeapMonth` — `lunarMonth < 0` from the library
- `ganZhiYear/Month/Day` — e.g. `Giáp Thìn`
- `zodiac` — e.g. `Rồng`
- `festivals` — lunar festivals, translated
- `solarFestivals` — solar festivals, translated
- `solarTerms` — e.g. `Lập Xuân`
- `lunarFull` — `Mùng 1 Tháng Giêng, Năm Giáp Thìn`
- `isFirstDayOfMonth` — `Math.abs(lunarDay) === 1`

### `buildCalendarMonth(year, month): CalendarDay[]`

Builds grid cells including padding days from prev/next month.  
**Current label priority** (cells show only lunar info — no festivals, no solar terms):
```typescript
let displayLabel = lunar.lunarDayStr;
let labelType: CalendarDay['labelType'] = 'lunar';
// First day of lunar month: show month name instead of day number
if (lunar.isFirstDayOfMonth) {
  displayLabel = lunar.lunarMonthShort;
  labelType = 'leapMonth';
}
```

---

## Widget Data Flow

### iOS (WidgetKit)
- App writes to `UserDefaults` in App Group `group.com.lunar.calendar.widget`
- Widget reads same container and refreshes timeline at midnight
- Module: `modules/widget-sync/ios/WidgetSyncModule.swift`
- Widget UI: `ios-widget/LunarCalendarWidget.swift`

### Android (AppWidget)
- App writes JSON to `SharedPreferences` (key `lunarData`, file `lunar_widget_prefs`)
- Widget reads on each broadcast
- Module: `modules/widget-sync/android/WidgetSyncModule.kt`
- Widget UI: `android-widget/LunarCalendarWidgetProvider.kt`

### Data written by `useWidgetSync.ts`
```json
{
  "solarDay": 1,
  "lunarDay": "Mùng 1",
  "lunarMonth": "Tháng Giêng",
  "ganZhiYear": "Giáp Thìn",
  "zodiac": "Rồng",
  "festival": "Tết Nguyên Đán",
  "solarTerm": ""
}
```

---

## Vietnamese Localisation Rules

- **Con giáp**: Vietnam uses **Mèo** (Cat) for the 4th zodiac, not Thỏ (Rabbit)
- **Leap months**: prefix `Nhuận ` (long) or `Nh.` (short) before the month name
- **Day 1**: show month name in cell instead of `Mùng 1`
- **Day 15**: `Rằm`
- **Days 1–10**: `Mùng 1` … `Mùng 10`
- **Days 11–30**: plain numbers except Rằm
- **Week header**: `CN T2 T3 T4 T5 T6 T7` (Chủ Nhật = Sunday)
- **Festival fallback**: `translateFestivals` uses prefix-match so `"母亲节（五月第二个星期日）"` still maps to `Ngày của Mẹ`

---

## UI Screens

| Screen | File | Key content |
|--------|------|-------------|
| Calendar | `app/(tabs)/index.tsx` | Month grid, month navigator, day detail modal |
| Today | `app/(tabs)/today.tsx` | Hero card with full lunar info, week day in Vietnamese |
| Widget preview | `app/(tabs)/widget.tsx` | Preview of iOS/Android widget + setup guide |

### `DayDetailModal.tsx`
Shows on tap of any calendar cell. Displays:
- Solar date (full format)
- `lunar.lunarFull` — the complete lunar string
- `lunar.ganZhiYear/Month/Day`
- `lunar.zodiac`
- `lunar.festivals` + `lunar.solarFestivals` — all translated via `translateFestivals`
- `lunar.solarTerms` — translated via `translateSolarTerms`

---

## Running the App

```bash
cd lunar-calendar
npm install --legacy-peer-deps
npx expo start          # Expo Go (no widget support)
npx expo start --web    # Web browser
```

### Native build (required for widgets)
```bash
npx expo prebuild
npx expo run:ios        # opens Xcode
npx expo run:android    # opens Android Studio
```

---

## Known Pitfalls

- `lunar-javascript` has no TypeScript types — declarations are in `types/lunar-javascript.d.ts`
- `lunar.getMonth()` returns a **negative number** for leap months — always use `Math.abs()` when comparing
- `solar.getOtherFestivals()` returns decorated strings (e.g. `"母亲节（五月第二个星期日）"`) — `translateFestivals` handles this with prefix matching
- `npx expo install` (not `npm install`) should be used to add new packages to keep SDK 54 version alignment
- Always use `--legacy-peer-deps` for plain `npm install`
- The Expo config plugin (`plugins/withLunarWidget.js`) re-runs on every `expo prebuild` — edit the plugin, not the generated native files
