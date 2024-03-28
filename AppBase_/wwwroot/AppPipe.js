class Commands {
    SelectedVersion = "SelectedVersion";
}
export class App {
    constructor() { }
    static Pipe = new App();
    static Commands = new Commands();
    stuff = new Map();
    views = new Map();
    activeView;
    ShowView(viewCtr) {
        let instance;
        if (this.views.has(viewCtr.name)) {
            instance = this.views.get(viewCtr.name);
        }
        else {
            customElements.define(viewCtr.name.toLowerCase() + "-element", viewCtr);
            instance = document.createElement(viewCtr.name.toLowerCase() + "-element");
            this.views.set(viewCtr.name, instance);
        }
        this.activeView = instance;
        const html = document.getElementById("appMain");
        if (html) {
            html.innerHTML = "";
            html.appendChild(this.activeView);
        }
    }
    Set(ctr) {
        const instance = new ctr();
        this.stuff.set(ctr.name, instance);
    }
    Get(ctr) {
        return this.stuff.get(ctr.name);
    }
    eventSubscribers = new Map();
    SendEvent(eventName, event) {
        let recived = false;
        if (this.eventSubscribers.has(eventName)) {
            this.eventSubscribers.get(eventName)?.forEach(n => {
                n(event); // broadcast to all
                recived = true;
            });
        }
        console.log(eventName + event, "recived =" + recived);
    }
    Register(eventName, callback) {
        if (!this.eventSubscribers) {
            throw new Error("this.eventSubscribers was empty/undefined or null");
        }
        if (!callback) {
            throw new Error("callback was empty/undefined or null");
        }
        if (!eventName) {
            throw new Error("eventName was empty/undefined or null");
        }
        if (this.eventSubscribers.has(eventName) &&
            this.eventSubscribers.get(eventName)?.indexOf(callback) !== -1) {
            this.eventSubscribers.get(eventName)?.push(callback);
        }
        else {
            this.eventSubscribers.set(eventName, [callback]);
        }
    }
    Deregister(eventName, callback) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwUGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHBQaXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sUUFBUTtJQUNILGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztDQUM5QztBQUVELE1BQU0sT0FBTyxHQUFHO0lBQ1osZ0JBQXdCLENBQUM7SUFDbEIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUNoQyxLQUFLLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7SUFDcEMsS0FBSyxHQUFxQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3BDLFVBQVUsQ0FBVztJQUV0QixRQUFRLENBQXFCLE9BQWU7UUFDL0MsSUFBSSxRQUFpQixDQUFDO1FBRXRCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7WUFDOUIsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxDQUFDO2FBQU0sQ0FBQztZQUNKLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEUsUUFBUSxHQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FB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