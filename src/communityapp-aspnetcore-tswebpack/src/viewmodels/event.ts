// import {inject} from 'aurelia-framework';

// @inject("Cache")
export class Event {
    private item: any;

    constructor() {
        //cache.data.push('b');
    }
    activate(bindingContext: any){
        this.item = bindingContext;
    }
}