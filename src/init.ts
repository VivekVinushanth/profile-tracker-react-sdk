// src/init.ts
import { getAppIdFromClientId } from "./utils/app";
import {clearSession, getOrCreateDeviceId, getOrCreateProfileId} from "./context/sessionManager";

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

let sdkState: SDKState | undefined;
let readyListeners: Array<() => void> = [];

export function initSDK(config: { clientId: string | undefined; applicationId: string | undefined ; orgId: string; baseUrl?: string; eventStreamId : string | undefined }, onReady?: () => void): SDKState {
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

    // Notify all listeners
    readyListeners.forEach(cb => cb());
    readyListeners = [];

    // If a callback is passed directly, call it
    if (onReady) onReady();

    return sdkState;
}

// Register a callback to be called when SDK is ready
export function onSDKReady(cb: () => void) {
    if (sdkState) {
        cb();
    } else {
        readyListeners.push(cb);
    }
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

// Fetch the full profile for the current user (returns the profile object or null)
export async function fetchProfile(): Promise<any | null> {
  try {
    const profileId = getProfileId();
    if (!profileId) return null;
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/v1/profiles/${profileId}`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching profile:', err);
    return null;
  }
}