export const getItemFromLocalStorage = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);

    if (!item) {
        return null;
    }

    const parsedItem = JSON.parse(item) as T;
    return parsedItem;
};
