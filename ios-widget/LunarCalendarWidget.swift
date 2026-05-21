import WidgetKit
import SwiftUI

// MARK: - Data model shared with the React Native app via App Groups

struct LunarData: Codable {
    var solarDay: Int
    var solarMonth: Int
    var solarYear: Int
    var lunarDay: String
    var lunarMonth: String
    var ganZhiYear: String
    var zodiac: String
    var festival: String
    var solarTerm: String
    var updatedAt: TimeInterval

    static var placeholder: LunarData {
        LunarData(
            solarDay: 1, solarMonth: 1, solarYear: 2025,
            lunarDay: "Mùng 1", lunarMonth: "Tháng Giêng",
            ganZhiYear: "Giáp Thìn", zodiac: "Rồng",
            festival: "", solarTerm: "",
            updatedAt: Date().timeIntervalSince1970
        )
    }

    static func load() -> LunarData {
        let appGroupID = "group.com.lunar.calendar.widget"
        guard
            let defaults = UserDefaults(suiteName: appGroupID),
            let data = defaults.data(forKey: "lunarData"),
            let decoded = try? JSONDecoder().decode(LunarData.self, from: data)
        else {
            return .placeholder
        }
        return decoded
    }

    static func loadTheme() -> String {
        UserDefaults(suiteName: "group.com.lunar.calendar.widget")?.string(forKey: "widgetTheme") ?? "dark"
    }
}

// MARK: - Timeline Entry

struct LunarEntry: TimelineEntry {
    let date: Date
    let lunarData: LunarData
    let isDark: Bool
}

// MARK: - Timeline Provider

struct LunarProvider: TimelineProvider {
    func placeholder(in context: Context) -> LunarEntry {
        LunarEntry(date: Date(), lunarData: .placeholder, isDark: true)
    }

    func getSnapshot(in context: Context, completion: @escaping (LunarEntry) -> Void) {
        completion(LunarEntry(date: Date(), lunarData: LunarData.load(), isDark: LunarData.loadTheme() == "dark"))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<LunarEntry>) -> Void) {
        let now = Date()
        let entry = LunarEntry(date: now, lunarData: LunarData.load(), isDark: LunarData.loadTheme() == "dark")

        var components = Calendar.current.dateComponents([.year, .month, .day], from: now)
        components.day! += 1
        components.hour = 0
        components.minute = 0
        let midnight = Calendar.current.date(from: components) ?? now.addingTimeInterval(86400)

        let timeline = Timeline(entries: [entry], policy: .after(midnight))
        completion(timeline)
    }
}

// MARK: - Theme colours

private struct WidgetTheme {
    let bgStart: Color
    let bgEnd: Color
    let dayColor: Color
    let lunarColor: Color
    let ganZhiColor: Color
    let festivalColor: Color
    let festivalBg: Color
    let divider: Color
}

private let darkTheme = WidgetTheme(
    bgStart:      Color(red: 26/255,  green: 39/255,  blue: 68/255),
    bgEnd:        Color(red: 10/255,  green: 15/255,  blue: 30/255),
    dayColor:     Color(red: 245/255, green: 200/255, blue: 66/255),
    lunarColor:   .white.opacity(0.9),
    ganZhiColor:  .white.opacity(0.55),
    festivalColor: Color(red: 245/255, green: 200/255, blue: 66/255),
    festivalBg:   Color(red: 245/255, green: 200/255, blue: 66/255).opacity(0.15),
    divider:      Color(red: 245/255, green: 200/255, blue: 66/255).opacity(0.25)
)

private let lightTheme = WidgetTheme(
    bgStart:      Color(red: 192/255, green: 57/255,  blue: 43/255),
    bgEnd:        Color(red: 146/255, green: 43/255,  blue: 33/255),
    dayColor:     .white,
    lunarColor:   .white.opacity(0.9),
    ganZhiColor:  .white.opacity(0.65),
    festivalColor: Color(red: 243/255, green: 156/255, blue: 18/255),
    festivalBg:   .white.opacity(0.15),
    divider:      .white.opacity(0.25)
)

// MARK: - Small Widget View

struct SmallWidgetView: View {
    let entry: LunarEntry
    private var t: WidgetTheme { entry.isDark ? darkTheme : lightTheme }

