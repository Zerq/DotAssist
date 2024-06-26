/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/home/Home.css":
/*!***************************!*\
  !*** ./src/home/Home.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://asp.net/./src/home/Home.css?");

/***/ }),

/***/ "./src/Commands/DomainCommand.ts":
/*!***************************************!*\
  !*** ./src/Commands/DomainCommand.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AbortProjectCreation: () => (/* binding */ AbortProjectCreation),\n/* harmony export */   CompleteProjectCreation: () => (/* binding */ CompleteProjectCreation),\n/* harmony export */   DomainCommand: () => (/* binding */ DomainCommand),\n/* harmony export */   SelectBaseFolder: () => (/* binding */ SelectBaseFolder),\n/* harmony export */   SelectDotNetTemplate: () => (/* binding */ SelectDotNetTemplate),\n/* harmony export */   SelectExtraStubbs: () => (/* binding */ SelectExtraStubbs),\n/* harmony export */   SelectScriptingTemplate: () => (/* binding */ SelectScriptingTemplate)\n/* harmony export */ });\n/* harmony import */ var _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Events/DomainEvent */ \"./src/Events/DomainEvent.ts\");\n/* harmony import */ var _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Home/Models/Guid */ \"./src/Home/Models/Guid.ts\");\n\n\nclass DomainCommand {\n}\nclass CompleteProjectCreation extends DomainCommand {\n    Execute() {\n        return [new _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_0__.ProjectCreationCompleted()];\n    }\n}\nclass AbortProjectCreation extends DomainCommand {\n    Execute() {\n        throw new Error(\"Method not implemented.\");\n    }\n}\nclass SelectBaseFolder extends DomainCommand {\n    Execute() {\n        const selected = new _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_0__.BaseFolderSelected();\n        selected.BaseFolder = this.BaseFolder;\n        selected.Created = new Date();\n        selected.Id = _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid.NewGuid();\n        //selected.SequenceNumber  = ??\n        return [selected];\n    }\n}\nclass SelectDotNetTemplate extends DomainCommand {\n    Execute() {\n        const selected = new _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_0__.DotNetTemplateSelected();\n        selected.ProjectName = this.ProjectName,\n            selected.TemplateName = this.TemplateName;\n        selected.BaseDirectory = this.BaseDirectory;\n        selected.TemplatLanguage = this.TemplatLanguage;\n        selected.Created = new Date();\n        selected.Id = _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid.NewGuid();\n        //selected.SequenceNumber  = ??\n        return [selected];\n    }\n}\nclass SelectScriptingTemplate extends DomainCommand {\n    Execute() {\n        switch (this.TemplateName) {\n            case \"ECMAScript\":\n                const ecma = new _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_0__.ECMAScriptSelected();\n                ecma.Id = _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid.NewGuid();\n                ecma.Created = new Date();\n                // ecma.SequenceNumber \n                return [ecma];\n            case \"Webpack\":\n                const webpack = new _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_0__.WebpackSelected();\n                webpack.Id = _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid.NewGuid();\n                webpack.Created = new Date();\n                // webpack.SequenceNumber\n                return [webpack];\n            case \"Preact\":\n                const preact = new _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_0__.PreactSelected();\n                preact.Id = _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid.NewGuid();\n                preact.Created = new Date();\n                // preact.SequenceNumber\n                return [preact];\n            case \"Angular\":\n                const angular = new _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_0__.AngularSelected();\n                angular.Id = _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid.NewGuid();\n                angular.Created = new Date();\n                // angular.SequenceNumber\n                return [angular];\n        }\n    }\n}\nclass SelectExtraStubbs extends DomainCommand {\n    constructor() {\n        super(...arguments);\n        this.Stubbs = [];\n    }\n    Execute() {\n        throw new Error(\"Method not implemented.\");\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/Commands/DomainCommand.ts?");

/***/ }),

/***/ "./src/Events/DomainEvent.ts":
/*!***********************************!*\
  !*** ./src/Events/DomainEvent.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AngularSelected: () => (/* binding */ AngularSelected),\n/* harmony export */   BaseFolderSelected: () => (/* binding */ BaseFolderSelected),\n/* harmony export */   DomainEvent: () => (/* binding */ DomainEvent),\n/* harmony export */   DotNetTemplateSelected: () => (/* binding */ DotNetTemplateSelected),\n/* harmony export */   ECMAScriptSelected: () => (/* binding */ ECMAScriptSelected),\n/* harmony export */   PreactSelected: () => (/* binding */ PreactSelected),\n/* harmony export */   ProjectCreationCompleted: () => (/* binding */ ProjectCreationCompleted),\n/* harmony export */   ProjectSetupAborted: () => (/* binding */ ProjectSetupAborted),\n/* harmony export */   WebpackSelected: () => (/* binding */ WebpackSelected)\n/* harmony export */ });\nclass DomainEvent {\n}\nclass BaseFolderSelected extends DomainEvent {\n    constructor() {\n        super();\n        this.EventName = BaseFolderSelected.name;\n    }\n}\nclass DotNetTemplateSelected extends DomainEvent {\n    constructor() {\n        super();\n        this.EventName = DotNetTemplateSelected.name;\n    }\n}\nclass PreactSelected extends DomainEvent {\n    constructor() {\n        super();\n        this.EventName = PreactSelected.name;\n    }\n}\nclass AngularSelected extends DomainEvent {\n    constructor() {\n        super();\n        this.EventName = AngularSelected.name;\n    }\n}\nclass ECMAScriptSelected extends DomainEvent {\n    constructor() {\n        super(...arguments);\n        this.EventName = ECMAScriptSelected.name;\n    }\n}\nclass WebpackSelected extends DomainEvent {\n    constructor() {\n        super();\n        this.EventName = WebpackSelected.name;\n    }\n}\nclass ProjectSetupAborted extends DomainEvent {\n    constructor() {\n        super();\n        this.EventName = ProjectSetupAborted.name;\n    }\n}\nclass ProjectCreationCompleted extends DomainEvent {\n    constructor() {\n        super();\n        this.EventName = ProjectCreationCompleted.name;\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/Events/DomainEvent.ts?");

/***/ }),

