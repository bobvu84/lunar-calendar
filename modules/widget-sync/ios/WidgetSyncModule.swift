import Foundation
import WidgetKit

@objc(WidgetSync)
class WidgetSyncModule: NSObject {
  private let appGroupID = "group.com.lunar.calendar.widget"

  @objc
  func updateWidget(_ jsonString: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard
      let data = jsonString.data(using: .utf8),
      let defaults = UserDefaults(suiteName: appGroupID)
    else {
      reject("WIDGET_SYNC_ERROR", "Failed to encode data", nil)
      return
    }
    defaults.set(data, forKey: "lunarData")
    defaults.synchronize()
    resolve(nil)
  }

  @objc
  func reloadTimelines(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    if #available(iOS 14.0, *) {
      WidgetCenter.shared.reloadAllTimelines()
    }
    resolve(nil)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool { false }
}
