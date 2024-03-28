var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Elm, CustomElm } from "./Elm.js";
let Panel = class Panel extends HTMLElement {
    static observedAttributes = ["title"];
    connectedCallback() {
        this.Render();
    }
    disconnectedCallback() {
    }
    adoptedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.Render();
    }
    search(collection, find) {
        for (let i = 0; i < collection.length; i++) {
            const x = find(collection[i]);
            if (x) {
                return collection[i];
            }
        }
    }
    getCSS(sheetName, ruleName) {
        const styleSheets = this.search(document.styleSheets, n => n.href && n.href.endsWith(sheetName));
        const rule = this.search(styleSheets.cssRules, n => n.selectorText.toLowerCase() == ruleName.toLowerCase());
        const start = rule.cssText.indexOf("{");
        const end = rule.cssText.lastIndexOf("}");
        return rule.cssText.substring(start + 1, end);
    }
    Render() {
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
};
Panel = __decorate([
    CustomElm("omni-panel")
], Panel);
export { Panel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFJbkMsSUFBTSxLQUFLLEdBQVgsTUFBTSxLQUFNLFNBQVEsV0FBVztJQUNsQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxpQkFBaUI7UUFDYixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELG9CQUFvQjtJQUNwQixDQUFDO0lBRUQsZUFBZTtJQUNmLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxJQUFZLEVBQUUsUUFBYSxFQUFFLFFBQWE7UUFDL0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxNQUFNLENBQUksVUFBa0QsRUFBRSxJQUF1QjtRQUN6RixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNKLE9BQVUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU0sQ0FBQyxTQUFpQixFQUFFLFFBQWdCO1FBQzlDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQWdCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDaEgsTUFBTSxJQUFJLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQU0sV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFJTSxNQUFNO1FBR1QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUM3QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMxRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUM7aUJBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUM7aUJBQ2xCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDWCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUMzRCxDQUFDO2lCQUNELElBQUksRUFBRSxDQUFDLENBQUM7UUFDakIsQ0FBQztRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDO2FBQzVCLEtBQUssQ0FBQyxjQUFjLENBQUM7YUFDckIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7QUEzRFEsS0FBSztJQURqQixTQUFTLENBQUMsWUFBWSxDQUFDO0dBQ1gsS0FBSyxDQTZEakIifQ==