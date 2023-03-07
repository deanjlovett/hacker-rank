function processData(input) {
  //Enter your code here
  
  // helper.  get last element of an array
  function last(some_array){
      return some_array[ some_array.length-1 ];
  }
  
  let stack = [""];
  
  function my_append(s){
      stack.push( last(stack) + s );
  };
  function my_delete(k){
      stack.push( last(stack).slice(0,-k) )  
  }
  function my_print(k){
      console.log( last(stack).charAt(k-1));
  }
  function my_undo(dummy_ignore){
      stack.pop();
  }
  // let map = {
  //   1: my_append=(s)=>{stack.push( last(stack) + s )},
  //   2: my_delete=(k)=>{stack.push( last(stack).slice(0,-k) )},
  //   3:  my_print=(k)=>{console.log( last(stack).charAt(k-1));},
  //   4:   my_undo=(_)=>{stack.pop()},
  // };
let map = {
  0:  my_dummy,
  1: my_append,
  2: my_delete,
  3:  my_print,
  4:   my_undo,
};

  let cmds = input.split('\n');
  let num_cmds = parseInt( cmds.shift()[0] );

  cmds.forEach((e,idx)=>{
      e = e.split(' ');
      if( e.length<2) e.push("dummy");
      
      // map[ e[0] ]( e[1] );
      
      if( ! map.hasOwnProperty( e[0] ) ) {
          // we should complain
          return;
      }
      
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
