// src/utils/app.ts
export function getAppIdFromClientId(clientId?: string): string | undefined {
    // Placeholder logic — eventually map clientId to appId from config or env
    if (!clientId) return undefined;
    return clientId; // just echoing clientId as appId for now
}
