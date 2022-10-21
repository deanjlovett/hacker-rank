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

class Result {

    /*
     * Complete the 'pangrams' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts STRING s as parameter.
     */

    public static String pangrams(String s) {
        // Write your code here

        String t = s.toLowerCase();
        HashSet<Character> myset = new HashSet<Character>();
        for(int i=0; i<t.length(); ++i){
            if( t.charAt(i) != ' '){
                myset.add( t.charAt(i) );
            }
        }
        return myset.size() == 26 ? "pangram" : "not pangram";
    }
}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        
        String s = bufferedReader.readLine();
        String result = Result.pangrams(s);
        bufferedReader.close();
        
        BufferedWriter bufferedWriter = new BufferedWriter(
            System.getenv("OUTPUT_PATH") != null ?
            new FileWriter(System.getenv("OUTPUT_PATH")) :
            new OutputStreamWriter(System.out)
        );

        bufferedWriter.write(result);
        bufferedWriter.newLine();
        bufferedWriter.close();
    }
}
