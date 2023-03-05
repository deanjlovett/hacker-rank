// #include <bits/stdc++.h>

#include <vector>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'gridChallenge' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING_ARRAY grid as parameter.
 */

string gridChallenge(vector<string> grid) {
    vector<string> vret;
    for( int i=0; i<grid.size(); ++i ){
        std::vector<char> vc(grid[i].begin(), grid[i].end());
        std::sort(vc.begin(), vc.end());
        string s(vc.begin(),vc.end());
        vret.push_back(s);
    }
    for( int i=0,j=1; j<grid.size(); ++i,++j ){
        if(vret[i]>vret[j]){
            return std::string("NO");
        }
    }
    return std::string("YES");
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string t_temp;
    getline(cin, t_temp);

    int t = stoi(ltrim(rtrim(t_temp)));

    for (int t_itr = 0; t_itr < t; t_itr++) {
        string n_temp;
        getline(cin, n_temp);

        int n = stoi(ltrim(rtrim(n_temp)));

        vector<string> grid(n);

        for (int i = 0; i < n; i++) {
            string grid_item;
            getline(cin, grid_item);

            grid[i] = grid_item;
        }

        string result = gridChallenge(grid);

        if( getenv("OUTPUT_PATH")==NULL){
            fout << result << "\n";
        }else{
            fout << result << "\n";
        }
    }

    if( getenv("OUTPUT_PATH")!=NULL){
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
