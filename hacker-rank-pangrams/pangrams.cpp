#include <bits/stdc++.h>

#include <algorithm>
#include <cctype>
#include <string>
#include <unordered_set>

using namespace std;

/*
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

string pangrams(string s) {
    string    sPangram =     "pangram";
    string sNotPangram = "not pangram";
    
    transform(
        s.begin(), s.end(), s.begin(),
        [](unsigned char c){ return std::tolower(c); }
    );
    unordered_set <unsigned char> mySet;
    for( auto i=0;i<s.length(); ++i){
        if( s[i] != ' '){
            mySet.insert(s[i]);        
        }
    }
    
    return mySet.size() == 26 ? sPangram : sNotPangram;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string s;
    getline(cin, s);

    string result = pangrams(s);

    fout << result << "\n";

    fout.close();

    return 0;
}
