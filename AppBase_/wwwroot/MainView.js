import { ViewBase } from "./ViewBase.js";
export class MainView extends ViewBase {
    async GetChaptersAsync(path) {
        path = "/home/zerq/Downloads/the-ideal-sponger-life-volume-4.epub";
        const request = await fetch(location.origin + "/Book/ListChapters?Path=" + path);
        const text = await request.text();
        const json = JSON.parse(text);
        return json;
    }
    ContentUrl(path, innerPath) {
        return `${location.origin}/Book/GetContent?Path=${path}&innerPath=${innerPath}`;
    }
    connectedCallback() {
        this.Render();
        const x = async () => {
            const path = "/home/zerq/Downloads/the-ideal-sponger-life-volume-4.epub";
            const chapters = await this.GetChaptersAsync(path);
            const chapter0 = await chapters[1];
            const iframe = document.createElement("iframe");
            iframe.id = "Derp";
            iframe.src = this.ContentUrl(path, chapter0.FileName);
            iframe.onload = async (e) => {
                iframe.style.display = "none";
                const textOut = document.createElement("div");
                document.body.appendChild(textOut);
                let index = 0;
                let audioWrapper = document.createElement("AudioWrapper");
                document.body.appendChild(audioWrapper);
                const playPart = async () => {
                    textOut.innerHTML = "";
                    audioWrapper.innerHTML = "";
                    const before = document.createElement("span");
                    before.id = "before";
                    const selected = document.createElement("span");
                    selected.style.backgroundColor = "yellow";
                    selected.style.fontWeight = "bold";
                    selected.id = "selected";
                    const after = document.createElement("span");
                    after.id = "after";
                    textOut.appendChild(before);
                    textOut.appendChild(selected);
                    textOut.appendChild(after);
                    const text = document.getElementById("Derp").contentDocument.body.innerText;
                    const prelSize = text.length < 500 ? text.length : 500;
                    const last = text.substring(prelSize).indexOf(" ");
                    before.innerText = text.substring(0, index);
                    if (last === -1) {
                        selected.innerText = text.substring(index, index + prelSize);
                        after.innerText = text.substring(index + prelSize);
                        index += prelSize;
                    }
                    else {
                        selected.innerText = text.substring(index, index + prelSize + last);
                        after.innerText = text.substring(index + prelSize + last);
                        index += prelSize + last;
                    }
                    textOut.appendChild(before);
                    textOut.appendChild(selected);
                    textOut.appendChild(after);
                    const url = `http://0.0.0.0:59125/api/tts?text=${encodeURIComponent(selected.innerText)}`;
                    const request = await fetch(url);
                    const blob = await request.blob();
                    const audio = document.createElement("audio");
                    audio.style.position = "fixed";
                    audio.style.bottom = "0";
                    audio.style.width = "100%";
                    audio.setAttribute("controls", "");
                    audio.setAttribute("autoplay", "");
                    audio.setAttribute("src", URL.createObjectURL(blob));
                    audio.addEventListener("ended", (e) => {
                        playPart();
                    });
                    audioWrapper.appendChild(audio);
                };
                playPart();
            };
            document.body.appendChild(iframe);
            // const text = iframe.innerText;
            // const url = `http://0.0.0.0:59125/api/tts?text=${encodeURIComponent(text)}&voice=en_US%2Fvctk_low%23p239&noiseScale=0.333&noiseW=0.333&lengthScale=1.2&ssml=false&audioTarget=client;`;
            // Elm.From(document.body).Swallow(() => [
            //     new Elm("audio").Attr("autoplay", "").Attr("Controls", "").Attr("src", url),
            //     Elm.From(iframe)
            // ]);
            return;
        };
        x();
    }
    disconnectedCallback() {
    }
    adoptedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    Render() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpblZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTWFpblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQTBCekMsTUFBTSxPQUFPLFFBQVMsU0FBUSxRQUFRO0lBRTFCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFZO1FBQ3ZDLElBQUksR0FBRywyREFBMkQsQ0FBQztRQUNuRSxNQUFNLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLDBCQUEwQixHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2pGLE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUE4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFHTyxVQUFVLENBQUMsSUFBWSxFQUFFLFNBQWlCO1FBQzlDLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSx5QkFBeUIsSUFBSSxjQUFjLFNBQVMsRUFBRSxDQUFDO0lBQ3BGLENBQUM7SUFHTSxpQkFBaUI7UUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWQsTUFBTSxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDakIsTUFBTSxJQUFJLEdBQUcsMkRBQTJELENBQUM7WUFDekUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFHbkMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztZQUNuQixNQUFNLENBQUMs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