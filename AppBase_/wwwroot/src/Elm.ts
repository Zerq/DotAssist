import { Guid } from "./Guid.js";

export type AbsCtr<T> = Function & { prototype: T };

export interface Ctr<T> {
    new(): T;
}  

export abstract class SubRender {
    public constructor(public Id: string) { }
    public abstract Render(): Elm;
    public Refresh(): void {
        const element = document.getElementById(this.Id);
        element.innerHTML = "";
        element.appendChild(this.Render().Done());
    }
}

export function CustomElm<T extends HTMLElement>(name: string) {
    return (ctor: Ctr<T>) => {
        customElements.define(name, ctor);
    }
}
 
export class RefreshToken {
    public Id = Guid.NewGuid();
    public Refresh: () => void;
    public cache: Elm;
    public constructor(public tempalte: () => Elm) {
    }
}
 
export class Elm {
    private elm: HTMLElement;

    public constructor(tagName: string) {
        if (tagName != null) {
            this.elm = document.createElement(tagName);
        }
    }

    public Do<H extends HTMLElement>(act:(n: H)=> void){
      act(<H>this.elm);
      return this;
    }

    public Html(txt: string) {
        this.elm.innerHTML = txt;
        return this;
    }

    public Id<T extends HTMLElement>(id: string, out:T = null) {
        this.elm.id = id;
        out = <T>this.elm;
        return this;
    }

    public Focus(focused: boolean) {
        if (focus) {
            this.elm.focus();
        }
         
        return this;
    }

    public static From(elm: HTMLElement) {
        const result = new Elm(null);
        result.elm = elm;
        return result;
    }

    public static Refreshable(token: RefreshToken) {
        token.Refresh = () => {
            const div = document.getElementById(token.Id.toString());
            div.innerHTML = "";
            div.appendChild(token.tempalte().Done());
        };

        return new Elm("div").Id(token.Id.toString()).Swallow(() => [
            token.tempalte()
        ]);
    }

    public Evt<K extends keyof HTMLElementEventMap>(type: K | string, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions) {
        this.elm.addEventListener(type, listener);
        return this;
    }

    public Done<T extends HTMLElement>(): T {
        return this.elm as T;
    }

    public Attr(name: string, value: string) {
        this.elm.setAttribute(name, value);
        return this;
    }

    public ClassIf(clss: string, condition: boolean) {
        if (condition) {
            this.elm.classList.add(clss);
        } else {
            this.elm.classList.remove(clss);
        }
        return this;
    }

    public Class(...classes: Array<string>) {
        this.elm.classList.add(...classes);
        return this;
    }

    public Style(rules: string ) {    
        this.Attr("style", rules);
        return this;
    }

    public Value(value: string) {
        this.Attr("value",value);
        return this;
    }

    public Flag(name: string, value: boolean) {
        if (value) {
            this.elm.setAttribute(name, "");
        } else {
            if (this.elm.hasAttribute(name)) {
                this.elm.removeAttribute(name);
            }
        }
        return this;
    }

    public Text(value: string) {
        this.elm.innerText = value;
        return this;
    }

    public Swallow(stuff: () => Array<Elm>) {
        stuff().forEach(n => this.elm.appendChild(n.Done()));
        return this;
    }

    public EatArray<T>(ary: Array<T>, transformation: (n: T) => Elm) {
        ary.forEach(n => this.elm.appendChild(transformation(n).Done()));
        return this;
    }

    public EatAndGroup<T>(ary: Array<T>, variable: (n: T) => string, groupBy: (n: T) => string, transform: (variablePart: Array<string>, constantPart: T) => Elm) {
        const groups = new Map<string, Array<T>>();
        ary.forEach(n => {
            const item = groupBy(n);
            if (!groups.has(item)) {
                groups.set(item, [n]);
            } else {
                groups.get(item).push(n);
            }
        });

        const result = Array<Elm>();
        groups.forEach((value, key) => {
            const variablePart = value.map(n => variable(n));
            result.push(transform(variablePart, value[0]));
        });


        this.Swallow(() => result);

        return this;
    }

    public Resizable(resize: "none"| "both"| "horizontal"| "vertical") {
        this.elm.style.resize = resize;
        return this;
    }


}