/***/ "./src/Home/Models/Guid.ts":
/*!*********************************!*\
  !*** ./src/Home/Models/Guid.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Guid: () => (/* binding */ Guid)\n/* harmony export */ });\n//yes this is a very silly idea... i was coding late at night.... it probably not wise lol\n//but fuck you! I want a guid that a guid and never anything other then a guid!\n//hopefully that ecmascript proposal for immutables might make this insanity a bit more sensible in future...\n//anyway permit me some lunacy! its my own bloody project!\nclass Guid extends String {\n    static NewGuidString() {\n        function s4() {\n            return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);\n        }\n        return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());\n    }\n    constructor(val) {\n        super();\n        this.val = val;\n    }\n    static IsValid(value) {\n        value = value.replaceAll(\"-\", \"\"); // Format it first!\n        return value.length === 32 && [...value].every(Guid.isHEX);\n    }\n    static NewGuid(value) {\n        if (!value) {\n            let newGuidString = this.NewGuidString();\n            while (this.AllGuids.has(newGuidString)) { //might as well ensure guid collisions are impossible :p\n                newGuidString = this.NewGuidString();\n            }\n            const newGuid = new Guid(newGuidString);\n            Guid.AllGuids.set(newGuid.val, newGuid);\n            return newGuid;\n        }\n        if (value && this.IsValid(value) && !Guid.AllGuids.has(value)) {\n            const newGuid = new Guid(value);\n            Guid.AllGuids.set(newGuid.val, newGuid);\n            return newGuid;\n        }\n        if (value && this.IsValid(value) && Guid.AllGuids.has(value)) {\n            return Guid.AllGuids.get(value);\n        }\n        throw new Error(value + \" is not a valid Guid\");\n    }\n    toString() {\n        return this.val;\n    }\n}\nGuid.AllGuids = new Map();\nGuid.isHEX = (ch) => \"0123456789abcdef\".includes(ch.toLowerCase());\n\n\n//# sourceURL=webpack://asp.net/./src/Home/Models/Guid.ts?");

/***/ }),

/***/ "./src/Utils/AppPipe.ts":
/*!******************************!*\
  !*** ./src/Utils/AppPipe.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App),\n/* harmony export */   test: () => (/* binding */ test)\n/* harmony export */ });\n/* harmony import */ var _Elm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Elm */ \"./src/Utils/Elm.ts\");\n\nfunction test() {\n    const myMarkUp = new _Elm__WEBPACK_IMPORTED_MODULE_0__.Elm(\"div\").Attr(\"data-bork\", \"4\").Swallow(() => [\n        new _Elm__WEBPACK_IMPORTED_MODULE_0__.Elm(\"span\").Text(\"Hello\"),\n        new _Elm__WEBPACK_IMPORTED_MODULE_0__.Elm(\"span\").Text(\"bob\").Style(n => n.display = \"inline-block\")\n    ]).done();\n}\nclass Commands {\n    constructor() {\n        this.SelectedVersion = \"SelectedVersion\";\n        this.AppMenuItemClicked = \"AppMenuItemClicked\";\n    }\n}\nclass App {\n    constructor() {\n        this.stuff = new Map();\n        this.eventSubscribers = new Map();\n    }\n    Set(ctr) {\n        const instance = new ctr();\n        this.stuff.set(ctr.name, instance);\n    }\n    Get(ctr) {\n        return this.stuff.get(ctr.name);\n    }\n    SendDomainEvent(domainEvent) {\n        this.SendEvent(domainEvent.EventName, domainEvent);\n    }\n    HandleDomainEvent(domainEvent, callback) {\n        this.Register(domainEvent.name, callback);\n    }\n    ExecuteCommand(domainCommand) {\n        this.SendEvent(\"ExecuteCommand\", domainCommand);\n    }\n    SendEvent(eventName, event) {\n        let recived = false;\n        if (this.eventSubscribers.has(eventName)) {\n            this.eventSubscribers.get(eventName).forEach(n => {\n                n(event); // broadcast to all\n                recived = true;\n            });\n        }\n        console.log(eventName + event, \"recived =\" + recived);\n    }\n    Register(eventName, callback) {\n        if (this.eventSubscribers.has(eventName) && this.eventSubscribers.get(eventName).indexOf(callback) !== -1) {\n            this.eventSubscribers.get(eventName).push(callback);\n        }\n        else {\n            this.eventSubscribers.set(eventName, [callback]);\n        }\n    }\n    Deregister(eventName, callback) {\n        if (this.eventSubscribers.has(eventName)) {\n            const subscriber = this.eventSubscribers.get(eventName);\n            const index = subscriber.indexOf(callback);\n            subscriber.splice(index, 1);\n        }\n    }\n}\nApp.Pipe = new App();\nApp.Commands = new Commands();\n\n\n//# sourceURL=webpack://asp.net/./src/Utils/AppPipe.ts?");

/***/ }),

/***/ "./src/Utils/Assets.ts":
/*!*****************************!*\
  !*** ./src/Utils/Assets.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Assets: () => (/* binding */ Assets),\n/* harmony export */   FileLookUp: () => (/* binding */ FileLookUp)\n/* harmony export */ });\nclass Assets {\n}\nAssets.Console = __webpack_require__(/*! ../assets/console.png */ \"./src/assets/console.png\");\nAssets.Folder = __webpack_require__(/*! ../assets/folder.png */ \"./src/assets/folder.png\");\nAssets.FolderBack = __webpack_require__(/*! ../assets/folderback.png */ \"./src/assets/folderback.png\");\nAssets.Drive = __webpack_require__(/*! ../assets/drive.png */ \"./src/assets/drive.png\");\nAssets.Globe = __webpack_require__(/*! ../assets/globe.png */ \"./src/assets/globe.png\");\nAssets.Lib = __webpack_require__(/*! ../assets/lib.png */ \"./src/assets/lib.png\");\nAssets.WinForm = __webpack_require__(/*! ../assets/winform.png */ \"./src/assets/winform.png\");\nAssets.AddFile = __webpack_require__(/*! ../assets/plusfile.png */ \"./src/assets/plusfile.png\");\nAssets.AddProject = __webpack_require__(/*! ../assets/plusProj.png */ \"./src/assets/plusProj.png\");\nAssets.File = __webpack_require__(/*! ../assets/basicFile.png */ \"./src/assets/basicFile.png\");\nAssets.CSharpFile = __webpack_require__(/*! ../assets/c#.png */ \"./src/assets/c\\u0000#.png\");\nAssets.HtmlFile = __webpack_require__(/*! ../assets/htmlfile.png */ \"./src/assets/htmlfile.png\");\nAssets.JavaScriptFile = __webpack_require__(/*! ../assets/jsfile.png */ \"./src/assets/jsfile.png\");\nAssets.JsonFile = __webpack_require__(/*! ../assets/jsonfile.png */ \"./src/assets/jsonfile.png\");\nAssets.ProjectFile = __webpack_require__(/*! ../assets/projFile.png */ \"./src/assets/projFile.png\");\nAssets.SolutionFile = __webpack_require__(/*! ../assets/slnFile.png */ \"./src/assets/slnFile.png\");\nconst FileLookUp = new Map([\n    [\".cs\", Assets.CSharpFile],\n    [\".html\", Assets.HtmlFile],\n    [\".htm\", Assets.HtmlFile],\n    [\".js\", Assets.JavaScriptFile],\n    [\".json\", Assets.JsonFile],\n    [\".csproj\", Assets.ProjectFile],\n    [\".sln\", Assets.SolutionFile]\n]);\n\n\n//# sourceURL=webpack://asp.net/./src/Utils/Assets.ts?");

