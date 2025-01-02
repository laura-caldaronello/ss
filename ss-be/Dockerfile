# Use openjdk base image
FROM openjdk:17-jdk-slim

# Install necessary dependencies (Gradle or Maven, depending on your project build tool)
# For example, assuming you are using Gradle:
RUN apt-get update && \
    apt-get install -y curl unzip && \
    curl -sSL https://github.com/gradle/gradle/releases/download/v7.4.2/gradle-7.4.2-bin.zip -o gradle.zip && \
    unzip gradle.zip -d /opt && \
    ln -s /opt/gradle-7.4.2/bin/gradle /usr/local/bin/gradle && \
    rm gradle.zip

# Set working directory to your project folder (adjust if needed)
WORKDIR /app

# Copy the entire project into the Docker image (including build.gradle if using Gradle)
COPY . .

# Build your project
RUN gradle build

# Copy the JAR file (assuming it's built inside the 'build/libs' directory)
ARG JAR_FILE=build/libs/ss-be-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} ss-be-0.0.1-SNAPSHOT.jar

# Copy the keystore file
COPY /src/main/resources/keystore.p12 /usr/local/ssl/keystore.p12

# Expose MongoDB data directory (for later mounting a volume)
VOLUME /data/db

# Set the entrypoint to run your app
ENTRYPOINT ["java", "-jar", "ss-be-0.0.1-SNAPSHOT.jar"]
