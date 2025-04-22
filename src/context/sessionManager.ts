import { v4 as uuidv4 } from "uuid";

const DEVICE_ID_KEY = "device_id";
const PERMA_ID_KEY = "perma_id";

export function getOrCreateDeviceId(): string {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
        id = uuidv4();
        localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
}

export function getOrCreatePermaId(): string {
    let id = localStorage.getItem(PERMA_ID_KEY);
    if (!id) {
        id = uuidv4();
        localStorage.setItem(PERMA_ID_KEY, id);
    }
    return id;
}

export function clearSession() {
    localStorage.removeItem(DEVICE_ID_KEY);
    localStorage.removeItem(PERMA_ID_KEY);
}