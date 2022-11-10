# hacker-rank-the-love-letter-mystery

### **Hacker Rank**

Sherlock and Anagrams - 50 - medium

https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem

Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string. Given a string, find the number of pairs of substrings of the string that are anagrams of each other.

### **Example**

***s*** = ***mom***

The list of all anagrammatic pairs is [***m***,***m***],[***mo***,***om***] at positions [[0],[2]],[[0,1],[1,2]] respectively.

### **Function Description**

Complete the function sherlockAndAnagrams in the editor below.

sherlockAndAnagrams has the following parameter(s):

 - string s: a string

### **Returns**

- int: the number of unordered anagrammatic pairs of substrings in ***s***
 

### **Input Format**

The first line contains an integer ***q***, the number of queries.
Each of the next ***q*** lines contains a string ***s*** to analyze.

### **Constraints**

- 1 ≤ ***q*** ≤ 10
- 2 ≤ length of ***s*** ≤ 100
- ***s*** contains only lowercase letters in the range ascii[a-z].
- All characters are in the range ascii[a-z].

### **Sample Input 0**

```
2
abba
abcd
```

### **Sample Output 0**

```
4
0
```

### **Explanation 0***

The list of all anagrammatic pairs is 
[a,a],
[ab,ba],
[b,b] and 
[abb,bba] at positions 
[
    [0],[3]
],
[
    [0,1],[2,3]
] and 
[
    [0,1,2],[1,2,3]
] 
respectively.

No anagrammatic pairs exist in the second query as no character repeats.

### **Sample Input 1**

```
2
ifailuhkqq
kkkk
```

### **Sample Output 1**

```
3
10
```

### **Explanation 1***

For the first query, we have anagram pairs 
[i,i],
[q,q] and
[ifa,fai]
at positions 
[
    []
]

 and  respectively.

For the second query:
There are 6 anagrams of the form  at positions  and .
There are 3 anagrams of the form  at positions  and .
There is 1 anagram of the form  at position .

### **Sample Input 2**

```
1
cdcd
```

### **Sample Output 2**

```
5
```

### **Explanation 2***

There are two anagrammatic pairs of length 1:
[c,c] and 
[d,d].

There are three anagrammatic pairs of length 2: 
[cd,dc],
[cd,cd],
[dc,cd]
at positions  
[
    [0,1],
    [1,2]
],
[
    [0,1],
    [2,3]
],
[
    [1,2],
    [2,3]
]
respectively.

# how to run

### To Run javascript version:

$ node pi.js < test-case-0.txt 
