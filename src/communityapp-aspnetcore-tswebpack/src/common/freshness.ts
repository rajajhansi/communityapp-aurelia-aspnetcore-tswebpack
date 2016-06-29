export class FreshnessValueConverter {
    toView(value) {
        var now: any = new Date();
        if (Math.floor((now - value) / 1000) > 10) return "red";
        now = new Date();
        if (Math.floor((now - value) / 1000) > 5) return "yellow";
        else return "white";
    }
}