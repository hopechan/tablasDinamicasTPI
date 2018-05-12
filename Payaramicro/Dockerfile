FROM openjdk:8-jdk-alpine
MAINTAINER Esperanza Dueñas <da13002@ues.edu.sv>
ENV PAYARA_PATH /opt/payara

RUN   apk update \                                                                                                                                                                                                                        
 &&   apk add ca-certificates wget \                                                                                                                                                                                                      
 &&   update-ca-certificates && \
 mkdir -p $PAYARA_PATH/deployments && \
 adduser -D -h $PAYARA_PATH payara && echo payara:payara | chpasswd && \
 chown -R payara:payara /opt

RUN apk -U add openssl

ENV VERSION v0.3.0
ENV DOWNLOAD_URL https://github.com/jwilder/dockerize/releases/download/$VERSION/dockerize-alpine-linux-amd64-$VERSION.tar.gz

RUN wget -qO- $DOWNLOAD_URL | tar xvz -C /usr/local/bin

ENV PAYARA_PKG https://s3-eu-west-1.amazonaws.com/payara.fish/payara-5-micro-prerelease.jar
ENV PAYARA_VERSION prerelease
ENV PKG_FILE_NAME payara-micro.jar

RUN wget --quiet -O $PAYARA_PATH/$PKG_FILE_NAME $PAYARA_PKG

ENV DEPLOY_DIR $PAYARA_PATH/deployments
ENV AUTODEPLOY_DIR $PAYARA_PATH/deployments
ENV PAYARA_MICRO_JAR=$PAYARA_PATH/$PKG_FILE_NAME

# Default payara ports to expose
EXPOSE 4848 8009 8080 8181

USER payara
WORKDIR $PAYARA_PATH
ADD  SistemaTPI135-web-1.0-SNAPSHOT.war $PAYARA_PATH/deployments/SistemaTPI135-web-1.0-SNAPSHOT.war
ADD mysql-connector-java-5.1.22-bin.jar $PAYARA_PATH
ADD postbootfile.txt $PAYARA_PATH
ENTRYPOINT java -jar $PAYARA_PATH/payara-micro.jar --addlibs $PAYARA_PATH/mysql-connector-java-5.1.22-bin.jar  --postbootcommandfile $PAYARA_PATH/postbootfile.txt --deploy $PAYARA_PATH/deployments/SistemaTPI135-web-1.0-SNAPSHOT.war

