ctxELement = {}
def handleEntity(ctxObj, create, update append):
    print('===============Implement losic====================')
    print(ctxObj)
    for ctx in ctxObj :
	handleScorpioUpdate(ctx, create, update append)


def handleupdateAppend(currUpdateCtx, create, update append):
    
    appendCtx = {}
    preUpdateCtx = ctxELement['eid']
    
    for key in range currUpdateCtx : 
        if preUpdateCtx.has_key(key) == false :
	    appendCtx[key] = currUpdateCtx[key]
    append(appendCtx)
    update(currUpdateCtx)
    
def handleScorpioUpdate(updateCtx):
	global ctxELement 
	eid = updateCtx['id']
	if ctxELement.has_key(id) == true
	    handleupdateAppend(updateCtx)
	else
	    ctxELement['eid'] = updateCtx
	    create(ctxObj)
    
    
