
import { RxStompService } from "./Services/AdminCartera/rx-stomp.service";
import { MyRxStompConfig } from "./my-rx-stomp.config";

export function rxStompServiceFactory() {
    const rxStomp = new RxStompService();
    rxStomp.configure(MyRxStompConfig);
    rxStomp.activate();
    return rxStomp;
}