const wsUrl = "wss://echo-ws-service.herokuapp.com";
const input = document.querySelector(".message");
const sendButton = document.querySelector(".sendButton");
const locationButton = document.querySelector(".locationButton");
const chatMain = document.querySelector(".chatMain");

function writeToChat(message) {
    let clientMessage = document.createElement("p");
    let bubble = document.createElement("div");
    clientMessage.style = `
    position: relative;
    padding: 10px;
    margin: 0px 0px 10px;
    max-width: 40%;
    word-wrap: break-word;
    height: min-content;
    font-size: 18px;
    font-family: sans-serif;
    color: rgba(24, 1, 71, 1);
    background-color: rgba(224, 209, 255, 1);
    border-color:  transparent;
    border-radius: 4px;
  `;
    clientMessage.innerHTML += message;
    bubble.appendChild(clientMessage);
    chatMain.appendChild(bubble);
};

let websocket;
websocket = new WebSocket(wsUrl);
websocket.onopen = function (evt) {
    console.log("CONNECTED");
};
websocket.onclose = function (evt) {
    console.log("DISCONNECTED");
};
websocket.onmessage = function (evt) {
    console.log(evt.data)
    writeToChat(evt.data, "start");
};
websocket.onerror = function (evt) {
    writeToChat(
        '<span style="color: red;">ERROR:</span> ' + evt.data, "start"
    );
};

sendButton.addEventListener('click', () => {
    const message = input.value;
    writeToChat(message);
    websocket.send(message);
    input.value = " ";
});

const error = () => {
    WriteToChat('Невозможно получить ваше местоположение');
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let locationLink = `<a href="https://www.openstreetmap.org/#map=17/${latitude}/${longitude}" target="_blank">Ваша гео-локация</a>`
    writeToChat(locationLink)
}

locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        WriteToChat('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});