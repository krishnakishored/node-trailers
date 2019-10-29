FROM arm32v7/node:8-slim

#create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Pass the required parameters via env
# a default value
ENV DEVICE_CONNECTION_STRING=HostName=AI-CAMERA-NEW.azure-devices.net;DeviceId=MSIoT0DBA07;SharedAccessKey=hOefyLBgIOe2j8WZU4OJN5XQpoU/ye3YwkI2fs/+UDA=

# By default, Docker runs container as root which inside of the container can pose as a security issue. 
# The node images provide the 'node' user for such purpose. 
USER node

CMD ["node", "index.js"]
