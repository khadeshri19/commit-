package com.commit.tracker.user;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

/**
 * User Entity for multi-account authentication.
 * Implements Spring Security's UserDetails interface for seamless integration.
 */
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String targetRole;

    private LocalDate sprintStartDate;

    private LocalDateTime createdAt;

    public User() {
        this.createdAt = LocalDateTime.now();
        this.sprintStartDate = LocalDate.now();
    }

    public User(String email, String username, String password, String targetRole) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.targetRole = targetRole;
        this.sprintStartDate = LocalDate.now();
        this.createdAt = LocalDateTime.now();
    }

    // --- UserDetails Overrides ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email; // Spring Security uses email as username identifier
    }

    public String getDisplayName() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    public LocalDate getSprintStartDate() { return sprintStartDate; }
    public void setSprintStartDate(LocalDate sprintStartDate) { this.sprintStartDate = sprintStartDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
