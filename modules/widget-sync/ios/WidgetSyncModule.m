#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WidgetSync, NSObject)

RCT_EXTERN_METHOD(updateWidget:(NSString *)jsonString
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(reloadTimelines:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
