FROM openjdk:17-jdk-slim
ARG JAR_FILE=build/libs/ss-be-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} ss-be-0.0.1-SNAPSHOT.jar
COPY /src/main/resources/keystore.p12 /usr/local/ssl/keystore.p12
ENTRYPOINT ["java","-jar","ss-be-0.0.1-SNAPSHOT.jar"]