export function isAllowedCmd(cmdName: string): boolean {

    let protectedCmdNames: string[] = [
        'root', // Determine the root node must be unique in processing file
        'maxCalls'
    ];

    return protectedCmdNames.indexOf(cmdName) === -1;
}