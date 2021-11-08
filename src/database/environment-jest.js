const NodeEnvironment = require("jest-environment-node");
const path = require("path");
const appRoot = require("app-root-path");

const { createConnection, getConnection } = require("typeorm");


require("dotenv").config({
  path: appRoot.resolve(".env.test"),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);   

    
    const dbconfig = {
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [process.env.TYPEORM_ENTITIES],
      migrations: [process.env.TYPEORM_MIGRATIONS],
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
      logging: process.env.TYPEORM_logging,
      synchronize: process.env.TYPEORM_synchronize
    }
    new Promise(function(resolve, reject) {
      createConnection(dbconfig)
    })
  }

  async setup() {
    
  }

  async teardown() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    await getConnection().close();
  }
}

module.exports = CustomEnvironment;
