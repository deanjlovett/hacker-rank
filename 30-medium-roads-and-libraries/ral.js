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

const clog = __.clog;
const dlog = __.dlog;


/*
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c_lib
 *  3. INTEGER c_road
 *  4. 2D_INTEGER_ARRAY cities
 */

function roadsAndLibraries_debug(n, c_lib, c_road, cities) {
    // Write your code here
    //      n : # of cities
    //  c_lib : cost to build lib
    // c_road : cost to build road
    // cities : connections between cities

    // function clog(...args){return;}
    dlog('inside roadsAndLibraries()');
    dlog(' # cities:', n);
    dlog(' lib cost:', c_lib);
    dlog('road cost:', c_road);

    let cn = [0];
    for(let i=1;i<=n;++i){
        cn.push({n:i,cns:new Set()});
    }
    let proads = [...cities];
    proads.sort((a,b)=>{
        if(a[0]!=b[0]) return a[0]-b[0]; 
        return a[1]-b[1]; 
    });
    dlog('proads: size:',proads.size);
    dlog(proads.size);
    let emptyc = 0;
    proads.forEach
    dlog(proads);

    let myMast = new Set();
    let myMap = new Map();
    let myNodeSet = new Set();
    let myNS = new Map();
    for(let i=1;i<=n;++i){
        // myNS.set(i,new Map());
        myNS.set(i,new Set());
    }

    proads.forEach((e,i,arr) => {
        let a = e[0];
        let b = e[1];
        // let d = 1; // c_road;
        if( a > b ) {
            a = e[1];
            b = e[0];    
        }
        if( myNS.has(a) ){
            let node = myNS.get(a);
            node.add(b); // node.set(b,d);
            node = myNS.get(b);
            node.add(a); // node.set(b,d);
        }
        // else{
        //     let newMap = new Map();
        //     newMap.add(b); // newMap.set(b,d);
        //     myNS.set(a,newMap);
        // }
        myNodeSet.add(a);
        myNodeSet.add(b);
    });
    function AddToMap(keyOne,keyTwo,dist){
        // dlog(`    inside function AddToMap(keyOne:${keyOne},keyTwo:${keyTwo},dist:${dist}){`);
        if( myMap.has(keyOne) ){
            let it = myMap.get(keyOne);
            if( !it.childs.has(keyTwo) && keyTwo>keyOne) { // } || it.childs.get(keyTwo) > dist ){
                it.childs.add(keyTwo); // .set(keyTwo , dist);
            }
        }else{
            let tmap = new Set(); // new Map();
            if( keyTwo>keyOne ){
                tmap.add(keyTwo); // .set(keyTwo , dist); // formerly tset
            }
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
    dlog()
    dlog('myNS:')
    dlog(myNS)
    myNS.forEach((valNodeTwoObj,keyNodeOne)=>{
        valNodeTwoObj.forEach((valDist,keyNodeTwo)=>{
            AddToMap(keyNodeOne,keyNodeTwo,valDist);
            AddToMap(keyNodeTwo,keyNodeOne,valDist);
        });
    });
    dlog()
    dlog('myMap:')
    dlog(myMap)


    function eatTheChilds(idx,depth){
        // dlog(`eatTheChilds(idx:${idx},depth:${depth})`)
        let count = 0;
        if( myMap.has(idx) ) {
            myMast.add(idx);
            let obj = myMap.get(idx);
            dlog('obj.childs:');
            dlog(obj.childs);
            obj.childs.forEach((e)=>{
                if( ! myMast.has(e) ) {
                    count += 1 + eatTheChilds(e,depth+1);
                }
            });
        }
        if( depth>0) {
            myMap.delete(idx);
        }
        return count;
    }
    for(let i=1; i<=n; ++i){
        if( ! myMap.has(i) ) {
            myMap.set(i,
                {
                    isTop: true,
                    key: i,
                    childs: new Set(), // map key: node number, value: edge length
                    dist:-1, // dist to source
                }
            );
        }
    }
    for(let i=1; i<=n; ++i){
        if( myMap.has(i) ) {
            // myMast.add(i);
            let obj = myMap.get(i);
            obj.dist = eatTheChilds(i,0);
        }
    }
    dlog()
    dlog('myMap:')
    dlog(myMap)
    clog()
    clog(' # cities:', n);
    clog(' lib cost:', c_lib);
    clog('road cost:', c_road);
    clog()
    
    let justLibs = n * c_lib;
    let libsNRoads = c_lib * myMap.size;
    clog(' node groups   :', myMap.size);
    clog(' libs cost     :', myMap.size, '*',c_lib,'=',libsNRoads);
    clog(' # roads       :');
    let roads =0;
    let roadtc =0
    myMap.forEach(e=>{
        roads += e.dist;
        // if(e.dist>0) clog('               :',e.dist,c_road * e.dist);
        roadtc += c_road * e.dist
    });
    clog(' # roads       :',roads, '*',c_road,'=',roadtc);
    libsNRoads += roadtc;
    clog()
    clog(' libs  & Roads:', libsNRoads);
    clog('     just libs:', justLibs);



    // myNS.forEach((valNodeTwoObj,keyNodeOne)=>{
    //     valNodeTwoObj.forEach((valDist,keyNodeTwo)=>{
    //         if( keyNodeOne != keyNodeTwo) {
    //             AddToMap(keyNodeOne,keyNodeTwo,valDist);
    //             AddToMap(keyNodeTwo,keyNodeOne,valDist);
    //         }
    //     });
    // });


    return justLibs > libsNRoads ? libsNRoads : justLibs;
}

function roadsAndLibraries(n, c_lib, c_road, cities) {
    // Write your code here

    
    let cn = [0];
    for(let i=1;i<=n;++i){
        cn.push({n:i,cns:new Set()});
    }
    let proads = [...cities];
    proads.sort((a,b)=>{
        if(a[0]!=b[0]) return a[0]-b[0]; 
        return a[1]-b[1]; 
    });
    clog('proads:');
    clog(proads);

    let myMast = new Set();
    let myMap = new Map();
    let myNodeSet = new Set();
    let myNS = new Map();
    for(let i=1;i<=n;++i){
        myNS.set(i,new Set());
    }

    proads.forEach((e,i,arr) => {
        let a = e[0];
        let b = e[1];

        if( a > b ) {
            a = e[1];
            b = e[0];    
        }
        if( myNS.has(a) ){
            let node = myNS.get(a);
            node.add(b); // node.set(b,d);
            node = myNS.get(b);
            node.add(a); // node.set(b,d);
        }
        myNodeSet.add(a);
        myNodeSet.add(b);
    });
    function AddToMap(keyOne,keyTwo,dist){
        if( myMap.has(keyOne) ){
            let it = myMap.get(keyOne);
            if( !it.childs.has(keyTwo) && keyTwo>keyOne) { // } || it.childs.get(keyTwo) > dist ){
                it.childs.add(keyTwo); // .set(keyTwo , dist);
            }
        }else{
            let tmap = new Set(); // new Map();
            if( keyTwo>keyOne ){
                tmap.add(keyTwo); // .set(keyTwo , dist); // formerly tset
            }
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

    function eatTheChilds(idx,depth){
        let count = 0;
        if( myMap.has(idx) ) {
            myMast.add(idx);
            let obj = myMap.get(idx);
            obj.childs.forEach((e)=>{
                if( ! myMast.has(e) ) {
                    count += 1 + eatTheChilds(e,depth+1);
                }
            });
        }
        if( depth>0) {
            myMap.delete(idx);
        }
        return count;
    }
    for(let i=1; i<=n; ++i){
        if( ! myMap.has(i) ) {
            myMap.set(i,
                {
                    isTop: true,
                    key: i,
                    childs: new Set(), // map key: node number, value: edge length
                    dist:-1, // dist to source
                }
            );
        }
    }
    for(let i=1; i<=n; ++i){
        if( myMap.has(i) ) {
            let obj = myMap.get(i);
            obj.dist = eatTheChilds(i,0);
        }
    }
    
    let justLibs = n * c_lib;
    let libsNRoads = c_lib * myMap.size;
    myMap.forEach(e=>{libsNRoads += c_road * e.dist})


    return justLibs > libsNRoads ? libsNRoads : justLibs;
}

function main() {

    ////////////////////
    // my new code below
    //
    if(!__.parseCommandLineArgs('ral')){
        return 0;
    }
    //
    // my new code above
    ////////////////////
  
    const ws = process.env.OUTPUT_PATH || undefined;
    if( ws != undefined) ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n      = parseInt(firstMultipleInput[0], 10);
        const m      = parseInt(firstMultipleInput[1], 10);
        const c_lib  = parseInt(firstMultipleInput[2], 10);
        const c_road = parseInt(firstMultipleInput[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine()
                .replace(/\s+$/g, '')
                .split(' ')
                .map(citiesTemp => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries_debug(n, c_lib, c_road, cities);

        if( ws != undefined) {
            ws.write(result + '\n');
        }else{
            __.log(result);
        }
    }

    if( ws != undefined) ws.end();
}
