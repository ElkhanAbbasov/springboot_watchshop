FROM openjdk:17-jdk-slim

# Set work directory inside the container
WORKDIR /app

COPY target/watchshop-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
