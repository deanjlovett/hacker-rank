'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function pangrams(s: string): string {
    // Write your code here
    let myset = new Set( s.toLowerCase().split('') )
    myset.delete(' ');
    const size: number = myset.size;
    let ret: string = 'pangram';
    return size === 26 ? ret : 'not ' + ret;
}

function main() {
    
    const s: string = readLine();
    
    const result: string = pangrams(s);

    if(process.env['OUTPUT_PATH']) {
        const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);
        ws.write(result + '\n');
        ws.end();
    }else{
        console.log(result);
    }

}
