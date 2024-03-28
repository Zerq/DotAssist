var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomElm, Elm } from "../../Elm.js";
import { Search, Select } from "./Search.js";
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
            new Elm("nav").EatArray(menudropdowns, (e) => e.Render())
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
    items = [];
    set Items(value) {
        this.items = value;
    }
    get Items() {
        return this.items;
    }
    Render() {
        return new Elm("ul").EatArray(this.Items, n => new Elm("li").Text(n.getText()).Evt("click", e => {
            this.dispatchEvent(new SelectEvent(n.getValue()));
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21wb25lbnQvTWVudS9NZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBTyxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTzdDLE1BQU0sT0FBTyxXQUFZLFNBQVEsS0FBSztJQUNsQyxZQUFtQixLQUFjO1FBQzdCLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUUvQixDQUFDO0lBQ0QsYUFBYSxDQUFVO0NBQzFCO0FBRUQsTUFBTSxPQUFnQixhQUFjLFNBQVEsV0FBVztDQU10RDtBQUdNLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBVSxTQUFRLFdBQVc7SUFDdEMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUV4QixpQkFBaUI7UUFDcEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNQLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sK0JBQStCLENBQUM7YUFDNUcsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVBLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQSxFQUFFLENBQUMsQ0FBQyxZQUFZLGFBQWEsQ0FBQyxDQUFDO1FBRTdFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFvQixFQUFFLEVBQUUsQ0FDNUQsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUNiO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLG9CQUFvQjtJQUUzQixDQUFDO0lBRU0sZUFBZTtJQUV0QixDQUFDO0lBRU0sd0JBQXdCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRO0lBRXhELENBQUM7O0FBOUJRLFNBQVM7SUFEckIsU0FBUyxDQUFDLGdCQUFnQixDQUFDO0dBQ2YsU0FBUyxDQStCckI7O0FBR00sSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBa0IsU0FBUSxhQUFhO0lBQ2hELE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7SUFFdkIsS0FBSyxHQUE0QixFQUFFLENBQUM7SUFFNUMsSUFBVyxLQUFLLENBQUMsS0FBOEI7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRU0sTUFBTTtRQUNULE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FDMUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBR00saUJBQWlCO0lBQ3hCLENBQUM7SUFFTSxvQkFBb0I7SUFFM0IsQ0FBQztJQUVNLGVBQWU7SUFFdEIsQ0FBQztJQUVNLHdCQUF3QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUTtJQUV4RCxDQUFDOztBQW5DUSxpQkFBaUI7SUFEN0IsU0FBUyxDQUFDLG1CQUFtQixDQUFDO0dBQ2xCLGlCQUFpQixDQW9DN0IifQ==