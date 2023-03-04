#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

void plusMinus(vector<int> arr) {
    int count_pos = 0;
    int count_neg = 0;
    int count_zero = 0;
    int arr_count = arr.size();
    for(auto i : arr){
        if(        i>0)   {++count_pos;}
        else if(   i<0)   {++count_neg;}
        else /*   i==0 */ {++count_zero;}        
    }
    // printf("%.6f\n",(float)count_pos /arr_count);
    // printf("%.6f\n",(float)count_neg /arr_count);
    // printf("%.6f\n",(float)count_zero/arr_count);
    
    std::cout << std::fixed;
    std::cout << std::setprecision(6);
    std::cout << (float)count_pos /arr_count << std::endl; 
    std::cout << (float)count_neg /arr_count << std::endl; 
    std::cout << (float)count_zero/arr_count << std::endl; 
    
}

int main()
{
    string n_temp;
    getline(cin, n_temp);

    int n = stoi(ltrim(rtrim(n_temp)));

    string arr_temp_temp;
    getline(cin, arr_temp_temp);

    vector<string> arr_temp = split(rtrim(arr_temp_temp));

    vector<int> arr(n);

    for (int i = 0; i < n; i++) {
        int arr_item = stoi(arr_temp[i]);

        arr[i] = arr_item;
    }

    plusMinus(arr);

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

vector<string> split(const string &str) {
    vector<string> tokens;

    string::size_type start = 0;
    string::size_type end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(str.substr(start, end - start));

        start = end + 1;
    }

    tokens.push_back(str.substr(start));

    return tokens;
}
