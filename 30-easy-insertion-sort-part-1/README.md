# hacker-rank-30-easy-insertion-sort-part-1

Hacker Rank

**I1nsertion Sort - Part 1**

https://www.hackerrank.com/challenges/insertionsort1/problem

### **Sorting**
One common task for computers is to sort data. For example, people might want to see all their files on a computer sorted by size.  Since sorting is a simple problem with many different possible solutions, it is often used to introduce the study of algorithms.

### **Insertion Sort**
These challenges will cover *Insertion Sort*, a simple and intuitive sorting algorithm.  We will first start with an already sorted list.

### **Insert element into sorted list**
Given a sorted list with an unsorted number ***e*** in the rightmost cell, can you write some simple code to ***insert e*** into the array so that it remains sorted?

Print the array every time a value is shifted in the array until the array is fully sorted.  The goal of this challenge is to follow the correct order of insertion sort.

*Guideline:* You can copy the value of ***e*** to a variable and consider its cell "empty".  Since this leaves an extra cell empty on the right, you can shift everything over until can be inserted.  This will create a duplicate of each value, but when you reach the right spot, you can replace it with ***e***

### **Input Format**
There will be two lines of input: 
- ***Size*** the size of the array
- ***Arr*** - the array containing ***Size*** - **1** sorted integers and **1** unsorted integer ***e*** in the right most cell.

### **Output Format**
On each line, output the entire array every time an item is shifted in it.

### **Constraints**

### **Sample Input**

```
5 24683
```

### **Sample Output**

```
24688 24668 24468 23468
```

### **Explanation**

is removed from the end of the array.
.
in the rightmost cell
  In the In the In the In the
st line nd line rd line th line
, so , so , so
, so
is shifted one cell to the right. is shifted one cell to the right. is shifted one cell to the right.
is placed at position .

### **Task**

Complete the method insertionSort which takes in one parameter: 

- an array with the value in the right-most cell.

### **Next Challenge**

In the next Challenge, we will complete the insertion sort itself!

# **notes**

solutions in "to be done" 

# **how to run**

### **To Run javascript version:**

node eis.js < input-sample-0.txt 
