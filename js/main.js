class ViewMainPage {
    constructor(myf) {
        this._myf = myf;
    }
    showDevices(list) {
        let devicesUl = this._myf.getElementById("devicesList");
        let items = "";
        for (let i in list) {
            let checkedStr = "";
            if (list[i].state == "1") {
                checkedStr = "checked";
            }
            switch (list[i].type) {
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
    getSwitchStateById(id) {
        let sw = this._myf.getElementById(id);
        return sw.checked;
    }
}
class Main {
    handleEvent(evt) {
        let sw = this._myf.getElementByEvent(evt);
        console.log(`click en device: ${sw.id}`);
        let data = { "id": sw.id, "state": this._view.getSwitchStateById(sw.id) };
        this._myf.requestPOST("devices", data, this);
    }
    handleGETResponse(status, response) {
        console.log(`Llego status ${status} response: ${response}`);
        if (status == 200) {
            let data = JSON.parse(response);
            this._view.showDevices(data);
            for (let i in data) {
                let sw = this._myf.getElementById("dev_" + data[i].id);
                sw.addEventListener("click", this);
            }
        }
    }
    handlePOSTResponse(status, response) {
        if (status == 200) {
            console.log(response);
        }
    }
    main() {
        this._myf = new MyFramework();
        this._view = new ViewMainPage(this._myf);
        this._myf.requestGET("devices", this);
    }
}
window.onload = () => {
    let m = new Main();
    m.main();
};
