#!/bin/bash

compiler=$1
file=$2
output=$3
addtionalArg=$4

exec  1> $"/codeDir/logfile.txt"
exec  2> $"/codeDir/errors"

START=$(date +%s.%2N)
if [ "$output" = "" ]; then
    $compiler /codeDir/$file -< $"/codeDir/inputFile" 
else
        $compiler /codeDir/$file $addtionalArg 
	if [ $? -eq 0 ];	then
		$output -< $"/codeDir/inputFile" 
	else
	    echo "Compilation Failed"
	fi
fi
END=$(date +%s.%2N)
runtime=$(echo "$END - $START" | bc)
echo "COMPILER END" $runtime 
mv /codeDir/logfile.txt /codeDir/completed
