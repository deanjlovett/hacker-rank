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
let _c_lib;
let _c_road;
function roadsAndLibraries_debug(n, c_lib, c_road, cities) {
    // Write your code here
    //      n : # of cities
    //  c_lib : cost to build lib
    // c_road : cost to build road
    // cities : connections between cities
    _c_lib  = c_lib;
    _c_road = c_road;
    
    // function clog(...args){return;}
    dlog('==============================================');
    dlog('inside roadsAndLibraries()');
    dlog(' # cities:', n);
    dlog(' lib cost:', c_lib);
    dlog('road cost:', c_road);

    // let cn = [0];
    // for(let i=1;i<=n;++i){
    //     cn.push({n:i,cns:new Set()});
    // }
    let myNS = new Map();
    for(let i=1;i<=n;++i){
        myNS.set(i,new Set());
    }
    let proads = [];
    cities.forEach(f=>{
        let e = f.slice();
        if( f[0] > f[1] ){
            e = [ f[1], f[0] ];
        }
        proads.push(e);
        myNS.get( e[0] ).add( e[1] );
    });

    // proads.sort((a,b)=>{
    //     if( a[0] != b[0] ) return a[0]-b[0]; 
    //     return a[1]-b[1]; 
    // });
    // dlog();
    // dlog('cities: size:',cities.length);
    // // dlog('cities      :',cities);
    // dlog();
    // dlog('proads: size:',proads.length);
    // // dlog('proads:     :',proads);
    // dlog()
    // dlog('myNS:size:',myNS.size)
    // dlog('myNS:')
    // dlog('Map {');
    // let emptyNS = []
    // myNS.forEach((e,i)=>{
    //     if( e.size != 0 ){
    //         // dlog(' ',i,'=>',e);
    //     }else{
    //         emptyNS.push(i);
    //     }
    // });
    // dlog('}');
    // dlog('myNS: empty nodes:',emptyNS)


    let myMast = new Set();
    let myMap = new Map();


    function AddToMap(keyOne,keyTwo){
        // dlog(`    inside function AddToMap(keyOne:${keyOne},keyTwo:${keyTwo},dist:${dist}){`);

        if(keyOne === keyTwo) return;

        // if( keyOne > keyTwo ){
        //     let tmp = keyOne;
        //     keyOne = keyTwo;
        //     keyTwo = tmp;
        // }

        //
        // concept:  custer merger
        //
        // two clusters may meet.
        // lowest cluster number becomes the cluster number for new cluster.
        // by using cluster number container, we can update ALL the cluster numbers 
        // on every node in a cluster by updaing the value in one node's cluster containter.
        // 

        if( myMap.has(keyOne) ){
            let obj = myMap.get(keyOne);
            obj.childs.add(keyTwo);
            obj.descendents.add(keyTwo);
            if( ! myMap.has(keyTwo) ){
                let objTwo = myMap.get(keyTwo);
                if( obj.cluster.number > objTwo.cluster.number ){ // merge
                    objTwo.cluster.members = 
                        new Set(
                            ...objTwo.cluster.members,
                            ...obj.cluster.members
                        );
                    obj.cluster.number  = objTwo.cluster.number;
                    obj.cluster.members = objTwo.cluster.members;
                }
                else if( obj.cluster.number < objTwo.cluster.number ){
                    obj.cluster.members = 
                    new Set(
                        ...obj.cluster.members,
                        ...objTwo.cluster.members
                    );

                    objTwo.cluster.number  = obj.cluster.number;
                    objTwo.cluster.members = obj.cluster.members;
                }
                else{ // if( obj.cluster.cluster_number == objTwo.cluster.cluster_number ){
                    // chill... do nothinng with the clusters
                }

            }else{
                obj.cluster.cluser_members.add(keyTwo)
                myMap.set(
                    keyTwo,
                    {
                        key:         keyTwo,
                        childs:      new Set(),
                        descendents: new Set(),
                        dist:        -1, 
                        cluster: obj.cluster
                    }
                );    
            }
        }else{
            let cluster_name_container = {number:keyOne, members:new set([keyOne])}
            myMap.set(
                keyOne,
                {
                    key:         keyOne,
                    childs:      new Set([keyTwo]),
                    descendents: new Set([keyTwo]),
                    dist:        -1, 
                    cluster: cluster_name_container
                }
            );
        }
    }
    // dlog()
    // dlog('myNS:')
    // dlog(myNS)
    myNS.forEach((valNodeTwoObj,keyNodeOne)=>{
        valNodeTwoObj.forEach((valDist,keyNodeTwo)=>{
            AddToMap(keyNodeOne,keyNodeTwo);
            // AddToMap(keyNodeTwo,keyNodeOne);
        });
    });
    // dlog()
    // dlog('myMap:')
    // dlog(myMap)


    function eatTheChilds(idx,desc,depth){
        // let pad = ''.padEnd(depth*2,' ')
        // dlog(`${pad}--------------------------------------`)
        // dlog(`${pad}eatTheChilds(idx:${idx},depth:${depth})`)
        // dlog(`${pad}  on entry, idx:${idx}:descendents:`, desc);
        // dlog(`${pad}  on entry, idx:${idx}:descendents:`, myMap.get(idx).descendents);
        // dlog(`${pad}  on entry, idx:${idx}:childs     :`, myMap.get(idx).childs);
        let count = 0;
        if( myMap.has(idx) ) {
            myMast.add(idx);
            let obj = myMap.get(idx);
            count = obj.cluster.members.size;
            obj.cluster.members.forEach((e)=>{
                if(e===idx) return;
                myMap.delete(e);
            });
        }
        // dlog(`${pad}  --------------------------------------`)
        return count;
    }
    for(let i=1; i<=n; ++i){
        if( ! myMap.has(i) ) {
            myMap.set(i,
                {
                    key: i,
                    childs: new Set(), // map key: node number, value: edge length
                    descendents: new Set(),
                    dist:-1, // dist to source
                }
            );
        }
    }
    for(let i=1; i<=n; ++i){
        if( myMap.has(i) ) {
            // myMast.add(i);
            let obj = myMap.get(i);
            obj.dist = eatTheChilds(i,obj.descendents,0);
            // nd.forEach(f=>{
            //     obj.descendents.desc.add(f)
            // });
        }
    }
    dlog()
    dlog('myMap:')
    dlog(myMap)
    clog()
    clog('          # cities:', n);
    clog('clusters of cities:', myMap.size)
    clog('       min # roads:', n - myMap.size)
    clog()
    clog(' lib cost:', c_lib);
    clog('road cost:', c_road);
    clog()
    
    let justLibsCost = c_lib *          n;
    let nodeLibsCost = c_lib * myMap.size;

    let roads  = n - myMap.size;
    let roadCost = c_road * roads;

    let libsNRoadCost = nodeLibsCost + roadCost;

    clog()
    clog(' libs  & Roads Cost:', libsNRoadCost,'= nodeLib$:',nodeLibsCost,'+ road$:',roadCost);
    clog('     just libs Cost:', justLibsCost, '= #cities:',n,'* lib$:',c_lib);
    
    // let roads =0;
    // let roadtc =0
    // myMap.forEach(e=>{
    //     roads += e.dist;
    //     // if(e.dist>0) clog('               :',e.dist,c_road * e.dist);
    //     roadtc += c_road * e.dist
    // });


    // myNS.forEach((valNodeTwoObj,keyNodeOne)=>{
    //     valNodeTwoObj.forEach((valDist,keyNodeTwo)=>{
    //         if( keyNodeOne != keyNodeTwo) {
    //             AddToMap(keyNodeOne,keyNodeTwo,valDist);
    //             AddToMap(keyNodeTwo,keyNodeOne,valDist);
    //         }
    //     });
    // });
    dlog('----------------------------------------------');
    dlog('----------------------------------------------');
    dlog('----------------------------------------------');


    return justLibsCost > libsNRoadCost ? libsNRoadCost : justLibsCost;
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
    // let myNodeSet = new Set();
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
        // myNodeSet.add(a);
        // myNodeSet.add(b);
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
    if( ws != undefined){
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
            if(varr.length>0){
                __.log(result)
                __.log(varr[qItr],'<<== expected:',result===varr[qItr]);
                if(result!==varr[qItr]) __.log(result-varr[qItr],'$L:',_c_lib,'$R:',_c_road)
                __.log();
            }else{
                __.log(result);
            }
        }
    }

    if( ws != undefined) ws.end();
}
