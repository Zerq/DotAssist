import { AbsCtr, Ctr, Elm } from "./Elm.js";
import { ViewBase } from "./ViewBase.js";

class Commands {
    public SelectedVersion = "SelectedVersion";
}

export class App {
    private constructor() { }
    public static Pipe = new App();
    public static Commands = new Commands();
    private stuff: Map<string, any> = new Map();
    private views: Map<string, any> = new Map();
    private activeView: ViewBase;

    public ShowView<T extends ViewBase>(viewCtr: Ctr<T>) {
        let instance:ViewBase; 
       
        if (this.views.has(viewCtr.name)){
            instance = this.views.get(viewCtr.name);  
        } else {
            customElements.define(viewCtr.name.toLowerCase() + "-element", viewCtr);
            instance = <T> document.createElement(viewCtr.name.toLowerCase() + "-element");
            this.views.set(viewCtr.name, instance);
        }

        this.activeView = instance;
        const html = document.getElementById("appMain");            
        
        if(html){
            html.innerHTML = "";
            html.appendChild(this.activeView);
        }
    }


    public Set<T>(ctr: Ctr<T>) {
        const instance = new ctr()
        this.stuff.set(ctr.name, instance);
    }

    public Get<T>(ctr: Ctr<T>): T {
        return this.stuff.get(ctr.name);
    }

    private eventSubscribers: Map<string, Array<(event: any) => void>> = new Map();

    public SendEvent<T>(eventName: string, event: T) {
        let recived = false;
        if (this.eventSubscribers.has(eventName)) {
            this.eventSubscribers.get(eventName)?.forEach(n => {
                n(event); // broadcast to all
                recived = true;
            });
        }

        console.log(eventName + event, "recived =" + recived);
    }

    public Register<T>(eventName: string, callback: (event: T) => void) {
        if (!this.eventSubscribers) {
            throw new Error("this.eventSubscribers was empty/undefined or null");
        }

        if (!callback) {
            throw new Error("callback was empty/undefined or null");
        }

        if (!eventName) {
            throw new Error("eventName was empty/undefined or null");
        }


        if (
            this.eventSubscribers.has(eventName) &&
            this.eventSubscribers.get(eventName)?.indexOf(callback) !== -1) {
            this.eventSubscribers.get(eventName)?.push(callback);
        }
        else {
            this.eventSubscribers.set(eventName, [callback]);
        }
    }

    public Deregister(eventName: string, callback: (event: any) => void) {
        if (this.eventSubscribers.has(eventName)) {
            const subscriber = this.eventSubscribers.get(eventName);
            const index = subscriber?.indexOf(callback);

            if (index == null) {
                return;
            }

            subscriber?.splice(index, 1);
        }
    }
}
