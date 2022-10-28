#include <bits/stdc++.h>
#include <unordered_map>

using namespace std;

/*
 * Complete the 'gameOfThrones' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

string gameOfThrones(string s) {
    unordered_map<char, unsigned int> map;
    for(auto it = s.cbegin(); it != s.cend(); ++it){
        if( map.find(*it) != map.end() ){
            map[*it] ++;
        }else{
            map[*it] = 1;
        }
    }
    auto oddCount = 0;
    for(auto it = map.begin(); it != map.end(); ++it){
        if( (it->second % 2) != 0 && (++oddCount) > 1 ){
            return "NO";
        }    
    }
    return "YES";
}

int main()
{

    string s;
    getline(cin, s);

    string result = gameOfThrones(s);

    if( getenv("OUTPUT_PATH") ) {
        ofstream fout(getenv("OUTPUT_PATH"));
        fout << result << "\n";
        fout.close();
    }else{
        cout << result << "\n";;
    }

    return 0;
}
