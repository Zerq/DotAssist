/*

class model {
    firstName: string;
    lastName: string;
    age: number;
    mobileNr: string;
   
}

Elm("div").Bind(b=>
[b => b.firstName, b => b.lastName, b => b.age]
x=>  `${x[0]} ${x[1]} is  ${x[2]} years old.`)

    Elm("div").Bind(b=>[b.age]);

*/
// <input model="n=> n.myModel" bind="n=> name" />

export class BindableElement<T> extends HTMLElement {

    private input: HTMLInputElement;

    public static observedAttributes = new Array<string>("model", "bind");
    public adoptedCallback() { }
    public disconnectedCallback() { }
    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    }
    public connectedCallback() {
        this.FirstRender();
    }
    public FirstRender() {
    }
}
