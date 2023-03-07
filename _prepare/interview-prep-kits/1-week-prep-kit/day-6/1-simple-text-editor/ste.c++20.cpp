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

void print_stack(const Stack &stack){
    cout << "    stack: [ ";
    int i=-1;
    for( string s : stack){
        cout << "\"" << s << "\", ";  
    }
    cout << "]" << endl;
}

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

string ltrim(const string &);
string rtrim(const string &);


int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
        
    map<int,My_Func_Ptr> myMap;
    myMap[1] = &fn_append;
    myMap[2] = &fn_delete;
    myMap[3] = &fn_print;
    myMap[4] = &fn_undo;
    
    vector<string> stack;
    stack.push_back("");

    string scmd_temp;
    getline(cin, scmd_temp); // number of edit commands
    int ncmd_count = stoi(ltrim(rtrim(scmd_temp)));
    // cout << "ncmd_count: " << ncmd_count << endl;
    
    for(int i=0; i<ncmd_count; ++i){
        getline(cin, scmd_temp);
        istringstream ss(scmd_temp);
        string scmd,sarg2;
        getline(ss,scmd,' ');
        getline(ss,sarg2,' '); // sarg2 will be an empty string if there is no arg #2

        (*(myMap[ stoi(scmd) ]))( stack, sarg2 );
    }
    return 0;
}

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
