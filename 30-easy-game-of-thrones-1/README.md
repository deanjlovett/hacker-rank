# hacker-rank-game-of-thrones-1

Hacker Rank

Game of Thrones - I

https://www.hackerrank.com/challenges/game-of-thrones/problem

Dothraki are planning an attack to usurp King Robert's throne. King Robert learns of this conspiracy from Raven and plans to lock the single door through which the enemy can enter his kingdom.

But, to lock the door he needs a key that is an anagram of a palindrome. He starts to go through his box of strings, checking to see if they can be rearranged into a palindrome. Given a string, determine if it can be rearranged into a palindrome. Return the string YES or NO.

### Example

***s*** = 'aabbccdd'

One way this can be arranged into a palindrome is . Return YES.

### Function Description

Complete the gameOfThrones function below.

gameOfThrones has the following parameter(s):

- string s: a string to analyze

### Returns

-string: either YES or NO

### Input Format

A single line which contains ***s***.

### Constraints

- 1 ≤ |s| ≤ 10⁵
- ***s*** contains only lowercase letters in the range ***ascii[a...z]***

### Sample Input 0

aaabbbb

### Sample Output 0

YES

### Explanation 0

A palindromic permutation of the given string is bbaaabb.

### Sample Input 1

```
cdefghmnopqrstuvw
```

### Sample Output 1

NO

### Explanation 1

Palindromes longer than 1 character are made up of pairs of characters. There are none here.

### Sample Input 2

```
cdcdcdcdeeeef
```

### Sample Output 2

YES

### Explanation 2

An example palindrome from the string: ddcceefeeccdd.

# how to run

### To Run javascript version:

$ node got1.js < sample-test-0.txt 
