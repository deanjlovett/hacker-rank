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
 * Complete the 'shortestReach' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY edges
 *  3. INTEGER s
 */

// const dlog = __.dlog;

function shortestReach(n, edges_in, s) {
    // Write your code here

    // comment out to add debug statements
    function dlog(...args){return;}

    __.dlog(`function bfs(nodes:${n}, edges, start:${s}) {`);
    __.dlog()
    let edges = [];
    
    edges = edges_in;

    __.dlog();
    __.dlog('array of edges:');
    __.dlog('[');
    edges.forEach((e,i)=>{
        __.dlog('  [',e[0],',',e[1],',',e[2],']');
    });
    __.dlog(']');
    __.dlog();
    
    let myMap = new Map();
    let myNodeSet = new Set();
    let myNS = new Map();

    edges.forEach((e,i,arr)=>{
        let a = e[0];
        let b = e[1];
        let d = e[2];
        if( a > b ) {
            a = e[1];
            b = e[0];    
        }
        if( myNS.has(a) ){
            let node = myNS.get(a);
            if( ! node.has(b) || node.get(b) > d){
                node.set(b,d);
            }
        }else{
            // myNS.set(a,(new Map([b,d])));
            let newMap = new Map();
            newMap.set(b,d);
            myNS.set(a,newMap);
        }
        myNodeSet.add(a);
        myNodeSet.add(b);
    });
    // if the starting node is not in our node list
    // then there is no need to calculate anything
    // since the start node is unreachable
    if( ! myNodeSet.has(s) ){
        return new Array(n-1).fill(-1);
    }

    __.dlog(`myNS:`);
    __.dlog(myNS);

    __.dlog(`myNodeSet:`);
    __.dlog(myNodeSet);

    function AddToMap(keyOne,keyTwo,dist){
        // dlog(`    inside function AddToMap(keyOne:${keyOne},keyTwo:${keyTwo},dist:${dist}){`);
        if( myMap.has(keyOne) ){
            let it = myMap.get(keyOne);
            if( !it.childs.has(keyTwo) || it.childs.get(keyTwo) > dist ){
                it.childs.set(keyTwo , dist);
            }
        }else{
            let tmap = new Map();
            tmap.set(keyTwo , dist); // formerly tset
            let myObj = 
            {
                isTop: false,
                key: keyOne,
                childs: tmap, // map key: node number, value: edge length
                dist:-1, // dist to source
            };
            myMap.set(keyOne,myObj);
        }
    }
    
    myNS.forEach((valNodeTwoObj,keyNodeOne)=>{
        valNodeTwoObj.forEach((valDist,keyNodeTwo)=>{
            AddToMap(keyNodeOne,keyNodeTwo,valDist);
            AddToMap(keyNodeTwo,keyNodeOne,valDist);
        });
    });


    __.dlog('=========================================');
    __.dlog('=========================================');
    __.dlog('=========================================');

    let ret = [];
    let wq = [];
    __.dlog(`looking for start:${s} in myMap`)
    __.dlog(`myMap.has(s) === ${myMap.has(s)}`)
    if( ! myMap.has(s) ){
        clog(`*** s:${s} not in myMap **`);
        return new Array(n-1).fill(-1);
    }
    // let start = myMap.get(s);
    let start = myMap.get(s);
    start.isTop = true;
    start.dist = 0;
    // since start obj changed put it back in the map
    // may not be needed
    myMap.set(s,start);
    wq.push( start );

    __.dlog(`start obj:`, JSON.stringify(start));
    __.dlog(`object s added to work queue`);

    // we will keep dumping node in the list so long as their distance 
    // to the source keeps going down
    while(wq.length >0 ){
        __.dlog('=========================================');
        __.dlog('=========================================');
        __.dlog(`inside while(wq.length:${wq.length} > 0)`);

        let w = wq.shift();// pop from front

        __.dlog(`  work: `, JSON.stringify(w));
        __.dlog(`  work: `, JSON.stringify(w));
        __.dlog(`  work: `, JSON.stringify(w));
        __.dlog(w);

        if(w.dist === -1 ) __.dlog(`  ****** error: work.dist == -1 *******`);

        let wchildarr = [... w.childs]; //.sort((a,b)=>a-b); //<= may not need to sort
        __.dlog(`  wchildarr:`,wchildarr);
        __.dlog(`  entering wchildarr.forEach(...), wchildarr.length:`,wchildarr.length);
        w.childs.forEach((vdist,k,map)=>{
            if( k === s ){
                return;
            }
            let echild = myMap.get(k);
            if(    echild.dist === -1 
                || w.dist + vdist < echild.dist
            ){
                echild.dist = w.dist + vdist;
                wq.push(echild);
            }
        });
    }
    __.dlog();
    __.dlog(`myMap:`);
    __.dlog(myMap);
    __.dlog();

    __.dlog(`myNodeSet.length:`,myNodeSet.size);
    __.dlog(`looping through nodes. node count:`,n);
    for(let i=1; i<=n; ++i){
        __.dlog('  loop, i:',i)
        if( i === s) {
            __.dlog(`    i:${i} == s:${s}, skip, continue`);
            continue;
        }

        if( myMap.has(i)){
            let node = myMap.get(i);
            __.dlog(`node:`, node)
            ret.push(node.dist)
        }else{
            __.dlog(`no node with key:`, i);
            __.dlog(`myMap`, myMap)
            ret.push(-1)
        }
    }
    __.dlog('==============================');
    __.dlog(ret);
    __.dlog('==============================');
    return ret;
}

