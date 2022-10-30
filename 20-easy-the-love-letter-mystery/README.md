# hacker-rank-the-love-letter-mystery

Hacker Rank

The Love-Letter Mystery - 20 - easy

https://www.hackerrank.com/challenges/the-love-letter-mystery/problem

James found a love letter that his friend Harry has written to his girlfriend. James is a prankster, so he decides to meddle with the letter. He changes all the words in the letter into ***palindromes***.

To do this, he follows two rules:

1. He can only reduce the value of a letter by **1**, i.e. he can change d to c, but he cannot change c to d or d to b.
2. The letter ***a*** may not be reduced any further.

Each reduction in the value of any letter is counted as a single operation. Find the minimum number of operations required to convert a given string into a **palindrome**.

### **Example**

The following two operations are performed: cd**e** → cd**d** → cdc. Return **2**.

### **Function Description**

Complete the theLoveLetterMystery function in the editor below.

theLoveLetterMystery has the following parameter(s):

- string s: the text of the letter

### **Returns**

- int: the minimum number of operations

### **Input Format**

The first line contains an integer ***q***, the number of queries.
The next ***q*** lines will each contain a string ***s***.

### **Constraints**

- **1 ≤ q ≤ 10**
- **1 ≤ | s | ≤ 10<sup>4</sup>**

All strings are composed of lower case English letters, ascii[a-z], with no spaces.

### **Sample Input**

```
STDIN   Function
-----   --------
4       q = 4
abc     query 1 = 'abc'
abcba
abcd
cba
```

### **Sample Output**

```
2
0
4
2
```

### **Explanation**

1. For the first query, ab**c** → ab**b** → aba.
2. For the second query, abcba is already a palindromic string.
3. For the third query, abc**d** → abc**c** → abc**b** → ab**c**a → abba.
4. For the fourth query, **c**ba → **b**ba → aba.


# Solutions:

2022-10-30: Completed solution in C & Python

# how to run

### To Run javascript version:

$ node tlm.js < sample-input.txt 
