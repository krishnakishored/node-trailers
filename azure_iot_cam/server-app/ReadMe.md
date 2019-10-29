## DB Schema & Model Design 
- New Schema NoSQL
~~~sh 

    > db.users.find({})
      { "_id" : ObjectId("5d948d31cd9cc0b9de024720"), "user_role_id" : 1, "user_name" : "Srinath", "user_password" : "Srinath", "user_role_name" : "admin", "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de024721"), "user_role_id" : 2, "user_name" : "Kishore", "user_password" : "Kishore", "user_role_name" : "user", "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de024722"), "user_role_id" : 2, "user_name" : "Tarani", "user_password" : "Tarani", "user_role_name" : "user", "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de024723"), "user_role_id" : 1, "user_name" : "Amzad", "user_password" : "Amzad", "user_role_name" : "admin", "__v" : 0 }

  > db.cameras.find({})
      { "_id" : ObjectId("5d948d31cd9cc0b9de024729"), "camera_name" : "AICam01", "registered_cameragroup_name" : "Golconda", "ams_resources" : [ ], "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de02472a"), "camera_name" : "AICam02", "registered_cameragroup_name" : "Golconda", "ams_resources" : [ ], "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de02472b"), "camera_name" : "AICam03", "registered_cameragroup_name" : "Banjara Hills", "ams_resources" : [ ], "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de02472c"), "camera_name" : "AICam04", "registered_cameragroup_name" : "Hitec City", "ams_resources" : [ ], "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de02472d"), "camera_name" : "AICam05", "registered_cameragroup_name" : "Hitec City", "ams_resources" : [ ], "__v" : 0 }

  > db.cameragroups.find({})
      { "_id" : ObjectId("5d948d31cd9cc0b9de024724"), "cameragroup_name" : "Golconda", "registered_user_name" : "Srinath", "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de024725"), "cameragroup_name" : "Banjara Hills", "registered_user_name" : "Srinath", "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de024726"), "cameragroup_name" : "Hitec City", "registered_user_name" : "Kishore", "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de024727"), "cameragroup_name" : "KPHB", "registered_user_name" : "Tarani", "__v" : 0 }
      { "_id" : ObjectId("5d948d31cd9cc0b9de024728"), "cameragroup_name" : "Miyapur", "registered_user_name" : "Tarani", "__v" : 0 }
~~~

- Accessing MongoDB via docker container shell    
  * Get a shell to the container  - `$ docker exec -it mongodb bash`
    ~~~sh
      root@079cc36528d2: mongo
        MongoDB shell version v4.2.0
        connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
        .....
      > show dbs
          AzureAICamera  0.000GB
          admin          0.000GB
          config         0.000GB
          local          0.000GB
      > use AzureAICamera
      > show collections
          ams
          cameras
          users
      #CRUD operations
      > db.cameras.deleteMany({})
          { "acknowledged" : true, "deletedCount" : 4 }

    ~~~

- Old Schema using SQL

$ 5g360vrDB=# select * from cameras;
 camera_id |                camera_name                 | camera_source | camera_group |           createdAt           |           updatedAt
-----------+--------------------------------------------+---------------+--------------+-------------------------------+-------------------------------
        66 | TS09-TR-56                                 |               |            5 | 2019-06-24 17:19:38+05:30     | 2019-07-18 16:24:29.953+05:30
        58 | testcamera                                 |               |           73 | 2019-06-19 12:40:17.248+05:30 | 2019-06-19 12:40:17.248+05:30
         8 | zccvd                                      |               |            2 | 2019-06-13 15:22:20.406+05:30 | 2019-06-13 15:22:20.406+05:30
         9 | Test123                                    |               |            2 | 2019-06-13 16:40:41.908+05:30 | 2019-06-13 16:40:41.908+05:30
        17 | Ravindranath                               |               |            2 | 2019-06-17 14:34:03.655+05:30 | 2019-06-17 14:34:03.655+05:30
        18 | Ravndranath chowdary                       |               |            2 | 2019-06-17 14:34:53.109+05:30 | 2019-06-17 14:34:53.109+05:30
        19 | Elate International School                 |               |            2 | 2019-06-17 14:55:24.778+05:30 | 2019-06-17 14:55:24.778+05:30
        21 | school-class1-testing                      |               |            2 | 2019-06-17 14:58:03.366+05:30 | 2019-06-17 14:59:43.27+05:30
        20 | Kinder Kare International School -kondapur |               |            2 | 2019-06-17 14:55:51.66+05:30  | 2019-06-17 14:59:59.335+05:30
         7 | Garden-1                                   |               |            2 | 2019-06-13 15:22:05.49+05:30  | 2019-06-17 15:00:16.427+05:30
        69 | Green Room                                 |               |           84 | 2019-06-28 12:43:09.593+05:30 | 2019-06-28 12:43:09.593+05:30
        71 | Inception                                  |               |           86 | 2019-07-04 14:43:31.304+05:30 | 2019-07-04 14:43:31.304+05:30
        48 | TS07777                                    |               |            5 | 2019-06-19 11:38:33.583+05:30 | 2019-06-19 11:38:33.583+05:30
        49 | TS08-TR-11                                 |               |            5 | 2019-06-19 11:38:48.882+05:30 | 2019-06-19 11:38:48.882+05:30
         6 | TS-02-1112                                 |               |            3 | 2019-06-12 18:18:31.302+05:30 | 2019-06-19 11:39:10.301+05:30
        12 | TS-03-0220                                 |               |            3 | 2019-06-14 11:29:43.558+05:30 | 2019-06-19 11:39:34.602+05:30
        47 | KA-02-0220                                 |               |            3 | 2019-06-18 17:47:25.68+05:30  | 2019-06-19 11:39:46.421+05:30
        46 | MH-1000                                    |               |            3 | 2019-06-17 18:22:33.542+05:30 | 2019-06-19 11:39:57.918+05:30
        50 | AP-02-2001                                 |               |            3 | 2019-06-19 11:40:09.845+05:30 | 2019-06-19 11:40:09.845+05:30
        91 | 360Video                                   |               |          124 | 2019-07-18 12:06:36.945+05:30 | 2019-07-18 12:06:36.945+05:30
        92 | AzurePromo                                 |               |          124 | 2019-07-18 12:06:48.087+05:30 | 2019-07-18 12:06:48.087+05:30
