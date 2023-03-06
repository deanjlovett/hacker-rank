//#include <bits/stdc++.h>

#include <vector>
#include <ctype.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

string caesarCipher(string s, int k) {
    string sret(s);
    int fk = k % 26;
    if(fk==0){
        return sret;
    }
    for(int idx=0;idx<sret.size();++idx){
        char c = sret[idx];
        if( isalpha(c) ){
            int nc = c + fk;
            if(isupper(c)){
                if( nc>'Z' ){
                    nc -= 26;
                }
            }else if(nc>'z'){
                nc -= 26;
            }
            sret[idx]=(char)nc;
        }
    }
    return sret;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string n_temp;
    getline(cin, n_temp);

    int n = stoi(ltrim(rtrim(n_temp)));

    string s;
    getline(cin, s);

    string k_temp;
    getline(cin, k_temp);

    int k = stoi(ltrim(rtrim(k_temp)));

    string result = caesarCipher(s, k);

    if(getenv("OUTPUT_PATH")==NULL){
        cout << result << "\n";
    }else{
        fout << result << "\n";
        fout.close();
    }

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}
