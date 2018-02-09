export function hasDedicatedPropName(key): boolean {
    const hasDedicatedPropName: RegExp = new RegExp(' as ');
    return key.match(hasDedicatedPropName) !== null;
}