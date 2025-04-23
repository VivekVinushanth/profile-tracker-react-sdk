// src/init.ts
import { getAppIdFromClientId } from "./utils/app";
import {clearSession, getOrCreateDeviceId, getOrCreateProfileId} from "./context/sessionManager";
import * as analytics from "./tracker";

export interface SDKConfig {
    clientId?: string;
    appId?: string;
    orgId: string;
}

export interface SDKState {
    appId: string;
    orgId: string;
    profileId: string;
    deviceId: string;
    sessionId?: string;
}

let sdkState: SDKState;

export function initSDK(config: { clientId: string | undefined; appId: string | undefined ; orgId: string }): SDKState {
    const profileId = getOrCreateProfileId();
    const deviceId = getOrCreateDeviceId();

    const appId = config.clientId || getAppIdFromClientId(config.clientId);
    const orgId = config.orgId || ""
    if (!appId) {
        throw new Error("App ID is required (either via appId or clientId).");
    }

    sdkState = { appId, orgId, profileId: profileId, deviceId };

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

export function getProfileId(): string {
    return getSDKState().profileId;
}

export function getAppId(): string {
    return getSDKState().appId;
}

export function clearState() {
   return clearSession();
}