/***/ }),

/***/ "./src/Utils/Elm.ts":
/*!**************************!*\
  !*** ./src/Utils/Elm.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Elm: () => (/* binding */ Elm),\n/* harmony export */   RefreshToken: () => (/* binding */ RefreshToken),\n/* harmony export */   SubRender: () => (/* binding */ SubRender)\n/* harmony export */ });\n/* harmony import */ var _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Home/Models/Guid */ \"./src/Home/Models/Guid.ts\");\n\nclass SubRender {\n    constructor(Id) {\n        this.Id = Id;\n    }\n    Refresh() {\n        const element = document.getElementById(this.Id);\n        element.innerHTML = \"\";\n        element.appendChild(this.Render().done());\n    }\n}\nclass RefreshToken {\n    constructor(tempalte) {\n        this.tempalte = tempalte;\n        this.Id = _Home_Models_Guid__WEBPACK_IMPORTED_MODULE_0__.Guid.NewGuid();\n    }\n}\nclass Elm {\n    constructor(tagName) {\n        if (tagName != null) {\n            this.elm = document.createElement(tagName);\n        }\n    }\n    Html(txt) {\n        this.elm.innerHTML = txt;\n        return this;\n    }\n    Id(id) {\n        this.elm.id = id;\n        return this;\n    }\n    Focus(focused) {\n        if (focus) {\n            this.elm.focus();\n        }\n        return this;\n    }\n    static From(elm) {\n        const result = new Elm(null);\n        result.elm = elm;\n        return result;\n    }\n    static Refreshable(token) {\n        token.Refresh = () => {\n            const div = document.getElementById(token.Id.toString());\n            div.innerHTML = \"\";\n            div.appendChild(token.tempalte().done());\n        };\n        return new Elm(\"div\").Id(token.Id.toString()).Swallow(() => [\n            token.tempalte()\n        ]);\n    }\n    Evt(type, listener, options) {\n        this.elm.addEventListener(type, listener);\n        return this;\n    }\n    done() {\n        return this.elm;\n    }\n    Attr(name, value) {\n        this.elm.setAttribute(name, value);\n        return this;\n    }\n    ClassIf(clss, condition) {\n        if (condition) {\n            this.elm.classList.add(clss);\n        }\n        else {\n            this.elm.classList.remove(clss);\n        }\n        return this;\n    }\n    Class(...classes) {\n        this.elm.classList.add(...classes);\n        return this;\n    }\n    Style(styling) {\n        styling(this.elm.style);\n        return this;\n    }\n    Value(value) {\n        this.Attr(\"value\", value);\n        return this;\n    }\n    Flag(name, value) {\n        if (value) {\n            this.elm.setAttribute(name, \"\");\n        }\n        else {\n            if (this.elm.hasAttribute(name)) {\n                this.elm.removeAttribute(name);\n            }\n        }\n        return this;\n    }\n    Text(value) {\n        this.elm.innerText = value;\n        return this;\n    }\n    Swallow(stuff) {\n        stuff().forEach(n => this.elm.appendChild(n.done()));\n        return this;\n    }\n    EatArray(ary, transformation) {\n        ary.forEach(n => this.elm.appendChild(transformation(n).done()));\n        return this;\n    }\n    EatAndGroup(ary, variable, groupBy, transform) {\n        const groups = new Map();\n        ary.forEach(n => {\n            const item = groupBy(n);\n            if (!groups.has(item)) {\n                groups.set(item, [n]);\n            }\n            else {\n                groups.get(item).push(n);\n            }\n        });\n        const result = Array();\n        groups.forEach((value, key) => {\n            const variablePart = value.map(n => variable(n));\n            result.push(transform(variablePart, value[0]));\n        });\n        this.Swallow(() => result);\n        return this;\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/Utils/Elm.ts?");

/***/ }),

/***/ "./src/home/Components/AppMenu/AppMenu.ts":
/*!************************************************!*\
  !*** ./src/home/Components/AppMenu/AppMenu.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppMenu: () => (/* binding */ AppMenu)\n/* harmony export */ });\n/* harmony import */ var _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/AppPipe */ \"./src/Utils/AppPipe.ts\");\n/* harmony import */ var _Utils_Assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/Assets */ \"./src/Utils/Assets.ts\");\n/* harmony import */ var _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Utils/Elm */ \"./src/Utils/Elm.ts\");\n/* harmony import */ var _Services_DotNetService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Services/DotNetService */ \"./src/home/Services/DotNetService.ts\");\n\n\n\n\nclass AppMenu extends HTMLElement {\n    constructor() {\n        super();\n    }\n    adoptedCallback() {\n        // called when the element is moved to a new document\n        // (happens in document.adoptNode, very rarely used)\n    }\n    disconnectedCallback() {\n        // browser calls this method when the element is removed from the document\n        // (can be called many times if an element is repeatedly added/removed)\n    }\n    static get observedAttributes() {\n        return [];\n    }\n    attributeChangedCallback(name, oldValue, newValue) {\n    }\n    connectedCallback() {\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Get(_Services_DotNetService__WEBPACK_IMPORTED_MODULE_3__.DotNetCLIService).GetVersions().then(n => {\n            n.sort().reverse();\n            this.versions = n;\n            this.render();\n            _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.SendEvent(_Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Commands.SelectedVersion, n[0]);\n        });\n    }\n    render() {\n        this.innerHTML = \"\";\n        this.appendChild(new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"nav\").Swallow(() => [\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"menu\").Swallow(() => [\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"li\").Swallow(() => [\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"img\").Attr(\"src\", _Utils_Assets__WEBPACK_IMPORTED_MODULE_1__.Assets.AddProject),\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Text(\"New Project\")\n                ]).Evt(\"click\", e => {\n                    _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.SendEvent(\"AppMenuItemClicked\", \"NewProject\");\n                }),\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"li\").Swallow(() => [\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"img\").Attr(\"src\", _Utils_Assets__WEBPACK_IMPORTED_MODULE_1__.Assets.AddFile),\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Text(\"New File\")\n                ]).Evt(\"click\", e => {\n                    _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.SendEvent(_Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Commands.AppMenuItemClicked, \"NewFile\");\n                    ;\n                }),\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"li\").Swallow(() => [\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"img\").Attr(\"src\", _Utils_Assets__WEBPACK_IMPORTED_MODULE_1__.Assets.AddFile),\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Text(\"New Directory\")\n                ]).Evt(\"click\", e => {\n                    _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.SendEvent(_Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Commands.AppMenuItemClicked, \"NewDirectory\");\n                    ;\n                }),\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"li\").Class(\"noClick\").Swallow(() => [\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"span\").Text(\"DotNet Version: \"),\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"select\").Id(\"versionSelected\")\n                        .Class(\"custom-select\")\n                        .Evt(\"change\", e => {\n                        const select = e.target;\n                        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.SendEvent(_Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Commands.SelectedVersion, select.value);\n                    }).EatArray(this.versions, n => new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"option\").Text(n))\n                ])\n            ])\n        ]).done());\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/home/Components/AppMenu/AppMenu.ts?");