(21 rows)


$ 5g360vrDB=# select * from cameragroups;
 cameragroup_id | cameragroup_name |           createdAt           |           updatedAt
----------------+------------------+-------------------------------+-------------------------------
            124 | AzureVideos      | 2019-07-18 12:05:58.737+05:30 | 2019-07-18 12:05:58.737+05:30
              3 | Uber-Madhapur    | 2019-06-12 17:50:37.457+05:30 | 2019-06-19 11:37:39.664+05:30
              5 | Uber-Kondapur    | 2019-06-13 17:04:51.044+05:30 | 2019-06-19 11:38:00.142+05:30
(3 rows)


$ 5g360vrDB=# select * from camerausers;
 id  | user_id | camera_id | camera_groupid |           createdAt           |           updatedAt
-----+---------+-----------+----------------+-------------------------------+-------------------------------
  41 |       5 |        57 |              3 | 2019-07-10 17:15:08.147+05:30 | 2019-07-11 16:35:09.546+05:30
  65 |       2 |        88 |            120 | 2019-07-11 15:23:17.961+05:30 | 2019-07-11 15:23:17.961+05:30
   5 |       1 |         8 |              2 | 2019-07-03 12:13:38.892+05:30 | 2019-07-03 12:13:38.892+05:30
   6 |       2 |         8 |              2 | 2019-07-03 12:13:38.965+05:30 | 2019-07-03 12:13:38.965+05:30
 108 |       5 |        92 |            124 | 2019-07-22 11:30:07.765+05:30 | 2019-07-22 11:30:07.765+05:30
 110 |       5 |        47 |              3 | 2019-07-22 11:30:42.853+05:30 | 2019-07-22 11:30:42.853+05:30
 112 |       2 |        91 |            124 | 2019-07-22 11:35:30.821+05:30 | 2019-07-22 11:35:30.821+05:30
  16 |       1 |        65 |             81 | 2019-07-04 15:18:57.846+05:30 | 2019-07-04 15:18:57.846+05:30
 115 |       2 |         6 |              3 | 2019-07-22 11:36:19.182+05:30 | 2019-07-22 17:25:04.796+05:30
 117 |       2 |        12 |              3 | 2019-07-22 15:22:39.093+05:30 | 2019-07-22 17:25:08.552+05:30
 120 |       5 |        66 |              5 | 2019-07-26 14:54:36.69+05:30  | 2019-07-26 14:54:36.69+05:30
 122 |       5 |        46 |              3 | 2019-07-26 14:56:07.338+05:30 | 2019-07-26 14:56:07.338+05:30
 123 |       5 |        49 |              5 | 2019-07-26 15:11:55.834+05:30 | 2019-07-26 15:11:55.834+05:30
 125 |       5 |        50 |              3 | 2019-07-26 15:13:19.819+05:30 | 2019-07-26 15:13:19.819+05:30
 127 |       1 |        48 |              5 | 2019-08-12 11:22:26.054+05:30 | 2019-08-12 11:22:26.054+05:30
  27 |       5 |        60 |              3 | 2019-07-04 15:59:08.559+05:30 | 2019-07-04 15:59:08.561+05:30
  29 |       2 |        60 |              3 | 2019-07-04 15:59:08.632+05:30 | 2019-07-04 15:59:08.641+05:30
   9 |       6 |        70 |             80 | 2019-07-03 15:54:54.473+05:30 | 2019-07-04 17:20:54.95+05:30
  10 |       2 |        70 |             80 | 2019-07-03 15:54:54.635+05:30 | 2019-07-04 17:20:54.981+05:30
  33 |       4 |        70 |             80 | 2019-07-04 17:20:55.031+05:30 | 2019-07-04 17:20:55.031+05:30
  34 |       5 |        72 |            112 | 2019-07-09 11:56:17.565+05:30 | 2019-07-09 11:56:17.565+05:30
   1 |       3 |        59 |              5 | 2019-07-02 18:50:36.449+05:30 | 2019-07-10 17:08:21.922+05:30
  89 |       2 |        84 |            112 | 2019-07-11 15:37:18.191+05:30 | 2019-07-11 15:37:18.191+05:30
  43 |       3 |        90 |            116 | 2019-07-11 15:13:41.617+05:30 | 2019-07-11 16:34:51.394+05:30
  44 |       4 |        90 |            116 | 2019-07-11 15:13:41.667+05:30 | 2019-07-11 16:34:51.463+05:30
  45 |       6 |        90 |            116 | 2019-07-11 15:13:41.721+05:30 | 2019-07-11 16:34:51.512+05:30
  46 |       5 |        90 |            116 | 2019-07-11 15:13:41.772+05:30 | 2019-07-11 16:34:51.562+05:30
  47 |       1 |        90 |            116 | 2019-07-11 15:13:41.826+05:30 | 2019-07-11 16:34:51.614+05:30
  39 |       5 |        61 |              3 | 2019-07-10 17:12:55.201+05:30 | 2019-07-11 16:35:03.393+05:30
