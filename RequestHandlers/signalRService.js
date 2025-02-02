import * as signalR from "@microsoft/signalr";


const produrl = "https://wrtserver-latest.onrender.com/wrtHub";

class SignalRService {
    constructor() {
        if (SignalRService.instance) {
            return SignalRService.instance;
        }
        SignalRService.instance = this;

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(produrl, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .build();

        this.isConnected = false;
        this.isConnecting = false;
    }

    async startConnection() {
        if (this.isConnected) return;
        if (this.isConnecting) return;

        this.isConnecting = true;
        try {
            await this.connection.start();
            this.isConnected = true;
            console.log("Connected to SignalR Hub");
        } catch (error) {
            console.error("Connection error:", error);
            throw error;
        } finally {
            this.isConnecting = false;
        }
    }


}

const instance = new SignalRService();
export default instance;