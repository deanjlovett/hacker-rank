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
 * Complete the 'alternatingCharacters' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternatingCharacters(s) {
    // Write your code here
    let a = s.split('');
    let count = 0;
    for(let i=0,j=1; j<a.length; ++j,++i){
        if( a[i] == a[j] ) ++count;
    }
    return count;
}

function main() {
    const q = parseInt(readLine().trim(), 10);
    
    let ws = process.env.OUTPUT_PATH || undefined;
    if(ws != undefined) ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();
        const result = alternatingCharacters(s);
        if( ws != undefined ){
            ws.write(result + '\n');
        }else{
            console.log(result);
        }
    }
    if( ws != undefined ) ws.end();
}
