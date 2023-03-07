/*
Implement a simple text editor. 
The editor initially contains an empty string, S. 

Perform operations of the following 4 types:

1. append(W) - Append string W to the end of S.
2. delete(k) - Delete the last  characters of S.
3. print(k)  - Print the k'th character of S.
4. undo - Undo the last (not previously undone) operation of type 1 or 2, reverting S to the state it was in prior to that operation.

example:

S = 'abcde'
ops = ['1 fg', '3 6', '2 5', '4', '3 7', '4', '3 4']

operation    buffer
index        S         ops[index]  explanation
-----        ------    ----------  -----------
0            abcde     1 fg        append fg
1            abcdefg   3 6         print the 6th letter - f
2            abcdefg   2 5         delete the last 5 letters
3            ab        4           undo the last operation, index 2
4            abcdefg   3 7         print the 7th characgter - g
5            abcdefg   4           undo the last operation, index 0
6            abcde     3 4         print the 4th character - d

The result should be printed as:

f
g
d

Sample Input:

STDIN   Function
-----   --------
8       Q = 8
1 abc   ops[0] = '1 abc'
3 3     ops[1] = '3 3'
2 3     ...
1 xy
3 2
4 
4 
3 1

Sample Output:

c
y
a

*/

function processData(input) {
  //Enter your code here
    
  let stack = [""];
  let map = {
    1: my_append = (s)=>{stack.push(  stack.at(-1) + s         )},
    2: my_delete = (k)=>{stack.push(  stack.at(-1).slice(0,-k) )},
    3:  my_print = (k)=>{console.log( stack.at(-1).charAt(k-1) )},
    4:   my_undo = (_)=>{stack.pop()},
  };

  let cmds = input.split('\n');
  let num_cmds = parseInt( cmds.shift()[0] );

  cmds.forEach((e,idx)=>{
      e = e.split(' ');
      if( e.length<2) e.push("dummy ignore");
      // map[ e[0] ]( e[1] );
      let my_func = map[ e[0] ];
      my_func( e[1] );
  });
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});

process.stdin.on("end", function () {
 processData(_input);
});
