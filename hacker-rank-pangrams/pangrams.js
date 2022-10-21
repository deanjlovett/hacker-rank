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
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function pangrams(s) {
    // Write your code here
    
    let myset = new Set( s.toLowerCase().split('') )
    myset.delete(' ');
    return myset.size === 26 ? 'pangram' : 'not pangram';
}

function main() {
    
    const s = readLine();
    const result = pangrams(s);
    
    if(process.env.OUTPUT_PATH) {
        const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
        ws.write(result + '\n');
        ws.end();
    }else{
        console.log(result);
    }
}
