import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

import java.util.HashMap;
import java.util.HashSet;

class Result {

    /*
     * Complete the 'gemstones' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts STRING_ARRAY arr as parameter.
     */

    public static int gemstones(List<String> arr) {
        // Write your code here

        HashMap<Character, Integer> myMap = new HashMap<Character, Integer>();

        arr.forEach(e -> {
            char[] ca = e.toCharArray();
            HashSet<Character> mySet = new HashSet<Character>();
            for(int i=0; i<ca.length; ++i){
                mySet.add(ca[i]);
            }
            mySet.forEach(c->{
                if( myMap.containsKey(c)){
                    myMap.put(c, myMap.get(c) + 1 );
                }else{
                    myMap.put(c, 1 );
                }
            });
        });
        int gemcount = 0;
        for(Map.Entry<Character,Integer> entry : myMap.entrySet()){
            if( entry.getValue() == arr.size() ){
                ++gemcount;
            }
        }
        return gemcount;
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        
        int n = Integer.parseInt(bufferedReader.readLine().trim());
        List<String> arr = IntStream.range(0, n).mapToObj(i -> {
            try {
                return bufferedReader.readLine();
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        })
        .collect(toList());
        bufferedReader.close();
        
        int result = Result.gemstones(arr);
        
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));
        
        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();
        bufferedWriter.close();
    }
}
