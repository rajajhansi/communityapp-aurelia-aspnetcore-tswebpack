import {eventsData} from "./eventData";
import {jobsData, states, jobTypes, jobSkills} from "./jobsData";
import moment from "moment";
import {BindingSignaler} from "aurelia-templating-resources";
import {inject} from "aurelia-framework";

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
    //results.forEach( (item: any) => {
    //    var dateTime = moment(item.dateTime)
    //        .format("MM/DD/YYYY HH:mm");
    //    item.dateTime = dateTime;
    //});

    return results;
}

@inject(BindingSignaler)
export class DataRepository {
    private events: any[];
    private jobs: any[];
    private jobTypes: string[];
    private jobSkills: string[];
    private states: any[];
    constructor(private bindingSignaler) {
        console.log("creating dataRepository");
        setInterval(() => { bindingSignaler.signal("check-freshness"); }, 1000);
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

    addJob(job) {
        var promise = new Promise((resolve, reject) => {
            this.jobs.push(job);
            resolve(job);
        });
        return promise;
    }

    getJobs() {
        var promise = new Promise((resolve, reject) => {
            if (!this.jobs) {
                this.jobs = jobsData;
            }
            resolve(this.jobs);
        });
        return promise;
    }

    getStates() {
        var promise = new Promise((resolve, reject) => {
            if (!this.states) {
                this.states = states;
            }
            resolve(this.states);
        });
        return promise;
    }

    getJobTypes() {
        var promise = new Promise((resolve, reject) => {
            if (!this.jobTypes) {
                this.jobTypes = jobTypes;
            }
            resolve(this.jobTypes);
        });
        return promise;
    }

    getJobSkills() {
        var promise = new Promise((resolve, reject) => {
            if (!this.jobSkills) {
                this.jobSkills = jobSkills;
            }
            resolve(this.jobSkills);
        });
        return promise;
    }
}