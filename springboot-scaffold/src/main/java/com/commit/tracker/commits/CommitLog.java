package com.commit.tracker.commits;

import com.commit.tracker.user.User;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * CommitLog Entity:
 * Represents an individual daily study session modeled after a Git commit.
 */
@Entity
@Table(name = "commit_logs")
public class CommitLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 12)
    private String commitHash;

    @Column(nullable = false, length = 1000)
    private String commitMessage;

    @ElementCollection(targetClass = Track.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "commit_tracks", joinColumns = @JoinColumn(name = "commit_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "track_name")
    private Set<Track> tracks = new HashSet<>();

    private Integer minutesSpent;

    @Enumerated(EnumType.STRING)
    private CommitStatus status;

    @Column(nullable = false)
    private LocalDate date;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public CommitLog() {
        this.commitHash = UUID.randomUUID().toString().substring(0, 7);
        this.createdAt = LocalDateTime.now();
        this.date = LocalDate.now();
        this.status = CommitStatus.MERGED;
    }

    public CommitLog(User user, String commitMessage, Set<Track> tracks, Integer minutesSpent, CommitStatus status, LocalDate date) {
        this();
        this.user = user;
        this.commitMessage = commitMessage;
        this.tracks = tracks;
        this.minutesSpent = minutesSpent;
        this.status = status != null ? status : CommitStatus.MERGED;
        this.date = date != null ? date : LocalDate.now();
    }

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCommitHash() { return commitHash; }
    public void setCommitHash(String commitHash) { this.commitHash = commitHash; }
    public String getCommitMessage() { return commitMessage; }
    public void setCommitMessage(String commitMessage) { this.commitMessage = commitMessage; }
    public Set<Track> getTracks() { return tracks; }
    public void setTracks(Set<Track> tracks) { this.tracks = tracks; }
    public Integer getMinutesSpent() { return minutesSpent; }
    public void setMinutesSpent(Integer minutesSpent) { this.minutesSpent = minutesSpent; }
    public CommitStatus getStatus() { return status; }
    public void setStatus(CommitStatus status) { this.status = status; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
