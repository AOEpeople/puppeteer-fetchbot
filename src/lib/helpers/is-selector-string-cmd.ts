export function isSelectorStringCmd(isPageCommand: boolean, params: any): boolean {
    return isPageCommand === true && typeof params === 'string';
}
