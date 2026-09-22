package com.commit.tracker.commits;

import com.commit.tracker.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

/**
 * Business logic service for daily commits, streak mathematics, and track velocity.
 * 
 * 🎓 LEARNING GUIDE & TODOs:
 * - @Transactional ensures database writes are atomic.
 * - Streak calculation handles both today's active commit and yesterday's grace window.
 */
@Service
public class CommitService {

    private final CommitRepository commitRepository;

    public CommitService(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    @Transactional(readOnly = true)
    public List<CommitLog> getUserCommits(User user) {
        return commitRepository.findByUserOrderByDateDescCreatedAtDesc(user);
    }

    @Transactional
    public CommitLog createCommit(User user, String message, Set<Track> tracks, Integer minutes, CommitStatus status, LocalDate date) {
        CommitLog commitLog = new CommitLog(
                user,
                message,
                tracks != null && !tracks.isEmpty() ? tracks : Set.of(Track.DSA),
                minutes != null ? minutes : 60,
                status != null ? status : CommitStatus.MERGED,
                date != null ? date : LocalDate.now()
        );
        return commitRepository.save(commitLog);
    }

    @Transactional
    public void deleteCommit(User user, Long commitId) {
        CommitLog commit = commitRepository.findById(commitId)
                .filter(c -> c.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Commit log not found"));
        commitRepository.delete(commit);
    }

    /**
     * Calculates current consecutive daily streak and historical metrics.
     * 
     * TODO [LEARNING]: Try implementing alternative streak policies 
     * (e.g., weekend freeze allowances or minimum minutes threshold per day).
     */
    @Transactional(readOnly = true)
    public Map<String, Object> calculateStreakStats(User user) {
        List<LocalDate> distinctDates = commitRepository.findDistinctCommitDatesByUser(user);
        List<CommitLog> allCommits = commitRepository.findByUserOrderByDateDescCreatedAtDesc(user);

        int currentStreak = 0;
        int longestStreak = 0;
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        if (!distinctDates.isEmpty()) {
            LocalDate firstDate = distinctDates.get(0);
            
            // Check if streak is currently active (commit logged today or yesterday)
            if (firstDate.equals(today) || firstDate.equals(yesterday)) {
                LocalDate expectedDate = firstDate;
                for (LocalDate date : distinctDates) {
                    if (date.equals(expectedDate)) {
                        currentStreak++;
                        expectedDate = expectedDate.minusDays(1);
                    } else {
                        break;
                    }
                }
            }

            // Longest streak calculation
            int runningCount = 0;
            for (int i = 0; i < distinctDates.size(); i++) {
                if (i == 0) {
                    runningCount = 1;
                } else {
                    long diff = ChronoUnit.DAYS.between(distinctDates.get(i), distinctDates.get(i - 1));
                    if (diff == 1) {
                        runningCount++;
                    } else {
                        runningCount = 1;
                    }
                }
                if (runningCount > longestStreak) longestStreak = runningCount;
            }
        }

        // Calculate hours per track
        Map<Track, Double> trackHours = new EnumMap<>(Track.class);
        for (Track t : Track.values()) trackHours.put(t, 0.0);
        
        long totalMinutes = 0;
        for (CommitLog log : allCommits) {
            int mins = log.getMinutesSpent() != null ? log.getMinutesSpent() : 0;
            totalMinutes += mins;
            if (log.getTracks() != null && !log.getTracks().isEmpty()) {
                double share = (double) mins / log.getTracks().size();
                for (Track t : log.getTracks()) {
                    trackHours.put(t, trackHours.get(t) + (share / 60.0));
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("currentStreak", currentStreak);
        result.put("longestStreak", Math.max(longestStreak, currentStreak));
        result.put("totalCommits", allCommits.size());
        result.put("totalHours", Math.round((totalMinutes / 60.0) * 10.0) / 10.0);
        result.put("trackHours", trackHours);
        result.put("activeDays", distinctDates.size());

        return result;
    }
}
