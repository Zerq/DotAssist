import { App } from "./AppPipe.js";

import { StripMenuDropDown, SelectEvent,DropDownItemLike, MenuStrip } from "./Component/Menu/Menu.js";
import { Elm } from "./Elm.js";
import { ViewBase } from "./ViewBase.js";


export interface BurklaxLike {
      Name:string;
      Value:number;
}

export class MainView extends ViewBase {
    public connectedCallback() {
        this.Render();
    }

    public disconnectedCallback() {
    }

    public adoptedCallback() {
    }

    public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    }

    public Render(): void {

        const testValues:Array<BurklaxLike> = [{ Name: "zog", Value: 3 },{Name: "blarg", Value:6},{Name:"hagrSlag", Value:84}];

        this.innerHTML = "";
        let canvas: HTMLCanvasElement;

        Elm.From(this).Swallow(() => [
            new Elm("omni-menustrip").Swallow(()=> [
                new Elm("omni-menudropdown").Do((e:StripMenuDropDown)=> {
                    e.Items = testValues.map(n=> <DropDownItemLike>{getValue:()=> n.Value, getText:()=> n.Name});
                }).Evt("SelectItem", (e:SelectEvent)=> {
                    const item = e.ValueSelected as BurklaxLike;
                })
            ])      
        ]);
    }
}

