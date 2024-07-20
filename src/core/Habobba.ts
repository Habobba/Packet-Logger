import { Room } from "./room/Room";
import { UserInfo } from "./UserInfo";


export class Habobba {

    static room = new Room();
    static userInfo: UserInfo = new UserInfo(0, '', '');

}