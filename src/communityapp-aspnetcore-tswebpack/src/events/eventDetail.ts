import {inject} from "aurelia-framework";
import {DataRepository} from "../services/dataRepository";
import {RouterConfiguration} from "aurelia-router";
@inject(DataRepository)
export class EventDetail {
    private event: any;
    constructor(private dataRepository: DataRepository) {
    }

    activate(params: any, routeConfig: RouterConfiguration) {
        console.log(parseInt(params.eventId, 10));
        this.event = this.dataRepository.getEvent(parseInt(params.eventId, 10));
    }
}