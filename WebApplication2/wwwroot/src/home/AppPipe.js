import { Elm } from "./Elm";
export function test() {
    const myMarkUp = new Elm("div").Attr("data-bork", "4").Swallow(() => [
        new Elm("span").Text("Hello"),
        new Elm("span").Text("bob").Style(n => n.display = "inline-block")
    ]).done();
}
export class App {
    constructor() {
        this.stuff = new Map();
        this.eventSubscribers = new Map();
    }
    Set(ctr) {
        const instance = new ctr();
        this.stuff.set(ctr.name, instance);
    }
    Get(ctr) {
        return this.stuff.get(ctr.name);
    }
    SendDomainEvent(domainEvent) {
        this.SendEvent(domainEvent.EventName, domainEvent);
    }
    SendEvent(eventName, event) {
        let recived = false;
        if (this.eventSubscribers.has(eventName)) {
            this.eventSubscribers.get(eventName).forEach(n => {
                n(event); // broadcast to all
                recived = true;
            });
        }
        console.log(eventName + event, "recived =" + recived);
    }
    HandleDomainEvent(eventType, callback) {
        this.Register(eventType.name, callback);
    }
    Register(eventName, callback) {
        if (this.eventSubscribers.has(eventName) && this.eventSubscribers.get(eventName).indexOf(callback) !== -1) {
            this.eventSubscribers.get(eventName).push(callback);
        }
        else {
            this.eventSubscribers.set(eventName, [callback]);
        }
    }
    Deregister(eventName, callback) {
        if (this.eventSubscribers.has(eventName)) {
            const subscriber = this.eventSubscribers.get(eventName);
            const index = subscriber.indexOf(callback);
            subscriber.splice(index, 1);
        }
    }
}
App.Pipe = new App();
//# sourceMappingURL=AppPipe.js.map