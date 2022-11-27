#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'insertionSort1' function below.
#
# The function accepts following parameters:
#  1. INTEGER n
#  2. INTEGER_ARRAY arr
#

def printList(arr):
    la = len(arr)
    if la == 0:
        print()
        return
    pl = str(arr[0])
    for e in arr[1:]:
        pl += " " + str(e)
    print(pl)


def insertionSort1(n, arr):
    # Write your code here
    kv = arr[-1]
    #print(" kv:",kv)
    idx = len(arr)-1
    #print("idx:",idx)
    while arr[idx-1] > kv:
        arr[idx] = arr[idx-1]
        printList(arr)
        idx -= 1
        if idx == 0:
            break
    arr[idx] = kv
    printList(arr)
    return

if __name__ == '__main__':
    n = int(input().strip())

    arr = list(map(int, input().rstrip().split()))

    insertionSort1(n, arr)
