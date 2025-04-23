import { v4 as uuidv4 } from "uuid";

const DEVICE_ID_KEY = "device_id";
const PROFILE_ID_KEY = "profile_id";

export function getOrCreateDeviceId(): string {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
        id = uuidv4();
        localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
}

export function getOrCreateProfileId(): string {
    let id = localStorage.getItem(PROFILE_ID_KEY);
    if (!id) {
        id = uuidv4();
        localStorage.setItem(PROFILE_ID_KEY, id);
    }
    return id;
}

export function clearSession() {
    localStorage.removeItem(DEVICE_ID_KEY);
    localStorage.removeItem(PROFILE_ID_KEY);
}