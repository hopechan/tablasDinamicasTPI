FROM payara/micro:5.181
MAINTAINER rm13016 rm13016@ues.edu.sv
ADD  SistemaTPI135-web-1.0-SNAPSHOT.war $PAYARA_PATH/deployments/SistemaTPI135-web-1.0-SNAPSHOT.war
ADD mysql-connector-java-5.1.22-bin.jar $PAYARA_PATH
ADD postbootfile.txt $PAYARA_PATH
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://marmatenimiento:3306/ping" , "||", "exit 1"]
ENTRYPOINT java -jar $PAYARA_PATH/payara-micro.jar --addlibs $PAYARA_PATH/mysql-connector-java-5.1.22-bin.jar  --postbootcommandfile $PAYARA_PATH/postbootfile.txt --deploy $PAYARA_PATH/deployments/SistemaTPI135-web-1.0-SNAPSHOT.war

