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

    // new algorithm: O(n)

    const getAscii=(c)=>{
        return c.charCodeAt(0);
    }

    let count = 0;
    let arr   = s.split('');
    let idx_b = arr.length - 1;
    let idx_f = 0;

    for(; idx_f < idx_b; ++idx_f, --idx_b ) {

        let f = arr[idx_f]; // front
        let b = arr[idx_b]; // back

        if( f > b ){
            count += getAscii(f) - getAscii(b);
        }
        else if( b > f ){
            count += getAscii(b) - getAscii(f);
        }
    }

    return count;
}

function theLoveLetterMystery_old(s) {
    // Write your code here

    // old algorithm: O(n^2)

    const decChar=(c)=>{
        return String.fromCharCode( c.charCodeAt(0) - 1 )
    }

    let count = 0;
    
    let arr = s.split('');
    
    let idx_f=0;
    let idx_b = arr.length - 1;
    
    for(; idx_f < idx_b; ++idx_f, --idx_b ) {
        
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

        /* 
        todo: djl, 2022-10-30
        rework to calc the character distance 
        rather than walking it in a while loop:
        example C code:
        
        for( ; pfront < p_back; ++pfront, --p_back ){
            if(      *pfront > *p_back ){ count += *pfront - *p_back;} 
            else if( *p_back > *pfront ){ count += *p_back - *pfront;}
        }    
        */

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
