// src/types/eventTypes.ts
import { Context } from "./contextTypes";

export type EventType = "Page" | "Track" | "Identify";

export interface BaseEvent {
    profile_id: string;
    application_id: string;
    org_id: string,
    event_type: EventType;
    event_name: string;
    event_id: string;
    event_timestamp: number;
    context: Context;
    locale?: string;
    properties?: Record<string, any>;
}

export interface PageEvent extends BaseEvent {
    event_type: "Page";
    event_name: "page_visited";
    properties: {
        name: string;
        url: string;
        path: string;
        referrer?: string;
        title: string;
        search?: string;
        category?: string;
        type?: string;
        content_type?: string;
        scroll_depth?: string;
        utm_source?: string;
        utm_medium?: string;
        utm_campaign?: string;
        utm_term?: string;
        utm_content?: string;
        engagement?: {
            score?: number;
            interactive_elements?: string[];
        };
        [key: string]: any;
    };
}

export interface TrackEvent extends BaseEvent {
    event_type: "Track";
    event_name: string;
    properties: {
        action?: string;
        object_type?: string;
        object_id?: string;
        object_name?: string;
        value?: number;
        label?: string;
        source?: string;
        url?: string;
        referrer?: string;
        [key: string]: any;
    };
}

export interface IdentifyEvent extends BaseEvent {
    event_type: "Identify";
    event_name: string; // e.g., "user_logged_in", "guest_user_session_init"
    properties: {
        user_id?: string;
        email?: string;
        first_name?: string;
        last_name?: string;
        [key: string]: any;
    };
}
