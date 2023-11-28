interface DeviceInt {
    id: string;
    name: string;
    description: string;
    state: string;
    type: string;
}

class ViewMainPage {
    private _myf:MyFramework;

    constructor(myf:MyFramework) {
        this._myf = myf;
    }

    showDevices(list: DeviceInt[]):void {
        let devicesUl:HTMLElement = this._myf.getElementById("devicesList");
        let items:string = "";
        for(let i in list) {
            let checkedStr:string = "";
            if(list[i].state == "1") {
                checkedStr = "checked";
            }
            switch(list[i].type)
            {
                case "0":
                    items += `<li class="collection-item avatar">
                                <img src="images/lightbulb.png" alt="" class="circle">
                                <span class="title">${list[i].name}</span>
                                <p>${list[i].description}</p>
                                <div class="secondary-content switch">
                                    <label>
                                        Off
                                        <input type="checkbox" id="dev_${list[i].id}" ${checkedStr}>
                                        <span class="lever"></span>
                                        On
                                    </label>
                                </div>
                            </li>`;
                    break;
                case "1":
                    items += `<li class="collection-item avatar">
                                <img src="images/window.png" alt="" class="circle">
                                <span class="title">${list[i].name}</span>
                                <p>${list[i].description}</p>
                                    <div class="secondary-content switch">
                                    <label>
                                        Off
                                        <input type="checkbox" id="dev_${list[i].id}" ${checkedStr}>
                                        <span class="lever"></span>
                                        On
                                    </label>
                                </div>
                            </li>`;
                    break;
                default:
                    break;
            }
        }
        devicesUl.innerHTML = items;
    }

    getSwitchStateById(id:string): boolean {
        let sw:HTMLInputElement = <HTMLInputElement>this._myf.getElementById(id);
        return sw.checked;
    }

}

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener {
    private _myf:MyFramework;
    private _view:ViewMainPage;

    handleEvent(evt:Event): void {
        let sw:HTMLElement = this._myf.getElementByEvent(evt);
        console.log(`click en device: ${sw.id}`);
        let data:object = {"id": sw.id, "state": this._view.getSwitchStateById(sw.id)};
        this._myf.requestPOST("devices", data, this);
    }

    handleGETResponse(status:number, response:string): void {
        console.log(`Llego status ${status} response: ${response}`);
        if(status == 200) {
            let data:DeviceInt[] = JSON.parse(response);
            this._view.showDevices(data);
            for(let i in data) {
                let sw:HTMLElement = this._myf.getElementById("dev_" + data[i].id);
                sw.addEventListener("click", this);
            }
        }
    }

    handlePOSTResponse(status:number, response:string): void {
        if(status==200)
        {
            console.log(response);
        }
    }

    main(): void {
        this._myf = new MyFramework();
        this._view = new ViewMainPage(this._myf);
        this._myf.requestGET("devices", this);
    }
}

window.onload = () => {
    let m:Main = new Main();
    m.main();
};