import {DataCache} from "../dataCache";
import {inject, Lazy, All} from "aurelia-framework";
import {DataRepository} from "../services/dataRepository";
import {ImLazy} from "../ImLazy";
import {Router, activationStrategy} from "aurelia-router";

@inject(DataRepository, Router, "Cache", Lazy.of(ImLazy), All.of("SuperPlugIn"))
export class EventsList {
    private events : any[];
    private cache: DataCache;
    private lazyOfImLazy: ImLazy;
    private whoareyou: string;

    constructor(private dataRepository: DataRepository, private router: Router, dataCache: DataCache,
        private getLazyOfImLazy: () => ImLazy, private plugins: any[]) {
        // this.events = [
        //     {id:1, title:"Aurelia Fundamentals"},
        //     {id:2, title:"Data-Centric SPA with BreezeJS" }
        // ];
        console.log("Ctor");
        this.cache = dataCache;
        this.cache.data.push("a");
        this.lazyOfImLazy = getLazyOfImLazy();
        this.whoareyou = "Luke, I am your father";

        plugins.forEach((plugin: any) => {
            plugin.doPlugInStuff();
        });
    }

    goToDiscussion() {
        this.router.navigateToRoute("eventDetail", {eventId: this.events[0].id });
    }

    activate(params: any, routeConfig: any) {
      console.log("activated");
      // console.log(routeConfig);
      var pastOrFuture = routeConfig.name === "" ? "future" : routeConfig.name;
      // console.log(pastOrFuture);
      return this.dataRepository.getEvents(pastOrFuture).then((events: any[]) => {
          if(params.speaker || params.topic) {
            var filteredResults = [];
            events.forEach((item: any) => {
                if(params.speaker && item.speaker.toLowerCase().
                indexOf(params.speaker.toLowerCase()) >= 0) {
                    filteredResults.push(item);
                }
                if(params.topic && item.title.toLowerCase().
                indexOf(params.topic.toLowerCase()) >= 0) {
                    filteredResults.push(item);
                }
            });
            this.events = filteredResults;
          } else {
                this.events = events;
          }
          this.events.forEach((item:any) => {
              item.detailUrl = this.router.generate("eventDetail", {eventId: item.id});
                //console.log(item.detailUrl);
          });
        });
    }

    // canActivate() {
    //     console.log("canActivate");
    //     return true;
    // }

    // canDeactivate() {
    //     console.log("canDeactivate");
    //     return true;
    // }

    // deactivate() {
    //     console.log("deactivate");
    // }

    determineActivationStrategy() {
        //console.log("determineActivationStrategy called");
        return activationStrategy.invokeLifecycle;
    }
    createAndUseLazy() {
        console.log("about to use lazy");
        this.lazyOfImLazy.doStuff();
    }
}