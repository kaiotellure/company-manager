export function getDatabase<T>(name: string): T | false {
    const raw = localStorage.getItem(name);
    if (!raw) return false;

    return JSON.parse(raw);
}

export function setDatabase(name: string, data: any) {
    const raw = JSON.stringify(data);
    localStorage.setItem(name, raw);
}
