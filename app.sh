#!/bin/bash

if [ "$1" = "start" ]
then
    nohup ./node.sh
else
    nodeps=$(ps -ef | grep 'node app.js')
    is_node="$(echo ${nodeps} | cut -d " " -f8)"

    if [ "$1" = "status" ] 
    then
        if [ $is_node == "node" ]
        then
            echo "node is running"
        else
            echo "node is NOT running"
        fi    
    elif [ "$1" = "stop" ]
    then
        pid="$(echo ${nodeps} | cut -d " " -f2)"
        kill -9 $pid
        echo "Successfully stopped node"
    else
        echo "Invalid Parameter!"
    fi
fi