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
 * Complete the 'theLoveLetterMystery' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function theLoveLetterMystery(s) {
    // Write your code here

    let count = 0;
    
    let arr = s.split('');
    
    let idx_f=0;
    let idx_b = arr.length - idx_f - 1;
    
    for(; idx_f < idx_b; ++idx_f, --idx_b ) {
        const decChar=(c)=>{
            return String.fromCharCode( c.charCodeAt(0) - 1 )
        }
        
        while( arr[idx_f] > arr[idx_b] ){
            arr[idx_f] = decChar( arr[idx_f] );
            ++count;
        }
        while( arr[idx_b] > arr[idx_f] ){
            arr[idx_b] = decChar( arr[idx_b] );
            ++count;
        }
    }

    return count;
}

function main() {

    let outpath = process.env.OUTPUT_PATH || undefined;
    let ws = undefined;
    if(outpath != undefined){
        ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    }
    
    const q = parseInt(readLine().trim(), 10);
    
    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();
        
        const result = theLoveLetterMystery(s);
        
        if(outpath != undefined){
            ws.write(result + '\n');
        }else{
            console.log(result)
        }
    }
    if(outpath != undefined){
        ws.end();
    }
}
