'use strict';

const { constants } = require("buffer");

/*

put this in ./util folder
with links inside ./someother/util
inside folder ./someother
$ ln -s ../util util


to use in a file... include this line:

let __ = require('../util');

*/

/*
 * debugging boilerplate
 * begin
**/

let _isSilent  = false;
let _isVerbose = false;
let _isDebug   = false;
let _inFile    = '';
let _outFile   = '';
let _otherFile = '';
let _validateFile = '';

function setSilent(val=true)  {_isSilent=val};
function setVerbose(val=true) {_isVerbose=val};
function setDebug(val=true)   {_isDebug=val};

function getIsSilent()  {return _isSilent};
function getIsVerbose() {return _isVerbose};
function getIsDebug()   {return _isDebug};

function progdot(){ if(!_isSilent) process.stdout.write('.');}

function clog(...args){ if(              !_isSilent) console.log(...args);}
function dlog(...args){ if(_isDebug   && !_isSilent) console.log(...args);}
function vlog(...args){ if(_isVerbose && !_isSilent) console.log(...args);}
function slog(...args){ if(               _isSilent) console.log(...args);}
function  log(...args){console.log(...args);}
const sclog = log;
const cslog = log;

function setInputFilename(s){_inFile=s;}
function getInputFilename(){return _inFile;}

function setOutputFilename(s){_outFile=s;}
function getOutputFilename(){return _outFile;}

function setFilename(s){_otherFile=s;}
function getFilename(){return _otherFile;}

function setValidateFilename(s){_validateFile=s;}
function getValidateFilename(){return _validateFile;}

let _range = {first:0,last:0,inc:0}

function setRange(first,last,inc){
  _range.first = parseInt(first);
  _range.last  = parseInt(last);
  _range.inc   = parseInt(inc);
}
function getRange(){
  return _range;
}

/*
 * end
 * debugging boilerplate
**/
let _nums = [];
let _strarr = [];
function getNumbersFromCommandLine(){return _nums;}
function getStringsFromCommandLine(){return _strarr;}

function parseCommandLineArgs(name='something',extraArr=[]){
    
    let isError = false;
    let unknownArgs = [];
    const myArgs = process.argv.slice(2);
    let smyArgs = myArgs.slice(); // save a copy

    /*
    hey look, it is data drive
    note:  add flags and functtion to set them, here
    note:  the area _nums hold any INTEGERS found
    */
    let arglist = [
      {key:['-d','--debug'                ],           val: setDebug   },
      {key:['-v','--verbose'              ],           val: setVerbose },
      {key:['-s','--silent'               ],           val: setSilent  },
      {key:['-i','--in','--input'         ], params:1, val: setInputFilename  },
      {key:['-o','--out','--output'       ], params:1, val: setOutputFilename  },
      {key:['-f','--file'                 ], params:1, val: setFilename  },
      {key:['--val','--valid','--validate'], params:1, val: setValidateFilename  },
      {key:['-r','--range'                ], params:3, val: setRange },

    ];

    let argmap = new Map();
    arglist.forEach((e,i,arr)=>{
      e.key.forEach((v)=>{
        // argmap.set( v.toLowerCase(), e.val);
        argmap.set( v.toLowerCase(), e );
      });
    });

    let skipNext = false;
    // myArgs.forEach((e,i,arr)=>{
    while(myArgs.length>0){
      let e = myArgs.shift();

      // if( skipNext ){
      //   skipNext = false;
      //   return;
      // }
      let se = e.toLowerCase();
      let testNum   = parseInt(e);

      if( argmap.has(se) ) {
        let obj = argmap.get(se);

        switch( 'params' in obj ? obj.params : 0 ){

          case 0:
            obj.val(); // look it up and call it.
            break;

          case 1:
            // if(arr.length-1>=i+1){
            //   obj.val(arr[i+1])
            //   skipNext = true;
            // }
            if(myArgs.length>0){
              let nextArg = myArgs.shift();
              obj.val(nextArg)
            }
            break;

          case 3:
            // if(arr.length-1>=i+1){
            //   obj.val(arr[i+1])
            //   skipNext = true;
            // }
            if(myArgs.length>2){
              let first = myArgs.shift();
              let last  = myArgs.shift();
              let inc   = myArgs.shift();
              obj.val(first,last,inc)
            }
            break;
  
          default:
            // error
        }
      }else if(!isNaN(testNum)){
        _nums.push(testNum);
        _strarr.push(e); // yeah... we push numbers on to string array
      }else if(e.charAt(0)=='-'){
        if( e.includes(':')){
          let sparr = e.split(':');
          while(sparr.length>0){
            myArgs.unshift( sparr.pop() )
          }
        }
        else if( e.charAt(1) !== '-' && e.length > 2 ){
          let sparr = e.split('');
          sparr.shift(); // pop front that '-'
          while(sparr.length>0){
            myArgs.unshift( '-' + sparr.pop() )
          }
        }else{
          isError = true;
          unknownArgs.push(e);
        }
      }else{
        _strarr.push(e);
      }
    }    
    if(isError || unknownArgs.length > 0){
        console.log();
        console.log('unknown args:',unknownArgs )
        // let shelp = myArgs[0].toLowerCase();
        // if( shelp === '-h' || '--help')
        console.log();
        console.log(`usage: node ${name}.js [number ...] [string ...] [-d | --debug] [-v | --verbose] [-s | --silent]`);
        console.log();
        console.log('       -d or --debug.  : extra debugging output');
        console.log('       -v or --verbose : extra chatty output');
        console.log('       -s or --silent  : only output the answer');
        console.log();
        console.log('       -r or --range first last increment : a range of integers to use');
        console.log();
        console.log('       -i or --input     filename  : filename with input data');
        console.log('       -o or --output    filename  : filename with output data');
        console.log('       -f or --file      filename  : filename with other data');
        console.log('       -v or --validate  filename  : filename with validation data');
        console.log();
        extraArr.forEach((e,i,arr)=>{
            console.log(e);
        });
        // console.log('Starting number, equal to or less than input number, produces the longest collatz sequence (chain of numbers)?');
        // console.log();
        // console.log('Default number is 13.');
        console.log();
        return(false);
    }

    dlog()
    dlog('calling args: ',smyArgs)
    dlog()
    if( _inFile || _outFile || _otherFile || _validateFile 
      || _isVerbose || _isDebug || _range.inc !== 0)
    {
        clog();
    }
    if(_inFile.length>0)       clog('    input filename:', _inFile  )
    if(_outFile.length>0)      clog('   output filename:', _outFile )
    if(_otherFile.length>0)    clog('    other filename:', _otherFile )
    if(_validateFile.length>0) clog(' validate filename:', _validateFile )
    if(_isVerbose)             clog('    verbose set to:', _isVerbose)
    if(_isDebug)               clog('      debug set to:', _isDebug)
    if(_range.inc !== 0)       clog('   range is set to:', _range)
    if(_strarr.length)         clog(' strings found on command line (includes integers)', _strarr)
    if(_nums.length>0)         dlog(' integers found on command line:', _nums);
    return true;
}

