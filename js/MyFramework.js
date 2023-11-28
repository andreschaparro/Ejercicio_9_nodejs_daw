class HttpResponse {
}
class MyFramework {
    /**
     * getElementById: Busca un elemento del DOM por su ID
     * @param id : String con el id a buscar
     * @returns : Objeto HTMLElement encontrado
     */
    getElementById(id) {
        let el;
        el = document.getElementById(id);
        return el;
    }
    /**
     * getElementByEvent: Busca un elemento del DOM por su Event
     * @param evt : Event a buscar0
     * @returns : Objeto HTMLElement encontrado
     */
    getElementByEvent(evt) {
        return evt.target;
    }
    requestGET(url, listener) {
        let xhr;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    listener.handleGETResponse(xhr.status, xhr.responseText);
                }
                else {
                    listener.handleGETResponse(xhr.status, null);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send(null);
    }
    requestGETProm(url) {
        return new Promise((resolve, reject) => {
            let xhr;
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    let r = new HttpResponse();
                    if (xhr.status == 200) {
                        r.state = xhr.status;
                        r.data = xhr.responseText;
                        resolve(r);
                    }
                    else {
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
    requestPOST(url, data, listener) {
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    listener.handlePOSTResponse(xhr.status, xhr.responseText);
                }
                else {
                    listener.handlePOSTResponse(xhr.status, null);
                }
            }
        };
        xhr.open("POST", url);
        xhr.send(formData);
    }
}
