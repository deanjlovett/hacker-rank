'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'twoStrings' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */

function twoStrings(s1, s2) {
    // Write your code here
    let sa1Set = new Set(s1.split(''));
    for( let c2 of s2 ) {
        if( sa1Set.has(c2)) return 'YES'
    }
    return 'NO'
}

function twoStrings_old(s1, s2) {
    // Write your code here
    let sa1Set = new Set(s1.split(''));
    let sa2Set = new Set(s2.split(''));

    for( let c1 of sa1Set ) {
        if( sa2Set.has(c1)) return 'YES'
    }
    return 'NO'
}

function main() {

    const ws = undefined;
    if(process.env.OUTPUT_PATH){
        ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    }

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s1 = readLine();
        const s2 = readLine();

        const result = twoStrings(s1, s2);
        
        if(ws != undefined){
            ws.write(result + '\n');
        }else{
            console.log(result);
        }
    }

    if(ws != undefined){
        ws.end();
    }
}
