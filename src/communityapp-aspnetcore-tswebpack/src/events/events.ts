import {Router, RouterConfiguration} from "aurelia-router";

export class Events {
    private router: Router;
    configureRouter(config: any, router: Router) {
        this.router = router;
        config.title = "Events";
        config.map([
            { route: ["", "future"], moduleId: "./eventsList",
            title: "Future Events", nav: true, name: "future"},
            { route: "past", moduleId: "./eventsList",
            title: "Past Events", nav: true, name: "past", href: "#/events/past"}
        ]);
    }
}