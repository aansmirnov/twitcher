export const setItemToLocalStorage = <T>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
};
