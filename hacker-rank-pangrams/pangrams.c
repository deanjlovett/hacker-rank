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

/*
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

/*
 * To return the string from the function, you should either do static allocation or dynamic allocation
 *
 * For example,
 * char* return_string_using_static_allocation() {
 *     static char s[] = "static allocation of string";
 *
 *     return s;
 * }
 *
 * char* return_string_using_dynamic_allocation() {
 *     char* s = malloc(100 * sizeof(char));
 *
 *     s = "dynamic allocation of string";
 *
 *     return s;
 * }
 *
 */
char* pangrams(char* s) {
    static char     pangram[] =     "pangram";
    static char not_pangram[] = "not pangram";
    
    size_t size = strlen(s)+1;
    char *t = (char*) calloc( size, sizeof(char) );
    strncpy( t, s, size );
    
    int i = 0;
    for( char* p=t; i<size;++p,++i){
        if( *p >='a' && *p <= 'z'){
            *p -= 32;
        }
    }
    int map_size = 27;
    int map[map_size];
    
    i = 0;
    for( ; i<map_size; ++i){
        map[i] = 0;
    }
    
    i = 0;
    for( char *p=t; i<size; ++i,++p){
        // if( *p == 32               ) map[*p-32] = 1;
        if( *p >= 'A' && *p <= 'Z' ) map[*p-64] = 1;
    }

    int count = 0;
    i = 0;
    for( int *pi=map; i<map_size; ++i,++pi){
        if( *pi ){
            ++count;
        }
    }
    
    return count == 26 ? pangram : not_pangram;
}

int main()
{
    FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");

    char* s = readline();

    char* result = pangrams(s);

    fprintf(fptr, "%s\n", result);

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
