#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'plusMinus' function below.
#
# The function accepts INTEGER_ARRAY arr as parameter.
#

def plusMinus(arr):
    # Write your code here
    count_pos = 0
    count_neg = 0
    count_zero = 0
    count_arr = len(arr)
    for i in arr:
        if i>0:
            count_pos += 1
        elif i<0 :
            count_neg += 1
        else:
            count_zero += 1
    print("{:.6f}".format(count_pos/count_arr))
    print("{:.6f}".format(count_neg/count_arr))
    print("{:.6f}".format(count_zero/count_arr))

if __name__ == '__main__':
    n = int(input().strip())

    arr = list(map(int, input().rstrip().split()))

    plusMinus(arr)