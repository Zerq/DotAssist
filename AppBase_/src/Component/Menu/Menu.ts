import { prototype } from "events";
import { Ctr, CustomElm, Elm } from "../../Elm.js";
import { Search, Select } from "./Search.js";

export class DropDownItem {
    public constructor(name:string, action: ()=> void, parent?: DropDownItem | StripMenuDropDown, ...children: Array<DropDownItem>){
        this.Name = name;
        this.Action = action;
        this.Children = children;
        this.Parent = parent;
    }

    private name = "";
    private action: ()=> void;
    private children: Array<DropDownItem> = [];
    private parent: StripMenuDropDown | DropDownItem;

    private update() {
        if (!this.parent){
            return;
        }

            if ( Object.getPrototypeOf(this.parent).constructor.name === DropDownItem.name){
                (<DropDownItem>this.parent).update();
            }else {
                (<StripMenuDropDown>this.parent).Render();
            }   
    }

    public set Parent(value: StripMenuDropDown|DropDownItem){
        this.parent = value;
        this.update();
    }

    public set Name(value: string){
        this.name = value;
        this.update();
    }

    public set Action(value: ()=> void){
        this.action = value;
        this.update();
    }

    public set Children(value: Array<DropDownItem>){
        this.children = value;
        this.update();
    }

    public get Parent(){
       return this.parent;
    }

    public get Name() {
       return this.name;
    }

    public get Action() {
       return this.action;
    }


    public get Children(){
      return  this.children;
    }
}

export class SelectEvent extends Event {
    public constructor(value: unknown) {
        super("SelectItem", { cancelable: true });
        this.ValueSelected = value;

    }
    ValueSelected: unknown;
}

export abstract class StripMenuItem extends HTMLElement {
    public abstract connectedCallback(): void;
    public abstract disconnectedCallback(): void;
    public abstract adoptedCallback(): void;
    public abstract attributeChangedCallback(name, oldValue, newValue): void;
    public abstract Render(): Elm;
}

@CustomElm("omni-menustrip")
export class MenuStrip extends HTMLElement {
    static observedAttributes = [];
 
    public connectedCallback() {
        const css = Search(document.styleSheets, n => n.href?.endsWith("MenuStrip.css"));
        if (!css) {
            Elm.From(document.head).Swallow(() => [
                new Elm("link").Attr("rel", "stylesheet").Attr("href", `${location.origin}/Component/Menu/MenuStrip.css`)
            ]);
        }

         const menudropdowns = Select(this.children, n=> n instanceof StripMenuItem);

        Elm.From(this).Swallow(() => [
            new Elm("nav").Class("MenuStrip").EatArray(menudropdowns, (e: StripMenuDropDown) => 
                e.Render()   
            )
        ]);
    }

    public disconnectedCallback() {

    }

    public adoptedCallback() {

    }

    public attributeChangedCallback(name, oldValue, newValue) {

    }
}

@CustomElm("omni-menudropdown")
export class StripMenuDropDown extends StripMenuItem {
    static observedAttributes = [];

    private root: DropDownItem;

    public set Root(value: DropDownItem) {
        this.root = value;
    }

    public get Root(): DropDownItem{
        return this.root;
    }

    private renderDropDownItem(root: DropDownItem): Elm{
        return  new Elm("li").Evt("click", root.Action).Swallow(()=> 
           root.Children.length > 0 ?  [
            new Elm("span").Text(root.Name).Class("subMenu"),
            new Elm("ul").EatArray(root.Children, n=> this.renderDropDownItem(n))] :
            [ new Elm("span").Text(root.Name) ]        
        );
    }

    public Render(): Elm {  
        if (!this.Root){ return; }
        return new Elm("ul").Class("Dropdown").Swallow(()=> [
            this.renderDropDownItem(this.root)          
        ]);
    }

    public connectedCallback() {
    }

    public disconnectedCallback() {

    }

    public adoptedCallback() {

    }

    public attributeChangedCallback(name, oldValue, newValue) {

    }
}

