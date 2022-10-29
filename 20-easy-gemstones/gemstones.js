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
 * Complete the 'gemstones' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY arr as parameter.
 */

function gemstones(arr) {
    // Write your code here
    let myMap = new Map();
    arr.forEach(s=>{
        let set = new Set(s.split(''));
        let arr = [...set];
        arr.forEach(e=>{
            if(myMap.has(e)){ 
                myMap.set(e, myMap.get(e) + 1); 
            }else{             
                myMap.set(e,1);
            }
            // myMap.set(e, myMap.has(e) ? myMap.get(e) + 1 : 1 );
        });
    });
    let gemcount = 0;
    myMap.forEach(v=>{if(v==arr.length) ++gemcount;});
    return gemcount;
}

function gemstones_alt(arr) {
    // Write your code here
    let myMap = new Map();
    arr.forEach( s =>{
        let set = new Set(s.split(''));
        [...set].forEach( e =>{
            myMap.set(e, myMap.has(e) ? myMap.get(e) + 1 : 1 );
        });
    });
    let gemcount = 0;
    myMap.forEach( v =>{if(v==arr.length) ++gemcount;});
    return gemcount;
}


function main() {
    
    const n = parseInt(readLine().trim(), 10);
    
    let arr = [];
    
    for (let i = 0; i < n; i++) {
        const arrItem = readLine();
        arr.push(arrItem);
    }
    
    const result = gemstones(arr);

    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    if(process.env.OUTPUT_PATH) {
        let ws = fs.createWriteStream(process.env.OUTPUT_PATH);
        ws.write(result + '\n');
        ws.end();
    }else{
        console.log(result);
    }
}
