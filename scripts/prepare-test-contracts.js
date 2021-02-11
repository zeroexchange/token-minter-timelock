const fs = require('fs');

const stuffToReplace = [
    { 
        inFile: "Transferer.sol", 
        replace: "uint constant TIME_DELAY = 30 days;", 
        with: "uint constant TIME_DELAY = 5 seconds;",
    },
    {
        inFile: "Transferer.sol", 
        replace: "contract Transferer", 
        with: "contract TestTransferer",
    },
];

const files = {};

for (const stuff of stuffToReplace) {
    const contents = files[stuff.inFile] || fs.readFileSync('contracts/' + stuff.inFile, "utf-8");
    
    // replaces only first occurrence
    const modified = contents.replace(stuff.replace, stuff.with);

    if (contents === modified) 
        throw new Error(`Couldn't replace "${stuff.replace}" in file "${stuff.inFile}"`);

    files[stuff.inFile] = modified;
}

for (const [fileName, contents] of Object.entries(files)) {
    fs.writeFileSync('contracts/Test' + fileName, contents);
}
