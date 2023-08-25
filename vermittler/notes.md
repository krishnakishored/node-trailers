## List of features implemented
1. Custom logger - try bunyan
1. Middlewares  
    - security headers
    - request & response logging
    - response time
1. Database - Postgresql
    - Indexing
    - Full Text search    
1. use ORM - `sequelize` &  `sequelize-cli` to migrate & seed the data
    - update the config file to config.js to read from env variables
    - update `.sequelizerc`  to execute the sequelize cmds from any folder
    ```sh 
        # @~/coding/js_coding/backend/node-trailers/vermittler/database
        $ npx sequelize --help
        $ npx sequelize init
        $ npx sequelize-cli --version
    ```
    - `Creating the first Model (and Migration)`
    ```sh
       # @ ~/coding/js_coding/backend/node-trailers/vermittler
       # This will:
        # - Create a model file user in models folder;
        # - Create a migration file with name like XXXXXXXXXXXXXX-create-user.js in migrations folder.
       $ npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
       # 
       $ npx sequelize-cli model:generate --name Artist --attributes name:string,slug:string --force 
       # db:migrate will create the table in the database
       $ npx sequelize-cli db:migrate
       # db migrate specific migration
       $ npx sequelize-cli db:migrate --name 20230821084444-create-artist
       # undo the last migration
       $ npx sequelize-cli db:migrate:undo 
       # undo the specific migration
       $ npx sequelize-cli db:migrate:undo --name 20230817052134-create-user
       # This will create xxx-migration-skeleton.js in your migration folder
       $ npx sequelize-cli migration:generate --name <name_of_your_migration>

    ```
    - `Creating the first Seed`
    ```sh
        $ npx sequelize-cli seed:generate --name demo-user
        # This will create a seed file with name like XXXXXXXXXXXXXX-demo-user.js in seeders folder.
    ```
     - Edit the seed file to insert a demo user
     ```sh
        # to run the seeds - commits to db
        $ npx sequelize-cli db:seed:all
        # to undo the seeds all, specific, most-recent
        $ npx sequelize-cli db:seed:undo:all
        $ npx sequelize-cli db:seed:undo --seed <name-of-seed-as-in-data>
        $ npx sequelize-cli db:seed:undo --seed 20230817052308-demo-user.js
        $ npx sequelize-cli db:seed --seed 20230817062507-demo-artist.js
     ```
    - (TODO) use `queryInterface.sequelize.transaction` in migrations
    - Seeds
    - Migrations

1. Cache - Redis
1. Rate limiting
1. Authentication - jwt token
1. Authorization 
1. Unit tests
    - use of Mocha Framework
1. serve static files
1. template html
1. cookies & sessions
1. Docker
1. pm2 - use process manager to 
```sh
    # @~/cd
    $ pm2 reload ./ecosystem.config.js --only vermittler
    $ pm2 logs vermittler
    $ pm2 monit vermittler
    $ pm2 stop vermittler
```
1. eslint - linting
1. dotenv - environment variables
1. Clean architecture 
    - folder structure
    ```
       src/
        ├── app/
        │   ├── controllers/
        │   │   ├── blogPostController.js
        │   │   └── userController.js
        │   ├── middlewares/
        │   │   ├── authMiddleware.js
        │   │   └── errorMiddleware.js
        │   ├── routes/
        │   │   ├── blogPostRoutes.js
        │   │   └── userRoutes.js
        │   └── views/
        ├── config/
        │   ├── config.js
        │   └── database.js
        ├── core/
        │   ├── models/
        │   │   ├── BlogPost.js
        │   │   └── User.js
        │   ├── repositories/
        │   │   ├── BlogPostRepository.js
        │   │   └── UserRepository.js
        │   ├── services/
        │   │   ├── AuthService.js
        │   │   ├── BlogPostService.js
        │   │   └── UserService.js
        │   └── usecases/
        │       ├── AuthUseCases.js
        │       ├── BlogPostUseCases.js
        │       └── UserUseCases.js
        ├── database/
        │   ├── migrations/
        │   │   ├── 20220101000001-create-blog-post.js
        │   │   └── 20220101000002-create-user.js
        │   └── seeds/
        │       ├── 01-blog-posts.js
        │       └── 02-users.js
        └── interfaces/
            ├── http/
            │   ├── app.js
            │   └── server.js
            └── persistence/
                ├── BlogPostRepositoryImpl.js
                └── UserRepositoryImpl.js

    ```

    - Call flow in an clean architecture
```mermaid
    sequenceDiagram
        participant Client as Client
        participant Routes as Routes
        participant Controller as Controller
        participant UseCase as UseCase
        participant Service as Service
        participant Repository as Repository
        participant Model as Model

        Note over Client: Initiates request based on user action
        Note over Routes: Matches the request URL and method
        Note over Controller: Orchestrates request and response handling
        Note over UseCase: Encapsulates specific business logic
        Note over Service: Performs generic business operations
        Note over Repository: Interacts with the database or data source
        Note over Model: Represents the structure of the data

        Client->>Routes: Sends request to specific route
        activate Routes
        Routes->>Controller: Directs request to associated controller
        activate Controller
        Controller->>UseCase: Invokes specific use case
        activate UseCase
        UseCase->>Service: Calls service for business operations
        activate Service
        Service->>Repository: Uses repository for DB interaction
        activate Repository
        Repository->>Model: Uses model to fetch/structure data
        activate Model
        Model-->>Repository: Returns structured data
        deactivate Model
        Repository-->>Service: Returns data/result
        deactivate Repository
        Service-->>UseCase: Returns operational result
        deactivate Service
        UseCase-->>Controller: Returns final use case outcome
        deactivate UseCase
        Controller-->>Routes: Sends back the processed result
        deactivate Controller
        Routes-->>Client: Delivers final response
        deactivate Routes    
```



### References
1. sequelize-cli 
    - https://sequelize.org/master/manual/migrations.html
    - https://youtu.be/M09nsCa4_Bk
    - https://youtu.be/4SySDaX753A
    - https://youtu.be/ikJ5AXDj3go
1. Sequelize
    - https://sequelize.org/docs/v6/category/core-concepts/
1. pm2 
    - https://pm2.keymetrics.io/docs/usage/quick-start/