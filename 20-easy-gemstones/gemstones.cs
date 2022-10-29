using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Text;
using System;

class Result
{

    /*
     * Complete the 'gemstones' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts STRING_ARRAY arr as parameter.
     */

    public static int gemstones(List<string> arr)
    {
        HashSet<char>         mset = new HashSet<char>();
        Dictionary<char, int> mmap = new Dictionary<char, int>();

        foreach(string str in arr){
            foreach(char c in str){
                mset.Add( c );
            }
            foreach(char c in mset){
                if( mmap.ContainsKey(c) ){
                    mmap[c] += 1;
                }else{
                    mmap[c] = 1;
                }
                // mmap[c] = mmap.ContainsKey(c) ? mmcap[c] + 1 : 1;
            }
            mset.Clear();
        }
        int count=0;
        foreach(var mi in mmap){
            if( mi.Value == arr.Count() ){
                ++count;
            }
        }
        return count;
    }

}

class Solution
{
    public static void Main(string[] args)
    {
        TextWriter textWriter = new StreamWriter(@System.Environment.GetEnvironmentVariable("OUTPUT_PATH"), true);

        int n = Convert.ToInt32(Console.ReadLine().Trim());

        List<string> arr = new List<string>();

        for (int i = 0; i < n; i++)
        {
            string arrItem = Console.ReadLine();
            arr.Add(arrItem);
        }

        int result = Result.gemstones(arr);

        textWriter.WriteLine(result);

        textWriter.Flush();
        textWriter.Close();
    }
}
