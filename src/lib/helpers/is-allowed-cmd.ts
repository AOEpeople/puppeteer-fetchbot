export function isAllowedCmd(cmdName: string): boolean {

    let protectedCmdNames: string[] = [
        'root', // Determine the root node must be unique in processing file
        'maxCalls'
    ];

    return cmdName.length > 0 && protectedCmdNames.indexOf(cmdName) === -1;
}