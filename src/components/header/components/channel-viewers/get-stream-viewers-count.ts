export const getStreamViewersCount = (count: number): string | number => {
    if (count < 1000) {
        return count;
    }

    const value = count / 1000;
    const result = value.toString().includes('.') ? value.toFixed(1) : value;

    return `${result}K`;
};
