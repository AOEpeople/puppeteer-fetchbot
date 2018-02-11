export function isFetchJobCmd(isPageCommand: boolean, params: any, commandName: string): boolean {
    const notAnArray = !(params instanceof Array);
    const notNull = params !== null;
    return isPageCommand === false && notAnArray && notNull && typeof params === 'object' && commandName === 'fetch';
}