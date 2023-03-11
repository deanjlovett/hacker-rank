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
 * Complete the 'cookies' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY A
 */
let insert = (elem, arr)=>{
    return arr.splice( loc(elem,arr)+1,0,elem);
}
let loc = (elem, arr, start, end) => {
    start = start || 0;
    end = end || arr.length;
    let pivot = parseInt( start +(end-start)>>>1,10);
    return
        arr[pivot] < elem ?
        loc(elem, arr, pivot, end) :
        loc(elem, arr, start, pivot);
}

function cookies(k, A) {
    // Write your code here
    let ma = [...A];
    ma.sort((a,b)=>(a-b));
    let count = 0;
    while(ma[0]<k && ma.length>1){
        // ma.unshift( ma.shift() + 2*ma.shift() );
        // ma.sort((a,b)=>(a-b));
        let nn = ma.shift() + 2*ma.shift();
        insert(nn,ma);
        ++count;
    }
    if( ma[0]<k) return -1;
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

    const result = cookies(k, A);

    ws.write(result + '\n');

    ws.end();
}
