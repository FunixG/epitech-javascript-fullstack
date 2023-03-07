import User from "../../user/entities/user.entity";

export default class UserWebsocketEntity {
    clientSocketId: string;
    user: User;
}
