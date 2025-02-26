package com.elkhanabbasov.watchshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.elkhanabbasov.watchshop")
public class WatchshopApplication {
    public static void main(String[] args) {
        SpringApplication.run(WatchshopApplication.class, args);
    }
}

