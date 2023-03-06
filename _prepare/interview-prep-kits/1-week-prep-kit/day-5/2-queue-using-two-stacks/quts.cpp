#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>

// #include <deque>

using namespace std;

vector<int> split(const string &);

int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    
    // deque<int> fifo;
    vector<int> vfifo;
    int vfront = 0;

    int number_of_queries;
    cin >> number_of_queries;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    for( int i=0; i<number_of_queries; ++i ){
        string cmd;
        getline(cin, cmd);
        vector<int> items = split(cmd);
        switch(items[0]){
            // case 1: fifo.push_back(items[1]);   break;
            // case 2: fifo.pop_front();           break;
            // case 3: printf("%d\n", fifo.at(0)); break;
            case 1: vfifo.push_back(items[1]);   break;
            case 2: 
                ++vfront;
                break;
            case 3: printf("%d\n", vfifo.at(vfront)); break;
            default: break;
        }
    }

    return 0;
}

vector<int> split(const string &str) {
    vector<int> tokens;

    string::size_type 
        start = 0,
        end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(stoi(str.substr(start, end - start)));
        start = end + 1;
    }
    tokens.push_back(stoi(str.substr(start)));
    return tokens;
}
