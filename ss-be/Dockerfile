FROM openjdk:17-jdk-slim
ARG JAR_FILE=build/libs/ss-be-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} ss-be-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","ss-be-0.0.1-SNAPSHOT.jar"]