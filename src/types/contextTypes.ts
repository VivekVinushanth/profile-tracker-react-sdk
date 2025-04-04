export interface ScreenInfo {
    width: number;
    height: number;
}

export interface Context {
    user_agent: string;
    browser: string;
    os: string;
    screen: ScreenInfo;
    locale: string;
    timezone: string;
    device_id: string;
}
