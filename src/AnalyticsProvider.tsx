// src/components/AnalyticsProvider.tsx
import React, {useEffect} from "react";
import { initSDK } from "./init";
import * as analytics from "./tracker";
import { useRef } from "react";


type AnalyticsProviderProps = {
    clientId?: string;
    applicationId?: string;
    orgId: string;
    eventStreamId?: string;
    children: React.ReactNode;
    autoPageTrack?: boolean;
};

export const AnalyticsProvider = ({
                                      clientId,
                                      applicationId, orgId,
                                      eventStreamId,
                                      children,
                                      autoPageTrack = true
                                  }: AnalyticsProviderProps) => {

    useEffect(() => {
        initSDK({ clientId, applicationId , orgId, eventStreamId });
        if (autoPageTrack) {
            analytics.page("page_visited");
        }
    }, []);

    return <>{children}</>;
};