/***/ }),

/***/ "./src/home/Components/DotNetDialog/DotNetDialog.ts":
/*!**********************************************************!*\
  !*** ./src/home/Components/DotNetDialog/DotNetDialog.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DotNetDialog: () => (/* binding */ DotNetDialog)\n/* harmony export */ });\n/* harmony import */ var _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/AppPipe */ \"./src/Utils/AppPipe.ts\");\n/* harmony import */ var _Commands_DomainCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Commands/DomainCommand */ \"./src/Commands/DomainCommand.ts\");\n/* harmony import */ var _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Utils/Elm */ \"./src/Utils/Elm.ts\");\n/* harmony import */ var _Services_DotNetService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Services/DotNetService */ \"./src/home/Services/DotNetService.ts\");\n/* harmony import */ var _Models_DialogResults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Models/DialogResults */ \"./src/home/Models/DialogResults.ts\");\n\n\n\n\n\nclass DotNetDialog extends HTMLElement {\n    constructor() {\n        super();\n        this.selectedTemplate = \"\";\n        this.selectedLanguage = \"\";\n        this.projectName = \"\";\n        this.baseDirectory = \"\";\n        this.innerDialog = document.createElement(\"dialog\");\n        this.append(this.innerDialog);\n    }\n    reset() {\n        this.selectedTemplate = \"\";\n        this.projectName = \"\";\n        this.templates = new Array;\n        this.FirstRender().then(n => {\n        });\n    }\n    adoptedCallback() { }\n    disconnectedCallback() { }\n    attributeChangedCallback(name, oldValue, newValue) {\n        if (name === \"version\") {\n            this.version = newValue;\n            if (this.baseDirectory) {\n                this.FirstRender();\n            }\n        }\n        if (name === \"path\") {\n            this.baseDirectory = newValue;\n            if (this.version) {\n                this.FirstRender();\n            }\n        }\n    }\n    connectedCallback() {\n    }\n    get DialogResult() {\n        return this.dialogResult;\n    }\n    set DialogResult(value) {\n        this.dialogResult = value;\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.SendEvent(\"dialogResultSet\", value);\n    }\n    async ShowDialogAsync() {\n        this.querySelector(\"dialog\").showModal();\n        return new Promise((resolve, reject) => {\n            _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Register(\"dialogResultSet\", n => {\n                resolve(n);\n                this.querySelector(\"dialog\").close();\n                this.reset();\n            });\n        });\n    }\n    async FirstRender() {\n        this.templates = await _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Get(_Services_DotNetService__WEBPACK_IMPORTED_MODULE_3__.DotNetCLIService).GetTemplates(this.version, _Services_DotNetService__WEBPACK_IMPORTED_MODULE_3__.TemplateType.project);\n        const temp = new Map();\n        this.templates.forEach(n => {\n            n.classifications.forEach(t => {\n                temp.set(t, t);\n            });\n        });\n        this.tags = Array.from(temp.keys());\n        this.tags.sort();\n        await this.Render();\n    }\n    async Render() {\n        this.innerDialog.innerHTML = \"\";\n        const validate = () => {\n            const completeElm = document.getElementById(\"complete\");\n            const nextElm = document.getElementById(\"next\");\n            if (!this.projectName || !this.selectedTemplate) {\n                completeElm.classList.add(\"disabled\");\n                nextElm.classList.add(\"disabled\");\n            }\n            else {\n                completeElm.classList.remove(\"disabled\");\n                nextElm.classList.remove(\"disabled\");\n            }\n        };\n        const valid = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_Backspace\";\n        const sanitize = (n) => {\n            if (n.key === \" \") {\n                const projName = n.target;\n                const dir = document.getElementById(\"projectDir\");\n                projName.value += \"_\";\n            }\n            if (valid.indexOf(n.key) === -1) {\n                n.preventDefault();\n                return false;\n            }\n        };\n        const changeProjName = (n) => {\n            const projName = n.target;\n            this.projectName = projName.value;\n            validate();\n        };\n        //const templateSelector = new TemplateSelector(\"templateSelector\", this.tags, this.templates, s => this.selectedTemplate = s, () => this.selectedTemplate, validate);\n        let selectedCategory = \"\";\n        let selectedLanguage = \"\";\n        let selection;\n        const HasTag = (t, tag) => {\n            return t.classifications.filter(n => n === tag).length > 0;\n        };\n        const getShortName = (s) => {\n            let shortName = s;\n            if (Object.getPrototypeOf(s) === \"[]\") {\n                shortName = s[0];\n            }\n            return shortName;\n        };\n        const categories = new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.RefreshToken(() => new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Class(\"Categories\").EatArray(this.tags, n => new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Text(n).ClassIf(\"selected\", n === selectedCategory)\n            .Evt(\"click\", e => {\n            selectedCategory = n;\n            selection = this.templates.filter((n) => HasTag(n, selectedCategory));\n            const selected = this.querySelectorAll(\".Categories div.selected\");\n            if (selected.length === 1)\n                if (selected[0].classList.contains(\"selected\")) {\n                    selected[0].classList.remove(\"selected\");\n                }\n            e.target.classList.add(\"selected\");\n            //categories.Refresh();\n            temlpateSelector.Refresh();\n        })));\n        const temlpateSelector = new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.RefreshToken(() => new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\")\n            .Class(\"Templates\")\n            .EatAndGroup(selectedCategory ? selection : this.templates, n => n.tags?.language, n => n.name + n.description, (variablePart, constantPart) => new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"article\").Class(...(getShortName(constantPart.shortName) == this.selectedTemplate ? [\"group\", \"selected\"] : [\"group\"]))\n            .Attr(\"data-shortName\", getShortName(constantPart.shortName))\n            .Swallow(() => [\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"header\").Class(\"templateName\").Swallow(() => [\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"h4\").Text(constantPart.name)\n            ]),\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"p\").Class(\"templateDescription\").Text(constantPart.description),\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"ul\").EatArray(variablePart, n => new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"li\").Evt(\"click\", e => {\n                this.selectedTemplate = getShortName(constantPart.shortName);\n                this.selectedLanguage = n;\n                temlpateSelector.Refresh();\n            }).Swallow(() => [\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"span\").ClassIf(\"selected\", this.selectedLanguage === n).Text(n)\n            ]))\n        ])));\n        const abort = (e) => {\n            const cmd = new _Commands_DomainCommand__WEBPACK_IMPORTED_MODULE_1__.AbortProjectCreation();\n            _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.ExecuteCommand(cmd);\n            this.DialogResult = _Models_DialogResults__WEBPACK_IMPORTED_MODULE_4__.DialogResults.Abort;\n        };\n        const complete = (e) => {\n            const completeElm = document.getElementById(\"complete\");\n            if (completeElm.classList.contains(\"disabled\")) {\n                return;\n            }\n            const cmd = new _Commands_DomainCommand__WEBPACK_IMPORTED_MODULE_1__.SelectDotNetTemplate();\n            cmd.ProjectName = this.projectName;\n            cmd.TemplateName = this.selectedTemplate;\n            cmd.BaseDirectory = this.baseDirectory;\n            _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.ExecuteCommand(cmd);\n            _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.ExecuteCommand(new _Commands_DomainCommand__WEBPACK_IMPORTED_MODULE_1__.CompleteProjectCreation());\n            this.DialogResult = _Models_DialogResults__WEBPACK_IMPORTED_MODULE_4__.DialogResults.Complete;\n        };\n        const next = (e) => {\n            const nextElm = document.getElementById(\"next\");\n            if (nextElm.classList.contains(\"disabled\")) {\n                return;\n            }\n            const cmd = new _Commands_DomainCommand__WEBPACK_IMPORTED_MODULE_1__.SelectDotNetTemplate();\n            cmd.ProjectName = this.projectName;\n            cmd.TemplateName = this.selectedTemplate.trim();\n            _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.ExecuteCommand(cmd);\n            this.DialogResult = _Models_DialogResults__WEBPACK_IMPORTED_MODULE_4__.DialogResults.Next;\n        };\n        _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm.From(this.innerDialog).Swallow(() => [\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Class(\"dialogWrapper\").Swallow(() => [\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"header\").Text(\"DotNetCore Templates\"),\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Class(\"OuterTemplateWrapper\").Swallow(() => [\n                    _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm.Refreshable(categories),\n                    _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm.Refreshable(temlpateSelector),\n                ]),\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"fieldset\").Swallow(() => [\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Class(\"ControlGroup\").Swallow(() => [\n                        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"span\").Text(\"Project Name: \"),\n                        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"input\")\n                            .Id(\"projectName\")\n                            .Value(this.projectName)\n                            .Evt(\"keydown\", sanitize).Evt(\"keyup\", changeProjName),\n                    ])\n                ]),\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"div\").Class(\"ButtonGroup\").Swallow(() => [\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"button\").Text(\"Abort\").Class(\"AbortButton\", \"dialogButton\")\n                        .Evt(\"click\", abort), ,\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"button\").Text(\"Complete\").Class(\"CompleteButton\", \"dialogButton\", \"disabled\")\n                        .Evt(\"click\", complete).Id(\"complete\"),\n                    new _Utils_Elm__WEBPACK_IMPORTED_MODULE_2__.Elm(\"button\").Html(\"Next\").Class(\"NextButton\", \"dialogButton\", \"disabled\")\n                        .Evt(\"click\", next).Id(\"next\"),\n                ])\n            ])\n        ]);\n    }\n}\nDotNetDialog.observedAttributes = [\n    \"version\", \"path\"\n];\n\n\n//# sourceURL=webpack://asp.net/./src/home/Components/DotNetDialog/DotNetDialog.ts?");

