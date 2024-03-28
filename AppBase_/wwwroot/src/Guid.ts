export class Guid extends String {
    private static AllGuids: Map<string, Guid> = new Map();
    public static NewGuidString(): string {
        function s4() {

            return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
        }
        return (
            s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
        );
    }
    private constructor(private val: string) {
        super();
    }

    private static isHEX = (ch: string) => "0123456789abcdef".includes(ch.toLowerCase());
    public static IsValid(value: string): boolean {
        value = value.replaceAll("-", ""); // Format it first!
        return value.length === 32 && [...value].every(Guid.isHEX);
    }

    public static NewGuid(value?: string) {
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

    override toString() {
        return this.val;
    }
}
