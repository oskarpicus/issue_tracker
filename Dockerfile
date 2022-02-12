FROM gradle:7.4-jdk17 AS build

WORKDIR /buildApp
COPY . .
RUN gradle test
RUN cd Server
RUN gradle build --no-daemon

FROM registry.access.redhat.com/ubi8/openjdk-17-runtime:1.10-6

EXPOSE 8080

USER root

RUN mkdir /app

COPY --from=build /buildApp/Server/build/libs/*.jar /app/backend.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "/app/backend.jar"]
