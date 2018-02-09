export function  isAllowedCmd(cmdName: string): boolean {
    let protectedCmdNames: string[] = [
        'root', // Determine the root node must be unique in processing file

        //'fetch' // these objects are evaluated against the page after
        // modifications have been done and converts into
        // the selector assigned datatype
    ];
    return protectedCmdNames.indexOf(cmdName) === -1;
}