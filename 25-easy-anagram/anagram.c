#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline();
char* ltrim(char*);
char* rtrim(char*);

int parse_int(char*);

/*
 * Complete the 'anagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

int anagram(char* s) {
    const int NUMC = 26;
    int slen = strlen(s);
    if( slen % 2 != 0 ){
        return -1;
    }
    char map[NUMC]; // use an array as a simple map
                    // use character ascii code minus 'a' as the the index
                    // we will increment the value for every occurance 
                    // of that character occurs in the left half of the string
                    // and decrement the value for every occurance in the right half
                    // if the number of a given character are the same on both side
                    // the value at that index will be ZERO
    for(int i=0;i<NUMC;++i){
        map[i] = 0;
    }
    char *p__left = s;
    char *p_right = s + slen/2; // start half way down the string
    while(*p_right){
        map[*p__left++ - 'a'] += 1;
        map[*p_right++ - 'a'] -= 1; 
    }
    //
    // alternate algorithm implementation
    // 
    // for( ; *p_right; ++p__left,++p_right){
    //     map[*p__left - 'a'] += 1;
    //     map[*p_right - 'a'] -= 1;
    // }
    //
    // alternate algorithm
    //
    // char *p__left = s;
    // char *p_right = s + slen -1;     // start all the way down the string, walk back to the start
    // while( *p_right > *p__left ){    // stop when the pointers cross
    //     map[*p__left++ - 'a'] += 1;  // if the given char occurs in both sides
    //     map[*p_right-- - 'a'] -= 1;  // the same number of time the char count will be ZERO
    // }
    
    int diff_count=0;
    for(int i=0; i<NUMC;++i){
        diff_count += abs( map[i] );
    }
    return diff_count/2;
}

int main()
{
    FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");

    int q = parse_int(ltrim(rtrim(readline())));

    for (int q_itr = 0; q_itr < q; q_itr++) {
        char* s = readline();

        int result = anagram(s);

        fprintf(fptr, "%d\n", result);
    }

    fclose(fptr);

    return 0;
}

char* readline() {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\0';

            break;
        }
    }

    if (data[data_length - 1] == '\n') {
        data[data_length - 1] = '\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\0';
        } else {
            data[data_length] = '\0';
        }
    }

    return data;
}

char* ltrim(char* str) {
    if (!str) {
        return '\0';
    }

    if (!*str) {
        return str;
    }

    while (*str != '\0' && isspace(*str)) {
        str++;
    }

    return str;
}

char* rtrim(char* str) {
    if (!str) {
        return '\0';
    }

    if (!*str) {
        return str;
    }

    char* end = str + strlen(str) - 1;

    while (end >= str && isspace(*end)) {
        end--;
    }

    *(end + 1) = '\0';

    return str;
}

int parse_int(char* str) {
    char* endptr;
    int value = strtol(str, &endptr, 10);

    if (endptr == str || *endptr != '\0') {
        exit(EXIT_FAILURE);
    }

    return value;
}
