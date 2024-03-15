
import * as signalR from"@microsoft/signalr";
import "./index.css";

export class Index {
    private hub: signalR.HubConnection;
    public async run() {
 
        this.hub = new signalR.HubConnectionBuilder().withUrl("/events").build();

        await this.hub.start().then(async () => {
            document.body.innerHTML = "ready";
            this.hub.on("eventRecived", evt => {
                console.log(evt);
            });

           this.hub.send("Say",);
        });
    }
}

(function (){
    new Index().run().then(() => {
        console.log("done");
    })
}());


