// src/context/contextCollector.ts

export function collectContext() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;

    // Basic browser detection (can be enhanced)
    const browser = userAgent.includes("Chrome")
        ? "Chrome"
        : userAgent.includes("Firefox")
            ? "Firefox"
            : userAgent.includes("Safari")
                ? "Safari"
                : "Other";

    // Basic OS detection
    const os = platform.includes("Win")
        ? "Windows"
        : platform.includes("Mac")
            ? "macOS"
            : platform.includes("Linux")
                ? "Linux"
                : "Other";

    return {
        user_agent: userAgent,
        browser,
        os,
        screen: {
            width: window.screen.width,
            height: window.screen.height
        },
        locale: language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}
