//yes this is a very silly idea... i was coding late at night.... it probably not wise lol
//but fuck you! I want a guid that a guid and never anything other then a guid!
//hopefully that ecmascript proposal for immutables might make this insanity a bit more sensible in future...
//anyway permit me some lunacy! its my own bloody project!
export class Guid extends String {
    static NewGuidString() {
        function s4() {
            return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
        }
        return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
    }
    constructor(val) {
        super();
        this.val = val;
    }
    static IsValid(value) {
        value = value.replaceAll("-", ""); // Format it first!
        return value.length === 32 && [...value].every(Guid.isHEX);
    }
    static NewGuid(value) {
        if (!value) {
            let newGuidString = this.NewGuidString();
            while (this.AllGuids.has(newGuidString)) { //might as well ensure guid collisions are impossible :p
                newGuidString = this.NewGuidString();
            }
            const newGuid = new Guid(newGuidString);
            Guid.AllGuids.set(newGuid.val, newGuid);
            return newGuid;
        }
        if (value && this.IsValid(value) && !Guid.AllGuids.has(value)) {
            const newGuid = new Guid(value);
            Guid.AllGuids.set(newGuid.val, newGuid);
            return newGuid;
        }
        if (value && this.IsValid(value) && Guid.AllGuids.has(value)) {
            return Guid.AllGuids.get(value);
        }
        throw new Error(value + " is not a valid Guid");
    }
    toString() {
        return this.val;
    }
}
Guid.AllGuids = new Map();
Guid.isHEX = (ch) => "0123456789abcdef".includes(ch.toLowerCase());
//# sourceMappingURL=Guid.js.map