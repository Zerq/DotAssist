import { json } from "stream/consumers";
import { App } from "./AppPipe.js";

import { StripMenuDropDown, SelectEvent, MenuStrip, DropDownItem } from "./Component/Menu/Menu.js";
import { Elm } from "./Elm.js";
import { ViewBase } from "./ViewBase.js";

interface ChapterLike {
    FileName: string;
    Anchor: string;
    Title: string;
}

interface SubChapterAbleLike extends ChapterLike {
    SubChapters: Array<ChapterLike>
}

interface DocumentLike {
    FileName: string;
    MimeType: string;
    TextContent: string;
    ContentType: string;
}

interface BookLike {
    ContentTable: Array<SubChapterAbleLike>;
    Contents: Array<DocumentLike>;
    Styles: Array<DocumentLike>;
}


export class MainView extends ViewBase {

    private async GetChaptersAsync(path: string): Promise<Array<SubChapterAbleLike>> {
        path = "/home/zerq/Downloads/the-ideal-sponger-life-volume-4.epub";
        const request = await fetch(location.origin + "/Book/ListChapters?Path=" + path);
        const text = await request.text();
        const json = <Array<SubChapterAbleLike>>JSON.parse(text);
        return json;
    }


    private ContentUrl(path: string, innerPath: string) {
        return `${location.origin}/Book/GetContent?Path=${path}&innerPath=${innerPath}`;
    }


    public connectedCallback() {
        this.Render();

        const x = async () => {
            const path = "/home/zerq/Downloads/the-ideal-sponger-life-volume-4.epub";
            const chapters = await this.GetChaptersAsync(path);
            const chapter0 = await chapters[1];


            const iframe = document.createElement("iframe");
            iframe.id = "Derp";
            iframe.src = this.ContentUrl(path, chapter0.FileName);
            iframe.onload = async e => {
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

                    const text = (<HTMLIFrameElement>document.getElementById("Derp")).contentDocument.body.innerText;

                    const prelSize = text.length < 500 ? text.length : 500;
                    const last = text.substring(prelSize).indexOf(" ");
                    before.innerText = text.substring(0, index);

                    if (last === -1) {
                        selected.innerText = text.substring(index, index + prelSize);
                        after.innerText = text.substring(index + prelSize);
                        index += prelSize;
                    } else {
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
                audio.style.width = "100%"
                audio.setAttribute("controls","");
                audio.setAttribute("autoplay","");
                audio.setAttribute("src",  URL.createObjectURL(blob));
                audio.addEventListener("ended", (e:OfflineAudioCompletionEvent)=> {
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

    public disconnectedCallback() {
    }

    public adoptedCallback() {
    }

    public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    }

    public Render(): void {


    }
}

