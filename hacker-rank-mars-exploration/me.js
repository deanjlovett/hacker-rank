'use strict';
const fs = require('fs');
let __ = require('../util');

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
 * Complete the 'marsExploration' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function marsExploration(s) {
    // Write your code here
    const key='SOS';
    let sa = s.toUpperCase().split('');
    let count = 0;
    // for(let i=0,j=1,k=2; i<s.length; i+=3,j+=3,k+=3){
    //     if( sa[i] != key[0]) ++count; 
    //     if( sa[j] != key[1]) ++count; 
    //     if( sa[k] != key[2]) ++count;
    // }
    for(let i=0; i<s.length; ){
        for(let j=0;j<3;++j,++i){
            if( sa[i] != key[j]){
                ++count; 
            } 
        }
    }

    return count;
}

function main() {

    if( ! __.parseCommandLineArgs() ){
        return 0;
    }

    const s = readLine();

    const result = marsExploration(s);
    
    if( process.env.OUTPUT_PATH ) {
        const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
        ws.write(result + '\n');
        ws.end();
    }else{
        __.clog(result);
        __.slog(result);
    }

}