    var body: some View {
        ZStack {
            LinearGradient(colors: [t.bgStart, t.bgEnd], startPoint: .topLeading, endPoint: .bottomTrailing)

            VStack(spacing: 2) {
                Text(String(format: "%02d/%02d", entry.lunarData.solarDay, entry.lunarData.solarMonth))
                    .font(.system(size: 44, weight: .bold, design: .rounded))
                    .foregroundColor(t.dayColor)
                    .lineLimit(1)
                    .minimumScaleFactor(0.6)

                Text(entry.lunarData.lunarDay + " " + entry.lunarData.lunarMonth)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(t.lunarColor)

                Text("Năm " + entry.lunarData.ganZhiYear + " · " + entry.lunarData.zodiac)
                    .font(.system(size: 10, weight: .regular))
                    .foregroundColor(t.ganZhiColor)
                    .padding(.top, 2)

                if !entry.lunarData.festival.isEmpty || !entry.lunarData.solarTerm.isEmpty {
                    let label = entry.lunarData.festival.isEmpty ? entry.lunarData.solarTerm : entry.lunarData.festival
                    Text(label)
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundColor(t.festivalColor)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(t.festivalBg)
                        .clipShape(Capsule())
                        .padding(.top, 2)
                }
            }
            .padding()
        }
    }
}

// MARK: - Medium Widget View

struct MediumWidgetView: View {
    let entry: LunarEntry
    private let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    private var t: WidgetTheme { entry.isDark ? darkTheme : lightTheme }

    var body: some View {
        ZStack {
            LinearGradient(colors: [t.bgStart, t.bgEnd], startPoint: .topLeading, endPoint: .bottomTrailing)

            HStack(spacing: 0) {
                VStack(spacing: 0) {
                    Text("\(entry.lunarData.solarDay)")
                        .font(.system(size: 64, weight: .bold, design: .rounded))
                        .foregroundColor(t.dayColor)
                    Text(months[max(0, entry.lunarData.solarMonth - 1)])
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(t.lunarColor)
                    Text("\(entry.lunarData.solarYear)")
                        .font(.system(size: 11))
                        .foregroundColor(t.ganZhiColor)
                }
                .frame(width: 110)

                Rectangle()
                    .fill(t.divider)
                    .frame(width: 1)
                    .padding(.vertical, 20)

                VStack(alignment: .leading, spacing: 4) {
                    Text(entry.lunarData.lunarDay + " " + entry.lunarData.lunarMonth)
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundColor(t.lunarColor)

                    Text("Năm " + entry.lunarData.ganZhiYear)
                        .font(.system(size: 13))
                        .foregroundColor(t.lunarColor.opacity(0.85))

                    Text(entry.lunarData.zodiac)
                        .font(.system(size: 12))
                        .foregroundColor(t.ganZhiColor)

                    if !entry.lunarData.festival.isEmpty || !entry.lunarData.solarTerm.isEmpty {
                        let label = entry.lunarData.festival.isEmpty ? entry.lunarData.solarTerm : entry.lunarData.festival
                        Text(label)
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundColor(t.festivalColor)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(t.festivalBg)
                            .clipShape(Capsule())
                    }
                }
                .padding(.leading, 16)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(.horizontal, 16)
        }
    }
}

// MARK: - Widget Entry View

struct LunarCalendarWidgetEntryView: View {
    @Environment(\.widgetFamily) var family
    var entry: LunarEntry

    var body: some View {
        switch family {
        case .systemSmall:  SmallWidgetView(entry: entry)
        case .systemMedium: MediumWidgetView(entry: entry)
        default:            SmallWidgetView(entry: entry)
        }
    }
}

// MARK: - Widget Configuration

@main
struct LunarCalendarWidget: Widget {
    let kind = "LunarCalendarWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: LunarProvider()) { entry in
            LunarCalendarWidgetEntryView(entry: entry)
                .containerBackground(entry.isDark
                    ? Color(red: 10/255, green: 15/255, blue: 30/255)
                    : Color(red: 192/255, green: 57/255, blue: 43/255),
                    for: .widget)
        }
        .configurationDisplayName("Lunar Calendar")
        .description("Today's date in both Solar and Lunar calendars.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

// MARK: - Xcode Previews

@available(iOS 17.0, *)
#Preview("Small – Dark", as: .systemSmall) {
    LunarCalendarWidget()
} timeline: {
    LunarEntry(date: .now, lunarData: .placeholder, isDark: true)
}

@available(iOS 17.0, *)
#Preview("Small – Light", as: .systemSmall) {
    LunarCalendarWidget()
} timeline: {
    LunarEntry(date: .now, lunarData: .placeholder, isDark: false)
}

@available(iOS 17.0, *)
#Preview("Medium – Dark", as: .systemMedium) {
    LunarCalendarWidget()
} timeline: {
    LunarEntry(date: .now, lunarData: .placeholder, isDark: true)
}
