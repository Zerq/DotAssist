
export interface Ctr<T> {
    new(): T;
}
//this is neat! give way better overview then the
//regular DOM api and a feel of the hirarchy...
//trying to use react templates via bable did not
//work out reliably enought and they generate the
//uggliest script you have ever seen! and hard to debug too!
//it was frankly the most disgusting unsightly thing i have ever seen...
//if i have to go with that insanity i wanna go all in on something like preact...
//but frankly i am not entierly convinced it entierly needed...
export class Elm {
    private elm: HTMLElement;

    public constructor(tagName: string) {
        if (tagName != null) {
            this.elm = document.createElement(tagName);
        }
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
