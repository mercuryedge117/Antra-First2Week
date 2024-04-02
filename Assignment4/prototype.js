Array.prototype.myFilter = function(callback)  {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            res.push(this[i]);
        }
    }
    return res;
}

Array.prototype.myReduce = function(callback, initial)  {
    let res = initial ? initial : 0;
    for (let i = 0; i < this.length; i++) {
        res = callback(res, this[i], i, this);
    }
    return res;
}