/***/ }),

/***/ "./src/home/Components/FileViewer/FileView.ts":
/*!****************************************************!*\
  !*** ./src/home/Components/FileViewer/FileView.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FileView: () => (/* binding */ FileView)\n/* harmony export */ });\n/* harmony import */ var _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/AppPipe */ \"./src/Utils/AppPipe.ts\");\n/* harmony import */ var _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/Elm */ \"./src/Utils/Elm.ts\");\n/* harmony import */ var _Services_FileSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Services/FileSystem */ \"./src/home/Services/FileSystem.ts\");\n/* harmony import */ var _Models_PathType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Models/PathType */ \"./src/home/Models/PathType.ts\");\n/* harmony import */ var _RenderDirectories__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RenderDirectories */ \"./src/home/Components/FileViewer/RenderDirectories.ts\");\n/* harmony import */ var _RenderFiles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RenderFiles */ \"./src/home/Components/FileViewer/RenderFiles.ts\");\n/* harmony import */ var _RenderParent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RenderParent */ \"./src/home/Components/FileViewer/RenderParent.ts\");\n\n\n\n\n\n//import { RenderDrives } from \"./RenderDrives\";\n\n\nclass FileView extends HTMLElement {\n    constructor() {\n        super();\n    }\n    adoptedCallback() {\n        // called when the element is moved to a new document\n        // (happens in document.adoptNode, very rarely used)\n    }\n    disconnectedCallback() {\n        // browser calls this method when the element is removed from the document\n        // (can be called many times if an element is repeatedly added/removed)\n    }\n    static get observedAttributes() {\n        return [\"path\"];\n    }\n    attributeChangedCallback(name, oldValue, newValue) {\n        if (name === \"path\") {\n            const pathItem = _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Get(_Services_FileSystem__WEBPACK_IMPORTED_MODULE_2__.FileSystem).GetDirectory(newValue).then(n => {\n                this.Render(n);\n                _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.SendEvent(\"FilePathChanged\", newValue);\n            });\n        }\n    }\n    connectedCallback() {\n        if (this.hasAttribute(\"path\")) {\n            const newValue = this.getAttribute(\"path\");\n            const pathItem = _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Get(_Services_FileSystem__WEBPACK_IMPORTED_MODULE_2__.FileSystem).GetDirectory(newValue).then(n => {\n                this.Render(n);\n            });\n        }\n    }\n    async Render(dir) {\n        this.innerHTML = \"\";\n        this.appendChild(new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Text(dir.FullPath.toUpperCase()).Class(\"PathDisplay\").done());\n        if (dir.PathType === _Models_PathType__WEBPACK_IMPORTED_MODULE_3__.PathType.Drive) {\n            // RenderDrives(dir.Drives, this);\n            (0,_RenderDirectories__WEBPACK_IMPORTED_MODULE_4__.RenderDirectories)(dir.Directories, this);\n            (0,_RenderFiles__WEBPACK_IMPORTED_MODULE_5__.RenderFiles)(dir.Files, this);\n        }\n        else {\n            //render parent\n            (0,_RenderParent__WEBPACK_IMPORTED_MODULE_6__.RenderParent)(dir.Parent, this);\n            (0,_RenderDirectories__WEBPACK_IMPORTED_MODULE_4__.RenderDirectories)(dir.Directories, this);\n            (0,_RenderFiles__WEBPACK_IMPORTED_MODULE_5__.RenderFiles)(dir.Files, this);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/home/Components/FileViewer/FileView.ts?");

