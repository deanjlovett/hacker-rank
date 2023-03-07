#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>

#include <string>
#include <sstream>
#include <map>

using namespace std;

typedef vector<string> Stack;
typedef void (*My_Func_Ptr)(Stack &,const string &);

void print_stack(const Stack &stack);

// void fn_do_nothing(Stack &stack, const string &s);
void fn_append(Stack &stack, const string &s);
void fn_delete(Stack &stack, const string &s);
void fn_print(Stack &stack, const string &s);
void fn_undo(Stack &stack, const string &s);
    
void parseCmd(vector<string> &returned_vector, string &sline);

string ltrim(const string &);
string rtrim(const string &);

const int MIN_NCMD = 1;
const int MAX_NCMD = 4;

int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
        
    map<int,My_Func_Ptr> cmdFuncMap;
    // cmdFuncMap[0] = &fn_do_nothing;
    cmdFuncMap[1] = &fn_append;
    cmdFuncMap[2] = &fn_delete;
    cmdFuncMap[3] = &fn_print;
    cmdFuncMap[4] = &fn_undo;
    
    vector<string> stack;
    stack.push_back("");

    string scmd_temp;
    getline(cin, scmd_temp); // number of edit commands
    int ncmd_count = stoi(ltrim(rtrim(scmd_temp)));
    // cout << "ncmd_count: " << ncmd_count << endl;
    
    vector<string> parsed_cmd;
    
    for(int i=0; i<ncmd_count; ++i){
        getline(cin, scmd_temp);
        parseCmd(parsed_cmd, scmd_temp);
        
        int ncmd = stoi(parsed_cmd[0]); 
        if( ncmd > MAX_NCMD || ncmd < MIN_NCMD) continue; // give up on parsed_cmd silently
        
        (*(cmdFuncMap[ ncmd ]))( stack, parsed_cmd[1] );
    }
    return 0;
}

void print_stack(const Stack &stack){
    cout << "    stack: [ ";
    int i=-1;
    for( string s : stack){
        cout << "\"" << s << "\", ";  
    }
    cout << "]" << endl;
}

void parseCmd(vector<string> &arr, string &sline){
    istringstream ss(sline);
    string scmd, sarg;
    getline(ss,scmd,' ');
    getline(ss,sarg,' '); // sarg will be an empty string if there is no arg #2
    arr.clear();
    arr.push_back(scmd);
    arr.push_back(sarg);
}

// void fn_do_nothing(Stack &stack, const string &s){
//     // complain about unexpected ZERO command
//     return;
// };
void fn_append(Stack &stack, const string &s){
    stack.push_back( stack.back() + s );
};
void fn_delete(Stack &stack, const string &s){
    int k(stoi(s));
    string sb(stack.back());
    stack.push_back( sb.erase(sb.size()-k,k) );
};
void fn_print(Stack &stack, const string &s){
    // cout << (stack.back())[ stoi(s) - 1 ] << endl;
    cout << stack.back().at( stoi(s) - 1 ) << endl;
};
void fn_undo(Stack &stack, const string &s){
    stack.pop_back();
};


string ltrim(const string &str) {
    string s(str);
    // s.erase(
    //     s.begin(),
    //     find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    // );
    while(std::isspace( s.front() )){s.erase(0);}
    return s;
}

string rtrim(const string &str) {
    string s(str);
    // s.erase(
    //     find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
    //     s.end()
    // );
    while(std::isspace( s.back() )){s.pop_back();}
    return s;
}