// a quick and dirty factorial
let _factmap = new Map();
_factmap.set(2,2);
let _factmapmaxn = 2;
let _depth=0
//let _dspace=''
function factorial(n){
  ++_depth;
  let _dspace = ' '.repeat(_depth);
  let fact = NaN;
  if( _depth > 20)
  {
    clog(`*** to deep ***`)
    return 1;
  }
  clog(`${_dspace}factorial(n:${n})`)  
  if( _factmap.has(n) ){
    clog(`${_dspace}looked it up`)  
    fact =  _factmap.get(n);
  } 
  else if( n < 0           ) fact = NaN;
  else if( n < 2           ) fact = 1;
  else{
    fact = n * factorial(n-1);
    _factmap.set(n,fact);
    clog(`${_dspace}calculate and save`)  
  }
  clog(`${_dspace}factorial = ${fact})`)  
  --_depth;
  return fact;
}

module.exports = {
  // isSilent, isDebug, isVerbose,
  setSilent, setVerbose, setDebug,
  getIsSilent, getIsVerbose, getIsDebug,
  setRange, getRange,
  progdot,
  clog, dlog, vlog, slog, log,sclog,cslog,
  getNumbersFromCommandLine,
  getStringsFromCommandLine,
  parseCommandLineArgs,
  
  setInputFilename,getInputFilename,
  setOutputFilename,getOutputFilename,
  setFilename,getFilename,
  setValidateFilename,getValidateFilename,

  factorial
};

/*
// example of use #1

if(!__.parseCommandLineArgs('solution')){
    return 0;
}
let strarr = __.getStringsFromCommandLine();
while(strarr.length>0){
    let s = strarr.shift();
    if(!'<->'.includes(s.charAt(0))) s = s.substring(1);
    let salutes = ''+solution(s)
    __.clog(`s: ${s}`);
    __.clog(`salutes: ${salutes}`);
    __.clog();
}

// example of use #2

if(!__.parseCommandLineArgs('solution')){
    return 0;
}
let nums = __.getNumbersFromCommandLine();
while(nums.length>0){
    let x = nums.shift();
    let y = nums.length>0 ? nums.shift() : x;
    let id = ''+solution(x,y)
    __.clog(`x,y: (${x},${y}) = id: ${id}`);
    __.clog();
}


*/
