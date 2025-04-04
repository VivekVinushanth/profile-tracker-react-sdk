// src/components/AnalyticsProvider.tsx
import React, { useEffect } from "react";
import { initSDK } from "./init";
import * as analytics from "./tracker";


type AnalyticsProviderProps = {
    clientId?: string;
    appId?: string;
    children: React.ReactNode;
    autoPageTrack?: boolean;
};

export const AnalyticsProvider = ({
                                      clientId,
                                      appId,
                                      children,
                                      autoPageTrack = true
                                  }: AnalyticsProviderProps) => {
    useEffect(() => {
        initSDK({ clientId, appId });
        if (autoPageTrack) {
            analytics.page("page_visited");
        }
    }, []);

    return <>{children}</>;
};
