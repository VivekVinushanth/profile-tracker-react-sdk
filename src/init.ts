// src/init.ts
import { getAppIdFromClientId } from "./utils/app";
import {clearSession, getOrCreateDeviceId, getOrCreateProfileId} from "./context/sessionManager";
import * as analytics from "./tracker";

export interface SDKConfig {
    application_id?: string;
    orgId: string;
    baseUrl?: string;
    autoPageTrack?: boolean;
}

export interface SDKState {
    applicationId: string;
    orgId: string;
    profileId: string;
    deviceId: string;
    sessionId?: string;
    url: string; // Added URL to SDK state
    eventStreamId: string;
}

let sdkState: SDKState;

export function initSDK(config: { clientId: string | undefined; applicationId: string | undefined ; orgId: string; baseUrl?: string; eventStreamId : string | undefined }): SDKState {
    const profileId = getOrCreateProfileId();
    const deviceId = getOrCreateDeviceId();

    const applicationId = config.applicationId || "";
    const orgId = config.orgId || "";
    const baseUrl = config.baseUrl || "http://localhost:8900"; // Default base URL
    const eventStreamId = config.eventStreamId || "";
    if (!applicationId) {
        throw new Error("App ID is required (either via appId or clientId).");
    }

    sdkState = { applicationId, orgId, profileId: profileId, deviceId, url: baseUrl , eventStreamId: eventStreamId}; // Store only baseUrl in SDK state

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

export function getBaseUrl(): string {
    return getSDKState().url; // Return the base URL from the SDK state
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