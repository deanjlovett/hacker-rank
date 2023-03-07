#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>

#include <string>
#include <sstream>

using namespace std;


string ltrim(const string &);
string rtrim(const string &);


struct command {
    
};
struct cmd_append {
    
};

int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    const int 
        NCMD_APPEND(1), 
        NCMD_DELETE(2),
        NCMD_PRINT(3), 
        NCMD_UNDO(4);
        
    vector<string> buffers;
    vector<string> commands;
    
    string scmd_temp;
    getline(cin, scmd_temp);
    int ncmd_count = stoi(ltrim(rtrim(scmd_temp)));
    for(int i=0; i<ncmd_count; ++i){
        getline(cin, scmd_temp);
        istringstream ss(scmd_temp);
        string scmd,sarg2;
        getline(ss,scmd,' ');
        int ncmd( stoi(scmd) );
        if(ncmd == NCMD_UNDO){
            buffers.pop_back();
        }else{
            getline(ss,sarg2,' ');
            if(ncmd == NCMD_APPEND){
                buffers.back().append(sarg2);
            }else{
                int narg2( stoi(sarg2) );
                switch(narg2){
                    case NCMD_PRINT: 
                        printf("%c\n",buffers.back()[narg2]); 
                        break;
                    case NCMD_DELETE:
                        for(int dc=0; dc<narg2;++dc){
                            buffers.back().pop_back();
                        }
                        break;
                    default:
                        break;
                }
            }
        }
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
