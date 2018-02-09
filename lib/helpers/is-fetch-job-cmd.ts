export function isFetchJobCmd(isPageCommand: boolean, params: any, commandName: string): boolean {
    return isPageCommand === false && typeof params === 'object' && commandName === 'fetch';
}