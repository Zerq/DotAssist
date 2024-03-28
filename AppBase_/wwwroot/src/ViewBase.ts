

export abstract class ViewBase extends HTMLElement {
    // static observedAttributes = ["color", "size"];
    constructor() {
        super();
    }


    abstract connectedCallback();

    abstract disconnectedCallback();

    abstract adoptedCallback();

    abstract attributeChangedCallback(name, oldValue, newValue);

    public set Title(value: string | null) {
        if (!value) {
            this.removeAttribute("title");
            return;
        }
        this.setAttribute("title", value);
        document.head.title = value;
    }
    public get Title(): string | null {
        return this.getAttribute("title");
    }
}