function shortestReach2(n, edges_in, s) {
    // Write your code here

    let edges = [];
    edges = edges_in;
    let myMap = new Map();
    let myNodeSet = new Set();
    let myNS = new Map();

    edges.forEach((e,i,arr)=>{
        let a = e[0];
        let b = e[1];
        let d = e[2];
        if( a > b ) {
            a = e[1];
            b = e[0];    
        }
        if( myNS.has(a) ){
            let node = myNS.get(a);
            if( ! node.has(b) || node.get(b) > d){
                node.set(b,d);
            }
        }else{
            // myNS.set(a,(new Map([b,d])));
            let newMap = new Map();
            newMap.set(b,d);
            myNS.set(a,newMap);
        }
        myNodeSet.add(a);
        myNodeSet.add(b);
    });
    // if the starting node is not in our node list
    // then there is no need to calculate anything
    // since the start node is unreachable
    if( ! myNodeSet.has(s) ){
        return new Array(n-1).fill(-1);
    }

    function AddToMap(keyOne,keyTwo,dist){
        // dlog(`    inside function AddToMap(keyOne:${keyOne},keyTwo:${keyTwo},dist:${dist}){`);
        if( myMap.has(keyOne) ){
            let it = myMap.get(keyOne);
            if( !it.childs.has(keyTwo) || it.childs.get(keyTwo) > dist ){
                it.childs.set(keyTwo , dist);
            }
        }else{
            let tmap = new Map();
            tmap.set(keyTwo , dist); // formerly tset
            let myObj = 
            {
                isTop: false,
                key: keyOne,
                childs: tmap, // map key: node number, value: edge length
                dist:-1, // dist to source
            };
            myMap.set(keyOne,myObj);
        }
    }
    
    myNS.forEach((valNodeTwoObj,keyNodeOne)=>{
        valNodeTwoObj.forEach((valDist,keyNodeTwo)=>{
            AddToMap(keyNodeOne,keyNodeTwo,valDist);
            AddToMap(keyNodeTwo,keyNodeOne,valDist);
        });
    });

    let ret = [];
    let wq = [];

    if( ! myMap.has(s) ){
        clog(`*** s:${s} not in myMap **`);
        return new Array(n-1).fill(-1);
    }
    // let start = myMap.get(s);
    let start = myMap.get(s);
    start.isTop = true;
    start.dist = 0;
    // since start obj changed put it back in the map
    // may not be needed
    myMap.set(s,start);
    wq.push( start );

    // we will keep dumping node in the list so long as their distance 
    // to the source keeps going down
    while(wq.length >0 ){

        let w = wq.shift();// pop from front

        // if(w.dist === -1 ) __.dlog(`  ****** error: work.dist == -1 *******`);

        w.childs.forEach((vdist,k,map)=>{
            if( k === s ){
                return;
            }
            let echild = myMap.get(k);
            if(    echild.dist === -1 
                || w.dist + vdist < echild.dist
            ){
                echild.dist = w.dist + vdist;
                wq.push(echild);
            }
        });
    }

    for(let i=1; i<=n; ++i){
        if( i === s) {
            continue;
        }

        if( myMap.has(i)){
            let node = myMap.get(i);
            ret.push(node.dist)
        }else{
            ret.push(-1)
        }
    }
    return ret;
}

function main() {
    // original
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    // 
    ////////////////////
    // my new code below
    //
    if(!__.parseCommandLineArgs('dsr2')){
        return 0;
    }
    
    let output_path = process.env.OUTPUT_PATH
    if( output_path === undefined ){
        output_path = 'output.txt'
    }
    const ws = fs.createWriteStream(output_path);
    // my new code above
    ////////////////////

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine().trim(), 10);

        const result = shortestReach(n, edges, s);

        ws.write(result.join(' ') + '\n');

        ////////////////////
        // my new code below
        //
        if( output_path === 'output.txt'){
            __.clog('result:');
            __.clog(result);
            __.clog();
            __.slog(result)
        }
        // my new code above
        ////////////////////

    }

    ws.end();
}
