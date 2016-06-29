import {RouterConfiguration, NavigationInstruction} from "aurelia-router";
export class Jobs {
    constructor() {
        console.log("creating jobs");
    }

    canActivate(params: any, routeConfig: RouterConfiguration, navigationInstruction: NavigationInstruction) {
        var promise = new Promise((resolve: any, reject: any) => {
            setTimeout( (_: any) => {
                resolve(false);
            }, 3000);
        });
        return promise;
    }
}