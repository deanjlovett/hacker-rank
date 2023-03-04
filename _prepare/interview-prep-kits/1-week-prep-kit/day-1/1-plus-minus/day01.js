'use strict';

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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
    // Write your code here
    let count_pos  = 0;
    let count_neg  = 0;
    let count_zero = 0;
    arr.forEach(e => {
        if(      e>0)   {++count_pos;}
        else if( e<0)   {++count_neg;}
        else /* e==0 */ {++count_zero;}        
    });
    function mylog(n){
        console.log( Number.parseFloat( n/arr.length ).toFixed(6) );
    }
    mylog( count_pos  );
    mylog( count_neg  );
    mylog( count_zero );
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
