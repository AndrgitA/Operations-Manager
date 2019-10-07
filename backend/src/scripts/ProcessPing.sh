#!/bin/bash

for ((;;))
do
    tmp= ping -c 1 www.google.com | grep "bytes from";
    echo $tmp
    sleep 1
done