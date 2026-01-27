
# Build Stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY abnaouna-backend/pom.xml .
COPY abnaouna-backend/src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM openjdk:17-jdk-slim
COPY --from=build /app/target/abnaouna-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 7860
ENTRYPOINT ["java","-jar","app.jar"]
