
import {DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "postgres" ,
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "secretpassword",
    database: "postgres",
    entities: ["src/app/models/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    

})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })