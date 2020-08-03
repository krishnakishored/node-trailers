ARG BASE_IMAGE=dev-docker-virtual.artifactory.comtech-idn.com/comtechtel/foundations/services/base:0.0.2.0

FROM $BASE_IMAGE

RUN apk add --no-cache libstdc++ nodejs-current npm

COPY . /usr/local/gatekeeper
WORKDIR /usr/local/gatekeeper
RUN npm install \
  && npm build

# COPY config/config.ini.hcl /etc/consul-template/conf.d/
# COPY config/config.ini.ctmpl /etc/consul-template/templates/

ENV SERVICE_NAME=gatekeeper \
    SERVICE_PORT=12345 \
    SERVICE_CHECK="/usr/bin/curl -fso /dev/null http://localhost:12345"

CMD ["npm", "start"]
