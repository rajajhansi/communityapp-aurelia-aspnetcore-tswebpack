
function getDiscussionInput(): string {
    // fake data access
    return "";
}

function cloneObject(obj: any) : any {
    return JSON.parse(JSON.stringify(obj));
}

export class Discussions {
    private discussionInput: string;
    private originalInput: any;
    constructor() {
        console.log("creating Discussion");
    }
    activate() {
        this.discussionInput = getDiscussionInput();
        this.originalInput = cloneObject(this.discussionInput);
    }
    save() {
        // simulate save
        this.originalInput = cloneObject(this.discussionInput);
    }
    canDeactivate() {
        if(JSON.stringify(cloneObject(this.discussionInput)) !=
        JSON.stringify(this.originalInput)) {
            if(confirm("Unsaved data, are you sure you want to navigate away?")) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}