/***/ }),

/***/ "./src/home/Components/FileViewer/RenderDirectories.ts":
/*!*************************************************************!*\
  !*** ./src/home/Components/FileViewer/RenderDirectories.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RenderDirectories: () => (/* binding */ RenderDirectories)\n/* harmony export */ });\n/* harmony import */ var _Utils_Assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/Assets */ \"./src/Utils/Assets.ts\");\n/* harmony import */ var _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/Elm */ \"./src/Utils/Elm.ts\");\n\n\nconst RenderDirectories = (directories, fileView) => {\n    _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm.From(fileView).EatArray(directories, n => new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Class(\"group\", \"dir\").Evt(\"click\", () => {\n        fileView.setAttribute(\"path\", n.FullPath);\n    }).Swallow(() => [\n        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Swallow(() => [\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"img\").Attr(\"src\", _Utils_Assets__WEBPACK_IMPORTED_MODULE_0__.Assets.Folder)\n        ]),\n        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Text(`${n.Name}`)\n    ]));\n};\n\n\n//# sourceURL=webpack://asp.net/./src/home/Components/FileViewer/RenderDirectories.ts?");

/***/ }),

/***/ "./src/home/Components/FileViewer/RenderFiles.ts":
/*!*******************************************************!*\
  !*** ./src/home/Components/FileViewer/RenderFiles.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RenderFiles: () => (/* binding */ RenderFiles)\n/* harmony export */ });\n/* harmony import */ var _Utils_Assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/Assets */ \"./src/Utils/Assets.ts\");\n/* harmony import */ var _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/Elm */ \"./src/Utils/Elm.ts\");\n/* harmony import */ var _formatSize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatSize */ \"./src/home/Components/FileViewer/formatSize.ts\");\n\n\n\nconst RenderFiles = (files, fileView) => {\n    _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm.From(fileView).EatArray(files, n => new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"dir\").Class(\"group\").Swallow(() => [\n        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Swallow(() => [\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"img\").Attr(\"src\", !_Utils_Assets__WEBPACK_IMPORTED_MODULE_0__.FileLookUp.has(n.Extension) ? _Utils_Assets__WEBPACK_IMPORTED_MODULE_0__.Assets.File : _Utils_Assets__WEBPACK_IMPORTED_MODULE_0__.FileLookUp.get(n.Extension))\n        ]),\n        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Text(n.Name),\n        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\"),\n        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Text((0,_formatSize__WEBPACK_IMPORTED_MODULE_2__.formatSize)(n.Size)),\n    ]));\n};\n\n\n//# sourceURL=webpack://asp.net/./src/home/Components/FileViewer/RenderFiles.ts?");

/***/ }),

/***/ "./src/home/Components/FileViewer/RenderParent.ts":
/*!********************************************************!*\
  !*** ./src/home/Components/FileViewer/RenderParent.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RenderParent: () => (/* binding */ RenderParent)\n/* harmony export */ });\n/* harmony import */ var _Utils_Assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/Assets */ \"./src/Utils/Assets.ts\");\n/* harmony import */ var _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/Elm */ \"./src/Utils/Elm.ts\");\n\n\nconst RenderParent = (parent, fileView) => {\n    _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm.From(fileView).Swallow(() => [\n        new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Class(\"group\", \"dir\")\n            .Evt(\"click\", () => {\n            fileView.setAttribute(\"path\", parent.FullPath);\n        }).Swallow(() => [\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Swallow(() => [\n                new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"img\").Attr(\"src\", _Utils_Assets__WEBPACK_IMPORTED_MODULE_0__.Assets.FolderBack)\n            ]),\n            new _Utils_Elm__WEBPACK_IMPORTED_MODULE_1__.Elm(\"div\").Text(\"..\")\n        ])\n    ]);\n};\n\n\n//# sourceURL=webpack://asp.net/./src/home/Components/FileViewer/RenderParent.ts?");

/***/ }),

/***/ "./src/home/Components/FileViewer/formatSize.ts":
/*!******************************************************!*\
  !*** ./src/home/Components/FileViewer/formatSize.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatSize: () => (/* binding */ formatSize)\n/* harmony export */ });\nfunction formatSize(bytes) {\n    if (bytes < 1024) {\n        return bytes + \"bytes\";\n    }\n    if (bytes < 1048576) {\n        return Math.round(bytes / 10.24) / 100 + \"Kb\";\n    }\n    if (bytes < 1073741824) {\n        return Math.round(bytes / 10485.76) / 100 + \"Mb\";\n    }\n    if (bytes < 1099511627776) {\n        return Math.round(bytes / 10737418.24) / 100 + \"Gb\";\n    }\n    if (bytes < 1125899906842624) {\n        return Math.round(bytes / 10995116277.76) / 100 + \"Tb\";\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/home/Components/FileViewer/formatSize.ts?");

/***/ }),

