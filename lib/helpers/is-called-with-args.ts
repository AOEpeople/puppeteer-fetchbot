export function isCallWithArgs(isPageCommand: boolean, params: any): boolean {
    return isPageCommand === true && params instanceof Array;
}