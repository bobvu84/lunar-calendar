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
}

// MARK: - Timeline Entry

struct LunarEntry: TimelineEntry {
    let date: Date
    let lunarData: LunarData
}

// MARK: - Timeline Provider

struct LunarProvider: TimelineProvider {
    func placeholder(in context: Context) -> LunarEntry {
        LunarEntry(date: Date(), lunarData: .placeholder)
    }

    func getSnapshot(in context: Context, completion: @escaping (LunarEntry) -> Void) {
        completion(LunarEntry(date: Date(), lunarData: LunarData.load()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<LunarEntry>) -> Void) {
        let now = Date()
        let lunarData = LunarData.load()
        let entry = LunarEntry(date: now, lunarData: lunarData)

        // Refresh at midnight each day
        var components = Calendar.current.dateComponents([.year, .month, .day], from: now)
        components.day! += 1
        components.hour = 0
        components.minute = 0
        let midnight = Calendar.current.date(from: components) ?? now.addingTimeInterval(86400)

        let timeline = Timeline(entries: [entry], policy: .after(midnight))
        completion(timeline)
    }
}

// MARK: - Colour helpers

private let navyDeep    = Color(red: 10/255,  green: 15/255,  blue: 30/255)
private let navySurface = Color(red: 26/255,  green: 39/255,  blue: 68/255)
private let goldColor   = Color(red: 245/255, green: 200/255, blue: 66/255)

// MARK: - Small Widget View  (155 × 155 pt)

struct SmallWidgetView: View {
    let entry: LunarEntry

    var body: some View {
        ZStack {
            LinearGradient(
                colors: [navySurface, navyDeep],
                startPoint: .topLeading, endPoint: .bottomTrailing
            )

            VStack(spacing: 2) {
                Text(String(format: "%02d/%02d", entry.lunarData.solarDay, entry.lunarData.solarMonth))
                    .font(.system(size: 44, weight: .bold, design: .rounded))
                    .foregroundColor(goldColor)
                    .lineLimit(1)
                    .minimumScaleFactor(0.6)

                Text(entry.lunarData.lunarDay + " " + entry.lunarData.lunarMonth)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(.white.opacity(0.9))

                Text("Năm " + entry.lunarData.ganZhiYear + " · " + entry.lunarData.zodiac)
                    .font(.system(size: 10, weight: .regular))
                    .foregroundColor(.white.opacity(0.55))
                    .padding(.top, 2)

                if !entry.lunarData.festival.isEmpty || !entry.lunarData.solarTerm.isEmpty {
                    let label = entry.lunarData.festival.isEmpty
                        ? entry.lunarData.solarTerm
                        : entry.lunarData.festival
                    Text(label)
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundColor(goldColor)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(goldColor.opacity(0.15))
                        .clipShape(Capsule())
                        .padding(.top, 2)
                }
            }
            .padding()
        }
    }
}

// MARK: - Medium Widget View  (329 × 155 pt)

struct MediumWidgetView: View {
    let entry: LunarEntry
    private let months = ["Jan","Feb","Mar","Apr","May","Jun",
                          "Jul","Aug","Sep","Oct","Nov","Dec"]

    var body: some View {
        ZStack {
            LinearGradient(
                colors: [navySurface, navyDeep],
                startPoint: .topLeading, endPoint: .bottomTrailing
            )

            HStack(spacing: 0) {
                // Left: big solar day
                VStack(spacing: 0) {
                    Text("\(entry.lunarData.solarDay)")
                        .font(.system(size: 64, weight: .bold, design: .rounded))
                        .foregroundColor(goldColor)
                    Text(months[max(0, entry.lunarData.solarMonth - 1)])
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.white.opacity(0.75))
                    Text("\(entry.lunarData.solarYear)")
                        .font(.system(size: 11))
                        .foregroundColor(.white.opacity(0.45))
                }
                .frame(width: 110)

                // Divider
                Rectangle()
                    .fill(goldColor.opacity(0.25))
                    .frame(width: 1)
                    .padding(.vertical, 20)

                // Right: lunar info
                VStack(alignment: .leading, spacing: 4) {
                    Text(entry.lunarData.lunarDay + " " + entry.lunarData.lunarMonth)
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundColor(.white)

                    Text("Năm " + entry.lunarData.ganZhiYear)
                        .font(.system(size: 13))
                        .foregroundColor(.white.opacity(0.75))

                    Text(entry.lunarData.zodiac)
                        .font(.system(size: 12))
                        .foregroundColor(.white.opacity(0.55))

                    if !entry.lunarData.festival.isEmpty || !entry.lunarData.solarTerm.isEmpty {
                        let label = entry.lunarData.festival.isEmpty
                            ? entry.lunarData.solarTerm
                            : entry.lunarData.festival
                        Text(label)
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundColor(goldColor)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(goldColor.opacity(0.15))
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
        case .systemSmall:
            SmallWidgetView(entry: entry)
        case .systemMedium:
            MediumWidgetView(entry: entry)
        default:
            SmallWidgetView(entry: entry)
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
                .containerBackground(navyDeep, for: .widget)
        }
        .configurationDisplayName("Lunar Calendar")
        .description("Today's date in both Solar and Lunar calendars.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

// MARK: - Xcode Previews

@available(iOS 17.0, *)
#Preview("Small", as: .systemSmall) {
    LunarCalendarWidget()
} timeline: {
    LunarEntry(date: .now, lunarData: .placeholder)
}

@available(iOS 17.0, *)
#Preview("Medium", as: .systemMedium) {
    LunarCalendarWidget()
} timeline: {
    LunarEntry(date: .now, lunarData: .placeholder)
}
