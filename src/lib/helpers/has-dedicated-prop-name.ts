export function hasDedicatedPropName(key): boolean {
    const hasDedicatedPropName: RegExp = new RegExp('\\S\\sas\\s\\S', 'i');
    return key.match(hasDedicatedPropName) !== null;
}