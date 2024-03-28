import { Elm, CustomElm } from "./Elm.js";


@CustomElm("omni-panel")
export class Panel extends HTMLElement {
    static observedAttributes = ["title"];
    connectedCallback() {
        this.Render();
    }

    disconnectedCallback() {
    }

    adoptedCallback() {
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        this.Render();
    }

    private search<T>(collection: { length: number;[index: number]: T; }, find: (n: T) => boolean) {
        for (let i = 0; i < collection.length; i++) {
            const x = find(collection[i]);
            if (x) {
                return <T>collection[i];
            }
        }
    }

    private getCSS(sheetName: string, ruleName: string): string {
        const styleSheets = this.search<CSSStyleSheet>(document.styleSheets, n => n.href && n.href.endsWith(sheetName));
        const rule = <CSSStyleRule>this.search<any>(styleSheets.cssRules, n => n.selectorText.toLowerCase() == ruleName.toLowerCase());
        const start = rule.cssText.indexOf("{");
        const end = rule.cssText.lastIndexOf("}");
        return rule.cssText.substring(start + 1, end);
    }



    public Render() {


        const shadow = this.shadowRoot ?? this.attachShadow({ mode: "open" });
        shadow.innerHTML = "";

        if (this.hasAttribute("resizable")) {
            this.style.resize = "";
        }

        if (this.getAttribute("title")) {
            let panelHeader = this.getCSS("style.css", "panelHeader");
            let panelHeaderInner = this.getCSS("style.css", "panelHeaderInner");
            shadow.appendChild(new Elm("header")
                .Style(panelHeader)
                .Swallow(() => [
                    new Elm("span").Text(this.title).Style(panelHeaderInner)
                ])
                .Done());
        }

        shadow.appendChild(new Elm("div")
            .Style("padding:7px;")
            .Swallow(() => [new Elm("slot")]).Done());
    }

}


export type PanelParams = { title?: string; };