/***/ "./src/home/Home.ts":
/*!**************************!*\
  !*** ./src/home/Home.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Home: () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/AppPipe */ \"./src/Utils/AppPipe.ts\");\n/* harmony import */ var _Services_FileSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Services/FileSystem */ \"./src/home/Services/FileSystem.ts\");\n/* harmony import */ var _Events_DomainEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Events/DomainEvent */ \"./src/Events/DomainEvent.ts\");\n/* harmony import */ var _Models_Stages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Models/Stages */ \"./src/home/Models/Stages.ts\");\n/* harmony import */ var _Services_DotNetService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Services/DotNetService */ \"./src/home/Services/DotNetService.ts\");\n\n\n\n\n\nclass Home {\n    constructor() {\n        this.fileSystem = new _Services_FileSystem__WEBPACK_IMPORTED_MODULE_1__.FileSystem();\n    }\n    async Run() {\n        const fileview = document.getElementById(\"FileView\");\n        const dotnetDialog = document.querySelector(\"#dotnet\");\n        //need implementing...\n        //const newFolderDialog = <NewFolderDialog>document.querySelector(\"NewFolder\");\n        //const newFileDialog = <NewFileDialog>document.querySelector(\"NewFile\");\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Register(\"AppMenuItemClicked\", async (e) => {\n            switch (e) {\n                case \"NewProject\":\n                    dotnetDialog.setAttribute(\"path\", fileview.getAttribute(\"path\"));\n                    await dotnetDialog.ShowDialogAsync();\n                    break;\n                case \"NewFile\":\n                    //await newFileDialog.ShowDialgAsync();\n                    break;\n                case \"NewDirectory\":\n                    //await newFolderDialog.ShowDialogAsync();\n                    break;\n            }\n        });\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Register(_Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Commands.SelectedVersion, (version) => {\n            dotnetDialog.setAttribute(\"version\", version);\n            this.version = version;\n        });\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Register(\"ExecuteCommand\", (e) => {\n            const events = e.Execute(); //execute here so i can add in what ever is needed to execute the command...\n            events.forEach(e => _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.SendDomainEvent(e));\n        });\n        this.handleEvents(fileview);\n    }\n    handleEvents(fileView) {\n        let Stage = _Models_Stages__WEBPACK_IMPORTED_MODULE_3__.Stages.BaseFolderSelector;\n        let basefolder = \"\";\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.HandleDomainEvent(_Events_DomainEvent__WEBPACK_IMPORTED_MODULE_2__.BaseFolderSelected, e => {\n            Stage = _Models_Stages__WEBPACK_IMPORTED_MODULE_3__.Stages.DotNetTemplate;\n            basefolder = e.BaseFolder;\n        });\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.HandleDomainEvent(_Events_DomainEvent__WEBPACK_IMPORTED_MODULE_2__.DotNetTemplateSelected, async (e) => {\n            await _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Get(_Services_DotNetService__WEBPACK_IMPORTED_MODULE_4__.DotNetCLIService).MakeProject(e.ProjectName, e.BaseDirectory, e.TemplateName, null).then(async () => {\n                Stage = _Models_Stages__WEBPACK_IMPORTED_MODULE_3__.Stages.ScriptTemplate;\n                const pathObject = await _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.Get(_Services_FileSystem__WEBPACK_IMPORTED_MODULE_1__.FileSystem).GetDirectory(e.BaseDirectory);\n                await fileView.Render(pathObject);\n            });\n        });\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.HandleDomainEvent(_Events_DomainEvent__WEBPACK_IMPORTED_MODULE_2__.ProjectCreationCompleted, e => {\n            Stage = _Models_Stages__WEBPACK_IMPORTED_MODULE_3__.Stages.BaseFolderSelector;\n        });\n        _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_0__.App.Pipe.HandleDomainEvent(_Events_DomainEvent__WEBPACK_IMPORTED_MODULE_2__.ProjectSetupAborted, e => {\n            Stage = _Models_Stages__WEBPACK_IMPORTED_MODULE_3__.Stages.BaseFolderSelector;\n        });\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/home/Home.ts?");

/***/ }),

/***/ "./src/home/Models/DialogResults.ts":
/*!******************************************!*\
  !*** ./src/home/Models/DialogResults.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DialogResults: () => (/* binding */ DialogResults)\n/* harmony export */ });\nvar DialogResults;\n(function (DialogResults) {\n    DialogResults[DialogResults[\"Yes\"] = 0] = \"Yes\";\n    DialogResults[DialogResults[\"No\"] = 1] = \"No\";\n    DialogResults[DialogResults[\"Ok\"] = 2] = \"Ok\";\n    DialogResults[DialogResults[\"Next\"] = 3] = \"Next\";\n    DialogResults[DialogResults[\"Complete\"] = 4] = \"Complete\";\n    DialogResults[DialogResults[\"Abort\"] = 5] = \"Abort\";\n    DialogResults[DialogResults[\"Cancel\"] = 6] = \"Cancel\";\n    DialogResults[DialogResults[\"Back\"] = 7] = \"Back\";\n})(DialogResults || (DialogResults = {}));\n\n\n//# sourceURL=webpack://asp.net/./src/home/Models/DialogResults.ts?");

/***/ }),

/***/ "./src/home/Models/PathType.ts":
/*!*************************************!*\
  !*** ./src/home/Models/PathType.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PathType: () => (/* binding */ PathType)\n/* harmony export */ });\nvar PathType;\n(function (PathType) {\n    PathType[\"Drive\"] = \"Drive\";\n    PathType[\"Directory\"] = \"Directory\";\n    PathType[\"File\"] = \"File\";\n})(PathType || (PathType = {}));\n\n\n//# sourceURL=webpack://asp.net/./src/home/Models/PathType.ts?");

/***/ }),

/***/ "./src/home/Models/ProjectDTO.ts":
/*!***************************************!*\
  !*** ./src/home/Models/ProjectDTO.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProjectDTO: () => (/* binding */ ProjectDTO)\n/* harmony export */ });\nclass ProjectDTO {\n    constructor() {\n        this.Language = \"C#\";\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/home/Models/ProjectDTO.ts?");

/***/ }),

/***/ "./src/home/Models/Stages.ts":
/*!***********************************!*\
  !*** ./src/home/Models/Stages.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Stages: () => (/* binding */ Stages)\n/* harmony export */ });\nvar Stages;\n(function (Stages) {\n    Stages[Stages[\"BaseFolderSelector\"] = 0] = \"BaseFolderSelector\";\n    Stages[Stages[\"DotNetTemplate\"] = 1] = \"DotNetTemplate\";\n    Stages[Stages[\"ScriptTemplate\"] = 2] = \"ScriptTemplate\";\n    Stages[Stages[\"StumpSelector\"] = 3] = \"StumpSelector\";\n})(Stages || (Stages = {}));\n\n\n//# sourceURL=webpack://asp.net/./src/home/Models/Stages.ts?");

/***/ }),

/***/ "./src/home/Services/DotNetService.ts":
/*!********************************************!*\
  !*** ./src/home/Services/DotNetService.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DotNetCLIService: () => (/* binding */ DotNetCLIService),\n/* harmony export */   TemplateType: () => (/* binding */ TemplateType)\n/* harmony export */ });\n/* harmony import */ var _Models_ProjectDTO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/ProjectDTO */ \"./src/home/Models/ProjectDTO.ts\");\n\nvar TemplateType;\n(function (TemplateType) {\n    TemplateType[\"project\"] = \"project\";\n    TemplateType[\"file\"] = \"file\";\n})(TemplateType || (TemplateType = {}));\nclass DotNetCLIService {\n    async GetVersions() {\n        const url = location.origin + \"/dotnet/versions\";\n        const response = await fetch(url);\n        const text = await response.text();\n        return JSON.parse(text);\n    }\n    async GetTemplates(version, type) {\n        if (!version) {\n            return [];\n        }\n        const url = `${location.origin}/dotnet/templates?version=${version}&type=${type}`;\n        const response = await fetch(url);\n        const text = await response.text();\n        return JSON.parse(text);\n    }\n    async MakeProject(projectName, baseDirecotry, template, language = \"C#\") {\n        const dto = new _Models_ProjectDTO__WEBPACK_IMPORTED_MODULE_0__.ProjectDTO();\n        dto.Template = template;\n        dto.BaseDirectory = baseDirecotry;\n        dto.Language = language;\n        dto.ProjectName = projectName;\n        await fetch(location.origin + \"/dotnet/new\", {\n            method: \"POST\",\n            body: JSON.stringify(dto),\n            headers: {\n                \"Content-type\": \"application/json; charset=UTF-8\"\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/home/Services/DotNetService.ts?");

