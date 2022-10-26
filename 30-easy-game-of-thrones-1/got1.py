#!/bin/python3

# pypy 3

import math
import os
import random
import re
import sys

#
# Complete the 'gameOfThrones' function below.
#
# The function is expected to return a STRING.
# The function accepts STRING s as parameter.
#

def gameOfThrones(s):
    # Write your code here
    d = {}
    for e in s:
        if e in d:
            d[e] += 1
        else:
            d[e] = 1
    oddCount = 0
    for v in d.values():
        if v%2 != 0:
            oddCount += 1
            if oddCount > 1:
                return 'NO'
    return 'YES'

if __name__ == '__main__':

    s = input()
    result = gameOfThrones(s)

    fptr = open(os.environ['OUTPUT_PATH'], 'w')
    fptr.write(result + '\n')
    fptr.close()
