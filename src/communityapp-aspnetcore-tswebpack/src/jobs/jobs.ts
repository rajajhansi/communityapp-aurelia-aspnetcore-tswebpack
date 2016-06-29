import {Router, RouteConfig, RouterConfiguration, NavigationInstruction} from "aurelia-router";
import {inject} from "aurelia-framework";
import {DataRepository} from "../services/dataRepository";

@inject(DataRepository)
export class Jobs {
    private jobs: any[];
    private router: Router;

    constructor(private dataRepository) {
        console.log("creating jobs");
    }

    //configureRouter(config: any, router: Router) {
    //    this.router = router;
    //}
    activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {
        this.jobs = [];
        this.router = (routeConfig.navModel as any).router as Router;
        return this.dataRepository.getJobs().then( (jobs) => {
            this.jobs = jobs;
        });
    }

    addJob() {
        this.router.navigateToRoute("addJob");
    }
    //canActivate(params: any, routeConfig: RouterConfiguration, navigationInstruction: NavigationInstruction) {
    //    console.log("inside canActivate");
    //    var promise = new Promise((resolve: any, reject: any) => {
    //        setTimeout( (_: any) => {
    //            resolve(false);
    //            console.log("canActivate: false");
    //        }, 3000);
    //    });
    //    return promise;
    //}
}