/***/ }),

/***/ "./src/home/Services/FileSystem.ts":
/*!*****************************************!*\
  !*** ./src/home/Services/FileSystem.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FileSystem: () => (/* binding */ FileSystem)\n/* harmony export */ });\nclass FileSystem {\n    constructor() {\n    }\n    async GetDirectory(path) {\n        const url = `${location.origin}/directory/open?dir=${encodeURI(path)}`;\n        const response = await fetch(url);\n        const text = await response.text();\n        return JSON.parse(text);\n    }\n}\n\n\n//# sourceURL=webpack://asp.net/./src/home/Services/FileSystem.ts?");

/***/ }),

/***/ "./src/home/entry.ts":
/*!***************************!*\
  !*** ./src/home/entry.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home */ \"./src/home/Home.ts\");\n/* harmony import */ var _Components_AppMenu_AppMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/AppMenu/AppMenu */ \"./src/home/Components/AppMenu/AppMenu.ts\");\n/* harmony import */ var _Components_FileViewer_FileView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/FileViewer/FileView */ \"./src/home/Components/FileViewer/FileView.ts\");\n/* harmony import */ var _Services_FileSystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Services/FileSystem */ \"./src/home/Services/FileSystem.ts\");\n/* harmony import */ var _Services_DotNetService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Services/DotNetService */ \"./src/home/Services/DotNetService.ts\");\n/* harmony import */ var _Components_DotNetDialog_DotNetDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/DotNetDialog/DotNetDialog */ \"./src/home/Components/DotNetDialog/DotNetDialog.ts\");\n/* harmony import */ var _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/AppPipe */ \"./src/Utils/AppPipe.ts\");\n\n\n\n\n\n\n\n(function () {\n    _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_6__.App.Pipe.Set(_Services_FileSystem__WEBPACK_IMPORTED_MODULE_3__.FileSystem);\n    _Utils_AppPipe__WEBPACK_IMPORTED_MODULE_6__.App.Pipe.Set(_Services_DotNetService__WEBPACK_IMPORTED_MODULE_4__.DotNetCLIService);\n    customElements.define(\"file-viewer\", _Components_FileViewer_FileView__WEBPACK_IMPORTED_MODULE_2__.FileView);\n    customElements.define(\"app-menu\", _Components_AppMenu_AppMenu__WEBPACK_IMPORTED_MODULE_1__.AppMenu);\n    customElements.define(\"dotnet-dialog\", _Components_DotNetDialog_DotNetDialog__WEBPACK_IMPORTED_MODULE_5__.DotNetDialog);\n    new _Home__WEBPACK_IMPORTED_MODULE_0__.Home().Run().then(() => {\n        console.log(\"done\");\n    });\n}());\n\n\n//# sourceURL=webpack://asp.net/./src/home/entry.ts?");

/***/ }),

/***/ "./src/assets/basicFile.png":
/*!**********************************!*\
  !*** ./src/assets/basicFile.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"00abb3a5df44e53569fd.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/basicFile.png?");

/***/ }),

/***/ "./src/assets/c\u0000#.png":
/*!****************************!*\
  !*** ./src/assets/c #.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"8803fbe29fe761b2237d.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/c%00#.png?");

/***/ }),

/***/ "./src/assets/console.png":
/*!********************************!*\
  !*** ./src/assets/console.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"2e1713a64e6cc1dce293.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/console.png?");

/***/ }),

/***/ "./src/assets/drive.png":
/*!******************************!*\
  !*** ./src/assets/drive.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"e568553ab4b9c8b281d7.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/drive.png?");

/***/ }),

/***/ "./src/assets/folder.png":
/*!*******************************!*\
  !*** ./src/assets/folder.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"39a55e7c9fa6cf13ca3c.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/folder.png?");

/***/ }),

/***/ "./src/assets/folderback.png":
/*!***********************************!*\
  !*** ./src/assets/folderback.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"3118431942204207a5b2.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/folderback.png?");

/***/ }),

/***/ "./src/assets/globe.png":
/*!******************************!*\
  !*** ./src/assets/globe.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"40538e5d5043f3af7ac7.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/globe.png?");

/***/ }),

/***/ "./src/assets/htmlfile.png":
/*!*********************************!*\
  !*** ./src/assets/htmlfile.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"3b94744a6e1b0f51f84e.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/htmlfile.png?");

/***/ }),

/***/ "./src/assets/jsfile.png":
/*!*******************************!*\
  !*** ./src/assets/jsfile.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"05e595ac38d81214b8ba.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/jsfile.png?");

/***/ }),

/***/ "./src/assets/jsonfile.png":
/*!*********************************!*\
  !*** ./src/assets/jsonfile.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"b0feef1494be010fc4c6.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/jsonfile.png?");

/***/ }),

/***/ "./src/assets/lib.png":
/*!****************************!*\
  !*** ./src/assets/lib.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"4746f9ffdc5ba4e26000.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/lib.png?");

/***/ }),

/***/ "./src/assets/plusProj.png":
/*!*********************************!*\
  !*** ./src/assets/plusProj.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"af2ce11c13926529fa06.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/plusProj.png?");

/***/ }),

/***/ "./src/assets/plusfile.png":
/*!*********************************!*\
  !*** ./src/assets/plusfile.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"e35a62cf4181186cd52b.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/plusfile.png?");

/***/ }),

/***/ "./src/assets/projFile.png":
/*!*********************************!*\
  !*** ./src/assets/projFile.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"8d3097969ec7a55f3248.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/projFile.png?");

/***/ }),

/***/ "./src/assets/slnFile.png":
/*!********************************!*\
  !*** ./src/assets/slnFile.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"d7bd532dfe7ea2d886ba.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/slnFile.png?");

/***/ }),

/***/ "./src/assets/winform.png":
/*!********************************!*\
  !*** ./src/assets/winform.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"31999389b81c72d345cc.png\";\n\n//# sourceURL=webpack://asp.net/./src/assets/winform.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/home/entry.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/home/Home.css");
/******/ 	
/******/ })()
;