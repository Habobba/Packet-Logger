import { Room } from "./habbo/room/Room";
import { UserInfo } from "./habbo/user/UserInfo";


export class Habobba {

    static room = new Room();
    static userInfo: UserInfo = new UserInfo(0, '', '');

}