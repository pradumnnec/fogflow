from flask import Flask, jsonify, abort, request, make_response
import requests
import json
import time
import datetime
import threading
import os
import sys

import function as fogflow

app = Flask(__name__, static_url_path='')

start = False
startTime = ''

@app.route('/notifyContext', methods=['POST'])

def notify():
    //handle notification
    if start = True :
        startTime = ()
	# find The throughtput



def runApp():
    myport = 8085
    app.run(host='0.0.0.0', port=myport)


def subscribe():
    
if __name__ == '__main__':
     #run app
    setConfig()
    runApp()
    sid = Subscribe()
    
     

