#!/bin/bash


brokerIP='155.54.95.248'

usage="$(basename "$0") [-h] [-b broker_ip] -- Serves static content and reverse proxies the Scorpio broker to avoid CORS

where:
    -h  show this help text
    -b  set the Scorpio broker IP for reverse proxying (default: '$brokerIP')"

while getopts ':hb:i:' option; do
  case "$option" in
    h) echo "$usage"
       exit
       ;;
    b) brokerIP=$OPTARG
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

docker run --rm --name nginx -v $PWD/nginx.conf:/etc/nginx/conf.d/default.conf:ro -v $PWD/:/usr/share/nginx/html/:ro -p 80:80 --add-host broker:$brokerIP nginx nginx-debug -g 'daemon off;'
