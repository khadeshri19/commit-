package com.commit.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * commit:// - Personal Developer Upgrade Tracker (Spring Boot API)
 * 
 * 💡 ARCHITECTURE OVERVIEW:
 * - Spring Boot 3.3.x on Java 21
 * - Spring Security with Stateless JWT Filter Chain
 * - Spring Data JPA with PostgreSQL / H2 Dev DB
 * - Layered Architecture: Controller -> Service -> Repository -> Entity
 */
@SpringBootApplication
public class CommitTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommitTrackerApplication.class, args);
        System.out.println("\n🚀 [commit://] Spring Boot API running on port 8080!\n");
    }
}
