// src/analytics.ts
import { getSDKState } from "./init";
import { v4 as uuidv4 } from "uuid";

import { collectContext } from "./context/contextCollector";
import type { IdentifyEvent, TrackEvent, PageEvent } from "./types/eventTypes";

function postEvent(payload: IdentifyEvent | TrackEvent | PageEvent, callback?: () => void) {
    const { perma_id } = payload;
    fetch(`http://localhost:8080/api/v1/event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(() => callback?.())
        .catch(console.error);
}

export function identify(eventName: string, traits: Record<string, any>, callback?: () => void) {
    const state = getSDKState();
    const context = collectContext();

    const payload: IdentifyEvent = {
        perma_id: state.permaId,
        app_id: state.appId,
        event_type: "Identify",
        event_name: eventName,
        event_id: uuidv4(),
        event_timestamp: new Date().toISOString(),
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
        perma_id: state.permaId,
        app_id: state.appId,
        event_type: "Track",
        event_name: eventName,
        event_id: uuidv4(),
        event_timestamp: new Date().toISOString(),
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
        perma_id: state.permaId,
        app_id: state.appId,
        event_type: "Page",
        event_name: "page_visited",
        event_id: uuidv4(),
        event_timestamp: new Date().toISOString(),
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
