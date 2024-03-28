export class ViewBase extends HTMLElement {
    // static observedAttributes = ["color", "size"];
    constructor() {
        super();
    }
    set Title(value) {
        if (!value) {
            this.removeAttribute("title");
            return;
        }
        this.setAttribute("title", value);
        document.head.title = value;
    }
    get Title() {
        return this.getAttribute("title");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlld0Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVmlld0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFnQixRQUFTLFNBQVEsV0FBVztJQUM5QyxpREFBaUQ7SUFDakQ7UUFDSSxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFXRCxJQUFXLEtBQUssQ0FBQyxLQUFvQjtRQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLE9BQU87UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNKIn0=