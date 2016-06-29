import {inject} from "aurelia-framework";
import {Router, RouteConfig, RouterConfiguration, NavigationInstruction} from "aurelia-router";
import {DataRepository} from "../services/dataRepository";

@inject(DataRepository)
export class AddJob {
    private job: any = { jobType: "Full Time", jobSkills: [] };
    private states: any[];
    private jobTypes: string[];
    private jobSkills: string[];
    private router: Router;

    constructor(private dataRepository) {
        this.dataRepository.getStates().then( (states) => {
            this.states = states;
        });
        this.dataRepository.getJobTypes().then((jobTypes) => {
            this.jobTypes = jobTypes;
        });
        this.dataRepository.getJobSkills().then((jobSkills) => {
            this.jobSkills = jobSkills;
        });
    }

    //configureRouter(config: RouterConfiguration, router: Router) {
    //    this.router = router;
    //}
    activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {
        this.router = (routeConfig.navModel as any).router as Router;
    }

    save() {
        if (this.job.needDate) {
            this.job.needDate = new Date(this.job.needDate);
        }
        this.dataRepository.addJob(this.job).then((job) => this.router.navigateToRoute("jobs"));
    }
}