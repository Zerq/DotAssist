//this is neat! give way better overview then the
//regular DOM api and a feel of the hirarchy...
//trying to use react templates via bable did not
//work out reliably enought and they generate the
//uggliest script you have ever seen! and hard to debug too!
//it was frankly the most disgusting unsightly thing i have ever seen...
//if i have to go with that insanity i wanna go all in on something like preact...
//but frankly i am not entierly convinced it entierly needed...
export class Elm {
    constructor(tagName) {
        if (tagName != null) {
            this.elm = document.createElement(tagName);
        }
    }
    static From(elm) {
        const result = new Elm(null);
        result.elm = elm;
        return result;
    }
    Evt(type, listener, options) {
        this.elm.addEventListener(type, listener);
        return this;
    }
    done() {
        return this.elm;
    }
    Attr(name, value) {
        this.elm.setAttribute(name, value);
        return this;
    }
    Class(...classes) {
        classes.forEach(n => this.elm.classList.add(...classes));
        return this;
    }
    Style(styling) {
        styling(this.elm.style);
        return this;
    }
    Text(value) {
        this.elm.innerText = value;
        return this;
    }
    Swallow(stuff) {
        stuff().forEach(n => this.elm.appendChild(n.done()));
        return this;
    }
    EatArray(ary, transformation) {
        ary.forEach(n => this.elm.appendChild(transformation(n).done()));
        return this;
    }
}
//# sourceMappingURL=Elm.js.map