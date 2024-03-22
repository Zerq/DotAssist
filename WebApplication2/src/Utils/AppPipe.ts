import { DomainCommand } from "../Commands/DomainCommand";
import { DomainEvent } from "../Events/DomainEvent";
import { Ctr, Elm } from "./Elm";

export function test() {

   const myMarkUp = new Elm("div").Attr("data-bork", "4").Swallow(() => [
        new Elm("span").Text("Hello"),
        new Elm("span").Text("bob").Style(n => n.display = "inline-block")
    ]).done();

}

class Commands {
    public SelectedVersion = "SelectedVersion";
    public AppMenuItemClicked = "AppMenuItemClicked";
}



export class App {
    private constructor() { }
    public static Pipe = new App();
    public static Commands = new Commands();
    private stuff: Map<string, any> = new Map();

    public Set<T>(ctr: Ctr<T>) {
        const instance = new ctr()
        this.stuff.set(ctr.name, instance);
    }
    public Get<T>(ctr: Ctr<T>): T {
        return this.stuff.get(ctr.name);
    }
    private eventSubscribers: Map<string, Array<(event: any) => void>> = new Map();
    public SendDomainEvent(domainEvent: DomainEvent) {
        this.SendEvent(domainEvent.EventName, domainEvent);
    }
    public HandleDomainEvent<T extends DomainEvent>(domainEvent: Ctr<T>, callback: (event: T) => void) {
        this.Register(domainEvent.name, callback);
    }
    public ExecuteCommand(domainCommand: DomainCommand) {
        this.SendEvent("ExecuteCommand", domainCommand);
    }
    public SendEvent<T>(eventName:string, event: T) {
        let recived = false;
        if (this.eventSubscribers.has(eventName)) {
            this.eventSubscribers.get(eventName).forEach(n => {
                n(event); // broadcast to all
                recived = true;           
            });
        }


            console.log(eventName +  event, "recived =" + recived);


    }
    public Register<T>(eventName: string, callback: (event: T) => void) {
        if (this.eventSubscribers.has(eventName) && this.eventSubscribers.get(eventName).indexOf(callback) !== -1) {
            this.eventSubscribers.get(eventName).push(callback);
        }
        else {
            this.eventSubscribers.set(eventName, [callback]);
        }
    }
    public Deregister(eventName: string, callback: (event: any) => void) {
        if (this.eventSubscribers.has(eventName)) {
            const subscriber = this.eventSubscribers.get(eventName);
            const index = subscriber.indexOf(callback);
            subscriber.splice(index, 1);
        }
    }
}