(29 rows)


$ 5g360vrDB=# select * from users;
 user_id | user_name | user_pwd | user_role |            createdAt             |            updatedAt
---------+-----------+----------+-----------+----------------------------------+----------------------------------
       1 | Amzad     | Amzad    |         1 | 2019-06-12 10:45:44.715+05:30    | 2019-06-12 10:45:44.715+05:30
       2 | Vasavi    | Vasavi   |         2 | 2019-06-12 10:45:44.715+05:30    | 2019-06-12 10:45:44.715+05:30
       3 | Uber      | Uber     |         1 | 2019-06-25 12:30:11.210596+05:30 | 2019-06-25 12:30:11.210596+05:30
       4 | Divya     | Divya    |         2 | 2019-06-25 12:31:17.122391+05:30 | 2019-06-25 12:31:17.122391+05:30
       6 | Narasimha | Rao      |         2 | 2019-06-25 12:32:30.354895+05:30 | 2019-06-25 12:32:30.354895+05:30
       5 | Priyanka  | Priyanka |         2 | 2019-06-25 12:31:47.434611+05:30 | 2019-07-08 16:05:58.69+05:30
(6 rows)


## Feature Implementation
1. Admin(Role)
    - will have access to all cameras
    - he can share the access to a camera to a User(Role)
    - Add a new camera
    - Add a new camera group

## Tasks to Implement
1. Login - Admin/normal user

1. Login
    - GET Vs POST - to confirm
    - 
1. Roles 
      1.Admin
      1.User
      1. No UI to create a user- either do it from db shell or a script

1. Only Admin can access - CameraUsers, Users, cameragroups, cameras - tables      

1. CameraUsers can be accessed only by admin
    - Admin can
      1.add cameragroup
      2.add camera device
      3.Assign a camera to a user

1. auth middleware in express to restrict the db access to normal users 

 
## Routes


1. Routes
    
    - Admin
      - GET
        - list of all cameragroups
        - list of all cameras
        - list of all users
      - POST 
        - login
        - Add user,
        - Add group, 
        - Add camera 
        
    - User (end-user)
      - POST 
          - login
          - to receive a streaming url for a selected camera
      - GET 
        <!-- - list of groups -->
        - list of cameras
      
        
      

1. Controllers
    - Registering a camera
        - Create AMS - liveEvent, 
        - start liveevent, 
        - getLiveEvent 
        - receive ingest url & preview url which will be saved to the db
        - stop the live event.

    - when a livestream is requested for a camera
      - send the ingest url to device
      - start live event, 
      - create live output,
      - create an asset, 
      - get streaming url


# References
1. Best practices for docker-node-app: https://github.com/BretFisher/node-docker-good-defaults
1. https://mongoosejs.com/docs/populate.html#populate-virtuals
1. https://mongoosejs.com/docs/guide.html#id