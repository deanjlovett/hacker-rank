# hacker-rank-the-love-letter-mystery

### **Hacker Rank**

Two Strings - 25 - easy

https://www.hackerrank.com/challenges/two-strings/problem

Given two strings, determine if they share a common substring. A substring may be as small as one character.

### **Example**

For example, the words "a", "and", "art" share the common substring . The words "be" and "cat" do not
share a substring.

### **Function Description**

Complete the function twoStrings in the editor below. It should return a string, either YES or NO based
on whether the strings share a common substring.
twoStrings has the following parameter(s):
s1, s2: two strings to analyze .

### **Input Format**

The first line contains a single integer , the number of test cases.
The following pairs of lines are as follows:
- The first line contains string ***s***1.
- The second line contains string ***s***2.

### **Constraints**

- ***s1*** and ***s2*** consist of characters in the range ascii[a-z].
- 1 ≤ ***p*** ≤ 10
- 1 ≤ |***s***1|,|***s***2| ≤ 10<sup>5</sup>

### **Output Format**

For each pair of strings, return **YES** or **NO**.

### **Sample Input**

```
2
hello
world
hi
world
```

### **Sample Output**

```
YES
NO
```

### **Explanation**

We have pairs to check:
1. ***s***1 = "hello", ***s***2 = "world". The substrings "o" and "l" are common to both strings.
2. ***a*** = "hi", ***b*** = "world. ***s***1 and ***s***2 share no common substrings.