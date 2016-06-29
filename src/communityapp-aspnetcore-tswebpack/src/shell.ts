import {Router, RouterConfiguration, NavigationInstruction} from "aurelia-router";
import * as toastr from "toastr";

export class Shell {
    private parentprop: string;
    private router: Router;
    constructor() {
        this.parentprop = "Hug your parents!";
    }
    configureRouter(config: RouterConfiguration, router: Router) {
        this.router = router;
        config.title = "Capital Area .NET User Group";
        config.addPipelineStep("authorize", ToastNavResult);
        //config.options.pushState = true;
        config.map([
            { route: ["", "events"],
            viewPorts: { mainContent: {moduleId: "./events/events"}, sideBar: {moduleId: "./sideBar/sponsors"}},
            name: "Events", title: "Events", nav: true },
            { route: "jobs",
            viewPorts: { mainContent: {moduleId: "./jobs/jobs"}, sideBar: {moduleId: "./sideBar/sponsors"}},
            name: "Jobs", title: "Jobs", nav: true},
            { route: "discussions",
            viewPorts: { mainContent: {moduleId: "./discussions/discussions"}, sideBar: {moduleId: "./sideBar/ads"}},
            name: "Discussions", title: "Discussions", nav:true },
            { route: "eventDetail/:eventId",
            viewPorts: { mainContent: {moduleId: "./events/eventDetail"}, sideBar: {moduleId: "./sideBar/ads"}},
            name: "eventDetail" }
        ]);
    }
}

class ToastNavResult {
    run(navigationInstruction: NavigationInstruction, next: Function) {
        console.log("Inside run");
        return next().then((a: any) => { console.log(a.status); toastr.info(a.status); return a;});
    }
}