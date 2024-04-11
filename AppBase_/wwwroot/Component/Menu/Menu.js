var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomElm, Elm } from "../../Elm.js";
import { Search, Select } from "./Search.js";
export class DropDownItem {
    constructor(name, action, parent, ...children) {
        this.Name = name;
        this.Action = action;
        this.Children = children;
        this.Parent = parent;
    }
    name = "";
    action;
    children = [];
    parent;
    update() {
        if (!this.parent) {
            return;
        }
        if (Object.getPrototypeOf(this.parent).constructor.name === DropDownItem.name) {
            this.parent.update();
        }
        else {
            this.parent.Render();
        }
    }
    set Parent(value) {
        this.parent = value;
        this.update();
    }
    set Name(value) {
        this.name = value;
        this.update();
    }
    set Action(value) {
        this.action = value;
        this.update();
    }
    set Children(value) {
        this.children = value;
        this.update();
    }
    get Parent() {
        return this.parent;
    }
    get Name() {
        return this.name;
    }
    get Action() {
        return this.action;
    }
    get Children() {
        return this.children;
    }
}
export class SelectEvent extends Event {
    constructor(value) {
        super("SelectItem", { cancelable: true });
        this.ValueSelected = value;
    }
    ValueSelected;
}
export class StripMenuItem extends HTMLElement {
}
let MenuStrip = class MenuStrip extends HTMLElement {
    static observedAttributes = [];
    connectedCallback() {
        const css = Search(document.styleSheets, n => n.href?.endsWith("MenuStrip.css"));
        if (!css) {
            Elm.From(document.head).Swallow(() => [
                new Elm("link").Attr("rel", "stylesheet").Attr("href", `${location.origin}/Component/Menu/MenuStrip.css`)
            ]);
        }
        const menudropdowns = Select(this.children, n => n instanceof StripMenuItem);
        Elm.From(this).Swallow(() => [
            new Elm("nav").Class("MenuStrip").EatArray(menudropdowns, (e) => e.Render())
        ]);
    }
    disconnectedCallback() {
    }
    adoptedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
};
MenuStrip = __decorate([
    CustomElm("omni-menustrip")
], MenuStrip);
export { MenuStrip };
let StripMenuDropDown = class StripMenuDropDown extends StripMenuItem {
    static observedAttributes = [];
    root;
    set Root(value) {
        this.root = value;
    }
    get Root() {
        return this.root;
    }
    renderDropDownItem(root) {
        return new Elm("li").Evt("click", root.Action).Swallow(() => root.Children.length > 0 ? [
            new Elm("span").Text(root.Name).Class("subMenu"),
            new Elm("ul").EatArray(root.Children, n => this.renderDropDownItem(n))
        ] :
            [new Elm("span").Text(root.Name)]);
    }
    Render() {
        if (!this.Root) {
            return;
        }
        return new Elm("ul").Class("Dropdown").Swallow(() => [
            this.renderDropDownItem(this.root)
        ]);
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    adoptedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
};
StripMenuDropDown = __decorate([
    CustomElm("omni-menudropdown")
], StripMenuDropDown);
export { StripMenuDropDown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21wb25lbnQvTWVudS9NZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBTyxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTdDLE1BQU0sT0FBTyxZQUFZO0lBQ3JCLFlBQW1CLElBQVcsRUFBRSxNQUFpQixFQUFFLE1BQXlDLEVBQUUsR0FBRyxRQUE2QjtRQUMxSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU8sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNWLE1BQU0sQ0FBWTtJQUNsQixRQUFRLEdBQXdCLEVBQUUsQ0FBQztJQUNuQyxNQUFNLENBQW1DO0lBRXpDLE1BQU07UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDO1lBQ2QsT0FBTztRQUNYLENBQUM7UUFFRyxJQUFLLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLElBQUksRUFBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxNQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDekMsQ0FBQzthQUFLLENBQUM7WUFDaUIsSUFBSSxDQUFDLE1BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0lBQ1QsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQXFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FB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