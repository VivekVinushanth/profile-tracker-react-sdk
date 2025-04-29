// src/analytics.ts
import { getSDKState } from "./init";
import { v4 as uuidv4 } from "uuid";

import { collectContext } from "./context/contextCollector";
import type { IdentifyEvent, TrackEvent, PageEvent } from "./types/eventTypes";

function buildUrl(path: string): string {
    const state = getSDKState();
    return `${state.url}${path}`; // Construct full URL dynamically
}

function postEvent(payload: IdentifyEvent | TrackEvent | PageEvent, callback?: () => void) {
    const { profile_id } = payload;
    const url = buildUrl("/api/v1/events"); // Use buildUrl to construct the full URL
    const { writeKey } = getSDKState(); // ✅ Correct: destructure from object
    const token = writeKey; // Optional, you can use writeKey directly too
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ Proper Authorization header
        },
        body: JSON.stringify(payload)
    })
        .then(() => callback?.())
        .catch(console.error);
}

export function identify(eventName: string, traits: Record<string, any>, callback?: () => void) {
    const state = getSDKState();
    const context = collectContext();

    const payload: IdentifyEvent = {
        profile_id: state.profileId,
        application_id: state.applicationId,
        org_id: state.orgId,
        event_type: "Identify",
        event_name: eventName,
        event_id: uuidv4(),
        event_timestamp: Math.floor(Date.now() / 1000),
        context: {
            ...context,
            device_id: state.deviceId,
        },
        locale: context.locale,
        properties: traits
    };

    postEvent(payload, callback);
}

export function track(eventName: string, properties: Record<string, any>, callback?: () => void) {
    const state = getSDKState();
    const context = collectContext();

    const payload: TrackEvent = {
        profile_id: state.profileId,
        application_id: state.applicationId,
        org_id: state.orgId,
        event_type: "Track",
        event_name: eventName,
        event_id: uuidv4(),
        event_timestamp: Math.floor(Date.now() / 1000),
        context: {
            ...context,
            device_id: state.deviceId,
        },
        locale: context.locale,
         properties
    };

    postEvent(payload, callback);
}

export function page(eventName: string, properties: Record<string, any> = {}, callback?: () => void) {
    const state = getSDKState();
    const context = collectContext();
    const url = new URL(window.location.href);

    const payload: PageEvent = {
        profile_id: state.profileId,
        application_id: state.applicationId,
        org_id: state.orgId,
        event_type: "Page",
        event_name: "page_visited",
        event_id: uuidv4(),
        event_timestamp: Math.floor(Date.now() / 1000),
        context: {
            ...context,
            device_id: state.deviceId,
        },
        locale: context.locale,
        properties: {
            name: document.title || url.pathname,
            url: url.href,
            path: url.pathname,
            referrer: document.referrer,
            title: document.title || "",
            search: url.search,
            ...properties
        }
    };

    postEvent(payload, callback);
}
