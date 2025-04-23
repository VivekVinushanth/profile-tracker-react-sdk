// src/components/AnalyticsProvider.tsx
import React, { useEffect } from "react";
import { initSDK } from "./init";
import * as analytics from "./tracker";


type AnalyticsProviderProps = {
    clientId?: string;
    applicationId?: string;
    orgId: string;
    children: React.ReactNode;
    autoPageTrack?: boolean;
};

export const AnalyticsProvider = ({
                                      clientId,
                                      applicationId, orgId,
                                      children,
                                      autoPageTrack = true
                                  }: AnalyticsProviderProps) => {
    useEffect(() => {
        initSDK({ clientId, applicationId , orgId});
        if (autoPageTrack) {
            analytics.page("page_visited");
        }
    }, []);

    return <>{children}</>;
};
