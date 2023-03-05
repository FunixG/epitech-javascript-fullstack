import {DataSource} from "typeorm";
import User from "./src/user/entities/user.entity";

export default new DataSource({
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'js_fullstack_docker',
    entities: [User],
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
});
