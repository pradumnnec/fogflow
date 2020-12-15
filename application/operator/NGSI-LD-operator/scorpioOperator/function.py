ctxELement = {}

def handleEntity(ctxObj, create, update, append):
    print('===============Implement losic====================')
    print(ctxObj)
    ctxArray = []
    ctxArray.append(ctxObj)
    for ctx in ctxArray :
	handleScorpioUpdate(ctx, create, update, append)


def handleupdateAppend(currUpdateCtx, create, update, append):
    
    appendCtx = {}
    eid = currUpdateCtx['id']
    preUpdateCtx = ctxELement[eid]
    
    for key in  currUpdateCtx : 
        if preUpdateCtx.has_key(key) == False :
	    appendCtx[key] = currUpdateCtx[key]
    append(appendCtx)
    update(currUpdateCtx)
    

def handleScorpioUpdate(ctx, create, update, append):
	global ctxELement 
	eid = ctx['id']
	if ctxELement.has_key(eid) == True:
	    handleupdateAppend(ctx, create, update, append)
	else:
	    ctxELement['eid'] = ctx
	    create(ctx)
    
    
