interface GETResponseListener {
    handleGETResponse(status:number, response:string):void;
}

interface POSTResponseListener {
    handlePOSTResponse(status:number, response:string):void;
}

class HttpResponse {
    public state:number;
    public data:string;
}

class MyFramework {
    /**
     * getElementById: Busca un elemento del DOM por su ID
     * @param id : String con el id a buscar
     * @returns : Objeto HTMLElement encontrado
     */
    getElementById(id:string): HTMLElement {
        let el:HTMLElement;
        el = document.getElementById(id);
        return el;
    }
    /**
     * getElementByEvent: Busca un elemento del DOM por su Event
     * @param evt : Event a buscar0
     * @returns : Objeto HTMLElement encontrado
     */
    getElementByEvent(evt:Event): HTMLElement {
        return <HTMLElement>evt.target;
    }

    requestGET(url:string, listener: GETResponseListener): void {
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    listener.handleGETResponse(xhr.status, xhr.responseText);
                } else {
                    listener.handleGETResponse(xhr.status, null);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send(null);
    }
    
    requestGETProm(url:string): Promise<HttpResponse> {
        return new Promise((resolve, reject) => {
            let xhr: XMLHttpRequest;
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4) {
                    let r:HttpResponse = new HttpResponse();
                    if(xhr.status == 200) {
                        r.state = xhr.status;
                        r.data = xhr.responseText;
                        resolve(r);
                    } else {
                        r.state = xhr.status;
                        r.data = null;
                        reject(r);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.send(null);
        });
    }

    requestPOST(url:string, data:object, listener:POSTResponseListener): void {
        let formData:FormData = new FormData();
        for(let key in data) {
            formData.append(key, data[key]);
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200)
                {
                    listener.handlePOSTResponse(xhr.status, xhr.responseText);
                } else {
                    listener.handlePOSTResponse(xhr.status, null);
                }
            }
        };
        xhr.open("POST", url);
        xhr.send(formData);
    }
}