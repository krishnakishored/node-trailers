# docker run -d -p 27017:27107 -v ~/data:/data/db mongo
docker container run -d \
    -v ~/ai_camera_db:/data/db \
    -p 27017-27019:27017-27019  \
    --rm --name mongodb mongo