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
 * Complete the 'gemstones' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY arr as parameter.
 */

//
// helper function
//
const int letter_count = 26;
void setAllToZero(int* ppa){
    int *p=ppa;
    for(int i=0; i<letter_count; ++i,++p){
        *p = 0; // ppa[i] = 0;
    }
}

int gemstones(int arr_count, char** arr) {

    int map[letter_count];
    int set[letter_count];
    
    setAllToZero(map);
    setAllToZero(set);    

    for(int i=0; i<arr_count; ++i){
        for(char *p=arr[i]; *p; ++p){
            set[*p - 'a'] = 1;
        }
        for(int i=0; i<letter_count; ++i){
            if( set[i] > 0 ) {
                map[i] += 1;
                set[i] = 0;// reset for next round in for loop
            } 
        }
    }
    int count=0;
    for(int i=0; i<26; ++i){
        if( map[i] == arr_count) ++count;
    }
    
    return count;
}
/* 
 * Solution to problem is Above  
 *
 * Below is the driver
 * 
 */

int main()
{

    int n = parse_int(ltrim(rtrim(readline())));
    char** arr = malloc(n * sizeof(char*));

    for (int i = 0; i < n; i++) {
        char* arr_item = readline();
        *(arr + i) = arr_item;
    }

    int result = gemstones(n, arr);

    if( getenv("OUTPUT_PATH") ){
        FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");
        fprintf(fptr, "%d\n", result);
        fclose(fptr);
    }else{
        printf("%d\n", result);
    }

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
