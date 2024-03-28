export function Search<T>(collection: { length: number;[index: number]: T; }, find: (n: T) => boolean): T {
    for (let i = 0; i < collection.length; i++) {
        const x = find(collection[i]);
        if (x) {
            return <T>collection[i];
        }
    }
}

export function Select<T>(collection: { length: number;[index: number]: T; }, find: (n: T) => boolean) {
    const result:Array<T> = [];
    for (let i = 0; i < collection.length; i++) {
        const x = find(collection[i]);
        if (x) {
            result.push(collection[i]);
        }
    }

    return result;
}
