'use strict';
let __ = require('../util');

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
 * Complete the 'palindromeIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function palindromeIndex(s) {
    // Write your code here

    const getAscii=(c)=>{
        return c.charCodeAt(0);
    }

    let count = 0;
    let arr   = s.split('');
    let idx_b = arr.length - 1;
    let idx_f = 0;

    let rev_s   = arr.reverse().join('');
    __.dlog('s:',s);
    __.dlog('r:',rev_s);

    const findit=( idx_f_in, idx_b_in)=>{
        let idx_f = idx_f_in;
        let idx_b = idx_b_in;
        for(; idx_f < idx_b; ++idx_f, --idx_b ) {
    
            let f = arr[idx_f]; // front
            let b = arr[idx_b]; // back
    
            if( f === b ){
                ++idx_f;
                --idx_b;
            }else{
                return {msg:false,fi:idx_f,bi:idx_b};
            }
        }
        return {msg:true,fi:idx_f,bi:idx_b};
    }
    let robj = findit(idx_f,idx_b);
    if( robj.msg ){
        return -1;
    }
    idx_f = robj.fi;
    idx_b = robj.bi;
    let f = arr[idx_f]; // front
    let b = arr[idx_b]; // back
    let fn = arr[idx_f+1]; // front -> next
    let bn = arr[idx_b-1]; // back  <- next
    
    if( fn === b ){
        let robj = findit(idx_f+1,idx_b);
        if( robj.msg ){
            return idx_f;
        }
    }
    if( bn === f ){
        let robj = findit(idx_f,idx_b+1);
        if( robj.msg ){
            return idx_b;
        }
    }
    return -1;
}

function main() {

    if(!__.parseCommandLineArgs('pi')){
        return 0;
    }    

    let ws = undefined;
    if( process.env.OUTPUT_PATH ){
        ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    }

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = palindromeIndex(s);

        if( ws != undefined ){
            ws.write(result + '\n');
        }else{
            __.log(result);
        }
    }

    if( ws != undefined ){
        ws.end();
    }
}
