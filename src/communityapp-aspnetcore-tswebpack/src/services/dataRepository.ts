import {eventsData} from "./eventData";
import moment from "moment";

function filterAndFormat(pastOrFuture: string, events: any[]) {
    "use strict";
    var results = JSON.parse(JSON.stringify(events));
    if(pastOrFuture === "past") {
        results = results.filter((item: any) => moment(item.dateTime) < moment());
    } else if(pastOrFuture === "future") {
        //console.log(moment());
        results = results.filter((item: any) => moment(item.dateTime) > moment());
    } else {
        results = results;
    }
    results.forEach( (item: any) => {
        var dateTime = moment(item.dateTime)
            .format("MM/DD/YYYY HH:mm");
        item.dateTime = dateTime;
    });

    return results;
}
export class DataRepository {
    private events : any[];
    constructor() {
        console.log("creating dataRepository");
    }
    getEvents(pastOrFuture: string) {
       // console.log("getEvents, pastOrFuture " + pastOrFuture);
       var promise = new Promise((resolve: any, reject: any) => {
           if(!this.events) {
               setTimeout( () => {
                   this.events = eventsData.sort((a: any, b: any) =>
                        a.dateTime >= b.dateTime ? 1 : -1);
                   resolve(filterAndFormat(pastOrFuture, this.events));
                //    this.events.forEach((item:any) => {
                //         var dateTime = moment(item.dateTime)
                //             .format("MM/DD/YYYY HH:mm");
                //         item.dateTime = dateTime;
                //    });
                //    resolve(this.events);
               }, 10);
           } else {
               resolve(filterAndFormat(pastOrFuture, this.events));
           }
       });
       return promise;
    }
    getEvent(eventId: number) {
        console.log(this.events);
        return this.events.find((item:any) => item.id === eventId);
    }
}