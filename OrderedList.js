class OrderedList {
    /**
     * Maintains an ordered list of elements
     * @param max
     * @param locus
     * @param {function} criterion that extracts the value to be compared from the element
     * @param distance
     */
    constructor(
        max = Number.MAX_SAFE_INTEGER,
        locus=0,
        criterion = e => e,
        distance = (a,b)=> Math.abs(b-a)
    ) {
        this.criterion = criterion;
        this.max = max;
        this.distance = distance;
        this.locus = locus;
        this.list = [];
    }
    add(e){
        if(this.list.length == 0){ this.list.push(e); return;}
        let pos = this._find(this.criterion(e));
        if(pos < this.list.length && this.criterion(this.list[pos]) == this.criterion(e)) throw "exists";
        console.log("splicing at "+pos);
        this.list.splice(
            pos
            , 0, e);
        if(this.list.length > this.max){
            let lodist = this.distance(this.criterion(this.list[0]),this.locus);
            let hidist = this.distance(this.criterion(this.list[this.list.length-1]),this.locus);
            if(hidist > lodist)
            {
                console.log("ejecting first ");
                return this.list.pop();
            }else{
                console.log("ejecting last ");
                return this.list.shift();
            }
        }
    }
    _find(id){
        console.log("inserting "+id);
        if (id < this.criterion(this.list[0])) return 0;
        if (id > this.criterion(this.list[this.list.length - 1])) return this.list.length;
        let low = 0, cursor = 0;
        let high = this.list.length-1;
        while(high-low>0) {
            cursor = (low + high) / 2;
            if (cursor % 1) {
                let c = Math.floor(cursor);
                if (id < this.criterion(this.list[c])) {
                    if (id == this.criterion(this.list[c])) return c;
                    high = c;
                } else if (id > this.criterion(this.list[c + 1])) {
                    low = c + 1;
                    if (id == this.criterion(this.list[c + 1])) return c + 1;
                } else {
                    return c + 1;
                }
            } else {
                if (id < this.criterion(this.list[cursor])) {
                    high = cursor;
                } else if (id > this.criterion(this.list[cursor])) {
                    low = cursor;
                } else {
                    return cursor;
                }
            }
        }
        console.log("first node added");
        return cursor;
    }
    get(e){
        let id = this.criterion(e);
        let pos = this._find(id);
        return this.list[pos];
    }
    remove(e){
        let id = this.criterion(e);
        let pos = this._find(id);
        if(this.criterion(this.list[pos]) == id){
            return this.list.splice(pos,1);
        }
        throw "not found";
    }
    getRange(){
        return[this.criterion(this.list[0]),this.criterion(this.list[this.list.length-1])];
    }
}
class OrderedFunctionList extends OrderedList{
    constructor(
        max = Number.MAX_SAFE_INTEGER,
        locus=0,
        criterion = e => e,
        distance = (a,b)=> Math.abs(b-a),
        func = (idx, size, locus)=>(idx/size)-0.5+locus
    ) {
        super(max, locus, criterion, distance);
        this.func = func;
    }
    add(e){
        if(this.list.length == 0){ this.list.push(e); return;}
        let pos = this._find(this.criterion(e));
        if(pos < this.list.length && this.criterion(this.list[pos]) == this.criterion(e)) throw "exists";
        console.log("splicing at "+pos);
        this.list.splice(
            pos
            , 0, e);
        if(this.list.length > this.max){
            console.log("ejecting");
            //eject the furthest from the optimum
            let res = this.list.reduce((acc, v, idx)=>{
                let opt = this.func(idx, this.list.length, this.locus);
                let dist = this.distance(opt,this.criterion(v));
                if(dist > acc.max){acc.max = dist; acc.idx = idx;}
                return acc;
            },{max:0, idx:0});
            return this.list.splice(res.idx,1)[0];
        }
    }

}