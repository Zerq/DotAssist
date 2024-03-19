﻿
export interface Ctr<T> {
    new(): T;
}  

export abstract class SubRender {
    public constructor(public Id: string) { }
    public abstract Render(): Elm;
    public Refresh(): void {
        const element = document.getElementById(this.Id);
        element.innerHTML = "";
        element.appendChild(this.Render().done());
    }
}

export class Elm {
    private elm: HTMLElement;

    public constructor(tagName: string) {
        if (tagName != null) {
            this.elm = document.createElement(tagName);
        }
    }

    public static SubRender(subrenderer: SubRender) {
        return new Elm("div").Id(subrenderer.Id).Swallow(() => [
            subrenderer.Render()
        ]);
    }

    public Html(txt: string) {
        this.elm.innerHTML = txt;
        return this;
    }


    public Id(id: string) {
        this.elm.id = id;
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

    public Evt<K extends keyof HTMLElementEventMap>(type: K | string, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions) {
        this.elm.addEventListener(type, listener);
        return this;
    }

    public done<T extends HTMLElement>(): T {
        return this.elm as T;
    }

    public Attr(name: string, value: string) {
        this.elm.setAttribute(name, value);
        return this;
    }

    public Class(...classes: Array<string>) {
        classes.forEach(n => this.elm.classList.add(...classes));
        return this;
    }

    public Style(styling: (style: CSSStyleDeclaration) => void) {
        styling(this.elm.style);
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
        stuff().forEach(n => this.elm.appendChild(n.done()));
        return this;
    }

    public EatArray<T>(ary: Array<T>, transformation: (n: T) => Elm) {
        ary.forEach(n => this.elm.appendChild(transformation(n).done()));
        return this;
    }


}

