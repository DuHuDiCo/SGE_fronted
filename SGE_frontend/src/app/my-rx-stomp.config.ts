import { RxStompConfig } from "@stomp/rx-stomp";
import * as SockJS from "sockjs-client";




export const MyRxStompConfig: RxStompConfig = {
    webSocketFactory: () => new SockJS("http://192.168.1.241:8030/our-websocket"),
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 5000,
    debug: (msg: string): void => {
        console.log(new Date, msg);

    },

};