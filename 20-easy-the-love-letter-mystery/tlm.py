#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'theLoveLetterMystery' function below.
#
# The function is expected to return an INTEGER.
# The function accepts STRING s as parameter.
#

def theLoveLetterMystery(s):
    # Write your code here
    cl = list(s)
    
    count = 0
    idx_b = len(cl)-1
    
    for idx_f in range(len(cl)):
        
        if idx_b <= idx_f: 
            break
            
        while   ord( cl[idx_f] ) > ord( cl[idx_b] ):
            cl[idx_f] = chr( ord( cl[idx_f] ) -1 )
            count += 1
            
        while ord( cl[idx_f] ) < ord( cl[idx_b] ):
            cl[idx_b] = chr( ord( cl[idx_b] ) -1 )
            count += 1
            
        idx_b -= 1
        
    return count
        
# >>> ord('a')
# 97
# >>> chr(97)
# 'a'

    
    
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input().strip())

    for q_itr in range(q):
        s = input()

        result = theLoveLetterMystery(s)

        fptr.write(str(result) + '\n')

    fptr.close()
