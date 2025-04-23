// src/init.ts
import { getAppIdFromClientId } from "./utils/app";
import {clearSession, getOrCreateDeviceId, getOrCreateProfileId} from "./context/sessionManager";
import * as analytics from "./tracker";

export interface SDKConfig {
    clientId?: string;
    applicationId?: string;
    orgId: string;
}

export interface SDKState {
    applicationId: string;
    orgId: string;
    profileId: string;
    deviceId: string;
    sessionId?: string;
}

let sdkState: SDKState;

export function initSDK(config: { clientId: string | undefined; applicationId: string | undefined ; orgId: string }): SDKState {
    const profileId = getOrCreateProfileId();
    const deviceId = getOrCreateDeviceId();

    const applicationId = config.clientId || getAppIdFromClientId(config.clientId);
    const orgId = config.orgId || ""
    if (!applicationId) {
        throw new Error("App ID is required (either via appId or clientId).");
    }

    sdkState = { applicationId, orgId, profileId: profileId, deviceId };

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
    return getSDKState().applicationId;
}

export function clearState() {
   return clearSession();
}