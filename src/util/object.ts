let extend = (srcObj = {}, extObj) => {
    for (let i in extObj) {
        srcObj[i] = extObj[i];
    }
    return srcObj;
}

export {extend}