#include <bits/stdc++.h>

#include <vector>
#include <map>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

string isBalanced(string s) {
    // map<char,int> myMap;
    // myMap['{']=0;
    // myMap['}']=0;
    // myMap['(']=0;
    // myMap[')']=0;
    // myMap['[']=0;
    // myMap[']']=0;
    vector<char> bb(s.begin(),s.end());
    
    vector<char> stack;
    
    for( char c : bb ){
        switch(c){
            case '{':
            case '(':
            case '[':
                stack.push_back(c);
                // printf("push_back(c: %c )\n",c);
                break;
  
            case '}': 
                // printf("( %c ) ",c);

                if(stack.size()==0 || stack.back()!='{') {
                    // printf("NO\n");
                    return "NO"; 
                }
                // printf(" pop {} \n");
                stack.pop_back(); 
                break;
                
            case ')':
                if(stack.size()==0 || stack.back()!='(') {
                    // printf("NO\n");
                    return "NO"; 
                }
                // printf(" pop () \n");
                stack.pop_back(); 
                break;
            
            case ']':
                if(stack.size()==0 || stack.back()!='[') {
                    // printf("NO\n");
                    return "NO"; 
                }
                // printf(" pop [] \n");
                stack.pop_back(); 
                break;
        }
    }
    if(stack.size()!=0) 
        return "NO";
    return "YES";
    
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string t_temp;
    getline(cin, t_temp);

    int t = stoi(ltrim(rtrim(t_temp)));

    for (int t_itr = 0; t_itr < t; t_itr++) {
        string s;
        getline(cin, s);

        string result = isBalanced(s);

        fout << result << "\n";
    }

    fout.close();

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
