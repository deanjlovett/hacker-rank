#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'gemstones' function below.
#
# The function is expected to return an INTEGER.
# The function accepts STRING_ARRAY arr as parameter.
#

def gemstones(arr):
    # Write your code here
    d = {}
    for e in arr:
        se = set(e) # use a "set" to eliminate duplicates
        for i in se: # update count for each letter in the dictionary
            if i in d:
                d[i] += 1
            else:
                d[i] = 1
    gemcount = 0
    for v in d.values():
        if v == len(arr): # if the number of letters found is 
            gemcount += 1 # the same as the arr count, add to the gem count
    return gemcount



    

if __name__ == '__main__':
    
    n = int(input().strip())
    arr = []
    for _ in range(n):
        arr_item = input()
        arr.append(arr_item)

    result = gemstones(arr)

    fptr = open(os.environ['OUTPUT_PATH'], 'w')
    fptr.write(str(result) + '\n')
    fptr.close()
