import { prototype } from "events";
import { Ctr, CustomElm, Elm } from "../../Elm.js";
import { Search, Select } from "./Search.js";

export interface DropDownItemLike {
    getValue(): unknown;
    getText(): string;
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
            new Elm("nav").EatArray(menudropdowns, (e: StripMenuDropDown) => 
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

    private items: Array<DropDownItemLike> = [];

    public set Items(value: Array<DropDownItemLike>) {
        this.items = value;
    }

    public get Items(): Array<DropDownItemLike> {
        return this.items;
    }

    public Render(): Elm {
        return new Elm("ul").EatArray(this.Items, n =>
            new Elm("li").Text(n.getText()).Evt("click", e => {
                this.dispatchEvent(new SelectEvent(n.getValue()));
            })
        );
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

