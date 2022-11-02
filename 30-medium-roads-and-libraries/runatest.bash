#!/bin/bash
node ral.js -s --val:tests/"test-case-${1}-out.txt" < tests/"test-case-$1.txt"  
