
#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'palindromeIndex' function below.
#
# The function is expected to return an INTEGER.
# The function accepts STRING s as parameter.
#

def palindromeIndex(s):
    # Write your code here
    cl = list(s)
    idx_b = len(cl)-1
    idx_f = 0
    while idx_f < idx_b:

        f_ord = ord( cl[idx_f] )
        b_ord = ord( cl[idx_b] )
        if f_ord == b_ord:
            idx_f += 1
            idx_b -= 1
            continue
        f_ordn = ord( cl[idx_f+1] )
        b_ordn = ord( cl[idx_b-1] )
        if f_ordn == b_ord:
            return idx_f
        if b_ordn == f_ord:
            return idx_b
    return -1


if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input().strip())

    for q_itr in range(q):
        s = input()

        result = palindromeIndex(s)

        fptr.write(str(result) + '\n')

    fptr.close()
