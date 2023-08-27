const channelName = "private-location-channel";
const androidEvent = "client-android-location";
const webEvent = "client-web-location";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

// Add appKey and cluster for your account
const pusher = new Pusher("8790afb5e24f5aa48bd1", {
    channelAuthorization: {
        endpoint: "https://location-poc-server.vercel.app/pusher/auth",
    },
    cluster: "eu",
    forceTLS: true,
});

const channel = pusher.subscribe(channelName);

channel.bind(webEvent, function (data) {
    document.getElementById("messages").innerHTML +=
        "<div>[RECEIVED] [" +
        webEvent +
        "] received " +
        JSON.stringify(data) +
        "</div>";
});
function onActionClick() {
    var data = { data: "hello from web app" };
    var triggered = channel.trigger(androidEvent, data);
    var status = triggered ? "OK" : "FAIL";
    document.getElementById("messages").innerHTML +=
        "<div>[SENT] [" +
        androidEvent +
        "] send message " +
        JSON.stringify(data) +
        "</div>";
}

const notificationList = document.getElementById("notifications");
const notifications = [];

// channel.bind(webEvent, function (data) {
//     notifications.unshift(data);
//     renderNotifications();
// });

function renderNotifications() {
    notifications.forEach((message) => {
        const notification = document.createElement("li");
        notification.className = "notification";

        const channelElement = document.createElement("div");
        channelElement.textContent = message.Channel;

        const eventElement = document.createElement("div");
        eventElement.textContent = message.Event;

        const messageElement = document.createElement("div");
        messageElement.textContent = message.Message;

        const timeElement = document.createElement("div");
        timeElement.textContent = new Date().toLocaleString();

        notification.appendChild(channelElement);
        notification.appendChild(eventElement);
        notification.appendChild(messageElement);
        notification.appendChild(timeElement);

        notificationList.appendChild(notification);
    });
}
