package controllers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        new ClassPathXmlApplicationContext("classpath:spring.xml");
        SpringApplication.run(Main.class, args);
    }
}
