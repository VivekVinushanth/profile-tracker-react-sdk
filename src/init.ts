// src/init.ts
import { getAppIdFromClientId } from "./utils/app";
import { getOrCreateDeviceId, getOrCreatePermaId } from "./context/sessionManager";
import * as analytics from "./tracker";

export interface SDKConfig {
    clientId?: string;
    appId?: string;
}

export interface SDKState {
    appId: string;
    permaId: string;
    deviceId: string;
    sessionId?: string;
}

let sdkState: SDKState;

export function initSDK(config: { clientId: string | undefined; appId: string | undefined }): SDKState {
    const permaId = getOrCreatePermaId();
    const deviceId = getOrCreateDeviceId();

    const appId = config.clientId || getAppIdFromClientId(config.clientId);
    if (!appId) {
        throw new Error("App ID is required (either via appId or clientId).");
    }

    sdkState = { appId, permaId, deviceId };

    // Auto-fire page event using analytics wrapper
    setTimeout(() => {
        analytics.identify("init", { appId });
    }, 0);

    // Auto-fire page event using analytics wrapper
    setTimeout(() => {
        analytics.page("page_visited");
    }, 0);

    return sdkState;
}

export function getSDKState(): SDKState {
    if (!sdkState) throw new Error("SDK not initialized");
    return sdkState;
}

export function getPermaId(): string {
    return getSDKState().permaId;
}

export function getAppId(): string {
    return getSDKState().appId;
}
