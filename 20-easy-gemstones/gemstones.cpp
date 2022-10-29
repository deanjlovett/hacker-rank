#include <bits/stdc++.h>

#include <unordered_set>
#include <unordered_map>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'gemstones' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY arr as parameter.
 */

int gemstones(vector<string> arr) {
    typedef unordered_set <char> MySetType;
    typedef unordered_map <char,size_t> MyMapType;

    MySetType mset;
    MyMapType mmap;

    for(const auto &str : arr){
        for(const auto &c : str){
            mset.insert( c );
        }
        for(const auto &si : mset){
            MyMapType::const_iterator got = mmap.find(si);
            if( got == mmap.end() ){
                mmap[si] = 1;
            }else{
                mmap[si] += 1;
            }
            // mmap[si] = (got == mmap.end()) ? 1 : mmap[si] + 1;
        }
        mset.clear();
    }
    int count=0;
    for(const auto &mi : mmap){
        if( mi.second == arr.size()) ++count;
    }
    
    return count;
}

int main()
{

    string n_temp;
    getline(cin, n_temp);

    int n = stoi(ltrim(rtrim(n_temp)));

    vector<string> arr(n);

    for (int i = 0; i < n; i++) {
        string arr_item;
        getline(cin, arr_item);

        arr[i] = arr_item;
    }

    int result = gemstones(arr);

    if(getenv("OUTPUT_PATH")){
        ofstream fout(getenv("OUTPUT_PATH"));
        fout << result << "\n";
        fout.close();
    }else{
        cout << result << "\n";
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
