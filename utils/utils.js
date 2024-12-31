export function tryCatch(func) {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
}

export const getMaxByField = (array, field) => {
    if (array.length === 0) return null;
    return array.reduce((max, obj) => (obj[field] > max[field] ? obj : max));
};