# hacker-rank-20-easy-alternating-characters

Hacker Rank

**Alternating Characters**

https://www.hackerrank.com/challenges/alternating-characters/problem

You are given a string containing characters  and  only. Your task is to change it into a string such that there are no matching adjacent characters. To do this, you are allowed to delete zero or more characters in the string.

Your task is to find the minimum number of required deletions.

### **Example**

***s*** = ***AABAAB***

Remove an ***A*** at positions ***0***  and ***3*** to make ***s*** = ***ABAB*** in 2 deletions.

### **Function Description**

Complete the alternatingCharacters function in the editor below.

alternatingCharacters has the following parameter(s):

- string s: a string

### **Returns**

- int: the minimum number of deletions required

### **Input Format**

The first line contains an integer ***q***, the number of queries.
The next ***q*** lines each contain a string  to analyze.

### **Constraints**

- 1 ≤ ***q*** ≤ 10
- 1 ≤ length of ***s*** ≤ 10<sup>5</sup>
- Each string ***s*** will consist only of characters ***A*** and ***B***.

### **Sample Input**

```
5
AAAA
BBBBB
ABABABAB
BABABA
AAABBB
```

### **Sample Output**

```
3
4
0
0
4
```

### **Explanation**

```
 ↓↓↓
AAAA -> A (3 deletions)
 ↑↑↑

 ↓↓↓↓
BBBBB  -> B (4 deletions)
 ↑↑↑↑

ABABABAB -> ABABABAB (0 deletions)

BABABA -> BABABA (0 deletions)

 ↓↓ ↓↓
AAABBB -> AB (4 deletions)
 ↑↑ ↑↑
```

The characters marked with arrows are the ones that can be deleted so that the string does not have matching adjacent characters.

# **notes**

solutions in javascript, python 3, C, & C++ 

# **how to run**

### **To Run javascript version:**

node ac.js < input-sample-0.txt 
