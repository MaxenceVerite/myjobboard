export default class Range{
    min: number
    max?: number

  
    constructor(min: number, max?: number) {
        if(max && max < min) throw new Error();
        
        this.min= min;
        this.max= max;
    };

}