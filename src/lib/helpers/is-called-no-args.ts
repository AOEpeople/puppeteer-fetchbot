export function isCallNoArgs(isPageCommand: boolean, params: any): boolean {
    return isPageCommand === true && params === null;
}