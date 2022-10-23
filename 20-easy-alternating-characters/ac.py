#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'alternatingCharacters' function below.
#
# The function is expected to return an INTEGER.
# The function accepts STRING s as parameter.
#

def alternatingCharacters(s):
    # Write your code here
    t = list(s)
    count = 0
    last = t[0]
    for c in t[1:]:
        if c == last:
            count += 1
        last = c
    return count
    

if __name__ == '__main__':
    q = int(input().strip())

    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    for q_itr in range(q):
        s = input()

        result = alternatingCharacters(s)

        fptr.write(str(result) + '\n')

    fptr.close()
