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
 * Complete the 'gameOfThrones' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function gameOfThrones(s) {
    // Write your code here
    let arr = s.split('');
    let dict = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let myMap = new Map();
    dict.forEach(c=>{
        myMap.set(c,0);
    });
    arr.forEach(c=>{
        myMap.set(c, myMap.get(c)+1)
    });
    let oddCount = 0;
    myMap.forEach((val,_)=>{
        if(val%2 !== 0){
            ++oddCount;
        }
    });
    
    if(oddCount>1) return 'NO';
    return 'YES';

}

function gameOfThrones2(s) {
    // Write your code here
    let arr = s.split('');
    let myMap = new Map();
    arr.forEach(c=>{
        if( myMap.get(c) )
            myMap.set(c, myMap.get(c)+1)
        else
            myMap.set(c, 1)
    });
    let oddCount = 0;
    myMap.forEach((val,_)=>{
        if(val%2 !== 0){
            ++oddCount;
            if(oddCount>1){
                return 'NO';
            }
        }
    });
    return 'YES';
}

function main() {
        
    const s = readLine();
    const result = gameOfThrones(s);
    
    let ws = process.env.OUTPUT_PATH || undefined;
    if(ws != undefined) {
        ws = fs.createWriteStream(process.env.OUTPUT_PATH);
        ws.write(result + '\n');
        ws.end();
    }else{
        console.log(result);
    }
}
