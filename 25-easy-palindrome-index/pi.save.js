'use strict';
let __ = require('../util'); // my helper functions
const dlog = __.dlog;
const log = console.log;

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

    const dlog=(...arg)=>{return;}

    let arr   = s.split('');
    let last  = arr.length -1;
    let first = 0;
    let idx_b = last; // back end
    let idx_f = first;

    const findit=( idx_f_in, idx_b_in)=>{
        let idx_f = idx_f_in;
        let idx_b = idx_b_in;
        for(; idx_f < idx_b; ++idx_f, --idx_b ) {
            if( idx_f > last ){
                return {msg:false,fi:--idx_f,bi:++idx_b};
            }
            if( idx_b < first ){
                return {msg:false,fi:--idx_f,bi:++idx_b};
            }
    
            let f = arr[idx_f]; // front
            let b = arr[idx_b]; // back
    
            if( f !== b ){
                return {msg:false,fi:idx_f,bi:idx_b};
            }
        }
        return {msg:true,fi:--idx_f,bi:++idx_b};
    } // end of findit function

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
        let robj = findit(idx_f,idx_b-1);
        if( robj.msg ){
            return idx_b;
        }
    }
    return -1;
}

function palindromeIndex_debug(s) {
    // Write your code here

    const getAscii=(c)=>{
        return c.charCodeAt(0);
    }

    let count = 0;
    let arr   = s.split('');
    let last = arr.length -1;
    let first = 0;
    let idx_b = arr.length - 1;
    let idx_f = 0;

    let rev_s   = [...arr].reverse().join('');
    __.dlog('s:',s);
    __.dlog('r:',rev_s);

    const findit=( idx_f_in, idx_b_in)=>{
        __.dlog(`func findit(idx_f:`,idx_f_in,arr[idx_f_in],`idx_b:`,idx_b_in,arr[idx_b_in]);
        let idx_f = idx_f_in;
        let idx_b = idx_b_in;
        for(; idx_f < idx_b; ++idx_f, --idx_b ) {
            __.dlog('  loop:',idx_f,arr[idx_f],':',idx_b,arr[idx_b])

            if( idx_f > last ){
                __.dlog('  idx_f:', idx_f, '> last:', last );
                __.dlog('  failed on:',idx_f,arr[idx_f],idx_b,arr[idx_b])
                return {msg:false,fi:--idx_f,bi:++idx_b};
            }
            if( idx_b < first ){
                __.dlog('  idx_b:', idx_b,'< first:', first );
                __.dlog('  failed on:',idx_f,arr[idx_f],idx_b,arr[idx_b])
                return {msg:false,fi:--idx_f,bi:++idx_b};
            }
    
            let f = arr[idx_f]; // front
            let b = arr[idx_b]; // back
    
            if( f !== b ){
                __.dlog('  failed on:',idx_f,arr[idx_f],idx_b,arr[idx_b])
                return {msg:false,fi:idx_f,bi:idx_b};
            }
        }
        __.dlog('  success on:',idx_f,arr[idx_f],idx_b,arr[idx_b])
        return {msg:true,fi:--idx_f,bi:++idx_b};
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
        __.dlog('  arr[idx_f+1] == arr[idx_b] :',arr[idx_f+1], '==', arr[idx_b]);
        let robj = findit(idx_f+1,idx_b);
        if( robj.msg ){
            return idx_f;
        }
    }
    if( bn === f ){
        __.dlog('  arr[idx_f] == arr[idx_b-1] :', arr[idx_f], '==', arr[idx_b-1]);
        let robj = findit(idx_f,idx_b-1);
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
    const vfname = __.getValidateFilename();
    let varr = [];
    if(vfname != ''){
        const vsData = fs.readFileSync(vfname,{encoding:'utf8', flag:'r'});
        varr = vsData.split('\n').map(e=>parseInt(e))
    }

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = palindromeIndex(s);

        if( ws != undefined ){
            ws.write(result + '\n');
        }else{
            if(varr.length>0){
                __.log(result, '==', varr[qItr],'<<== expected:',result===varr[qItr]);
                __.log();
            }else{
                __.log(result);
            }
        }
    }

    if( ws != undefined ){
        ws.end();
    }
}
