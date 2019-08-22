#!/bin/bash

broker='http://155.54.95.248:9090/ngsi-ld/v1'
me='http://localhost:12345/notifyContext'

usage="$(basename "$0") [-h] [-b broker_ip] [-i my_ip] -- mocks-up the environment of an operator, setting his reference URL for notifs, and the broker's URL

where:
    -h  show this help text
    -i  set the operator reference URL for notifications (default: '$me')
    -b  set the broker URL for queriying and subscribing (default: '$broker')"

while getopts ':hb:i:' option; do
  case "$option" in
    h) echo "$usage"
       exit
       ;;
    i) me=$OPTARG
       ;;
    b) broker=$OPTARG
       ;;
    :) printf "missing argument for -%s\n" "$OPTARG" >&2
       echo "$usage" >&2
       exit 1
       ;;
   \?) printf "illegal option: -%s\n" "$OPTARG" >&2
       echo "$usage" >&2
       exit 1
       ;;
  esac
done
shift $((OPTIND - 1))

export adminCfg='[
    {
        "command": "CONNECT_BROKER",
        "brokerURL": "'"$broker"'"
    },
    {
        "command": "SET_REFERENCE",
        "url": "'"$me"'"
    },
    {
        "command": "SET_OUTPUTS",
        "id": "Out.2429876328.1",
        "type": "Out"
    }
]'
export myport=12345

if [ ! -d "node_modules" ]; then
  # run npm install!
  npm install
fi

node main.js
