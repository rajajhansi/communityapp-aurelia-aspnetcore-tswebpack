import {computedFrom} from "aurelia-framework";
export class Sponsors {
    private message: string;
    private mapCollection: Map<string, string>;
    private styleString: string;
    private styleObject: any;
    private customerColor: string;
    private customerStatus: string;
    private person: Person;
    private trades: any;
    constructor() {
        console.log("creating Sponsors");
        this.message = "Sponsors";
        setTimeout(() => this.message = "Changed after binding", 3000);
        this.mapCollection = new Map<string, string>();
        this.mapCollection.set("a", "Alpha");
        this.mapCollection.set("b", "Beta");
        this.mapCollection.set("c", "Charlie");
        this.mapCollection.set("d", "Delta");
        this.styleString = "background: red";
        this.styleObject = { background: "green" };
        this.customerColor = "purple";
        this.customerStatus = "bad";
        this.person = new Person();
        this.person.firstName = "Raja";
        this.person.lastName = "Mani";
        this.trades = [{ amount: 99.94, time: new Date() }];
        setTimeout(() => this.trades.push({ amount: 33.54, time: new Date() }), 3000);
    }
    doSomething(msg: string) {
        console.log(msg);
    }

    myinterceptor(method, update, value) {
        console.log(value);
        update(value);
    }
}

class Person {
    public  firstName: string;
    public lastName: string;
    @computedFrom("firstName", "lastName")
    get fullName() { return this.firstName + " " + this.lastName;  }
}