import {DataSource} from "typeorm";
import User from "./src/user/entities/user.entity";
import Product from "./src/products/entities/product.entity";

export default new DataSource({
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'js_fullstack_docker',
    entities: [User, Product],
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
});
