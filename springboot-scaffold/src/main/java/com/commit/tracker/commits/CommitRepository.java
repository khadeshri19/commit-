package com.commit.tracker.commits;

import com.commit.tracker.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CommitRepository extends JpaRepository<CommitLog, Long> {

    List<CommitLog> findByUserOrderByDateDescCreatedAtDesc(User user);

    List<CommitLog> findByUserAndDateBetweenOrderByDateDesc(User user, LocalDate startDate, LocalDate endDate);

    // Custom query to count distinct active days for streak calculation
    @Query("SELECT DISTINCT c.date FROM CommitLog c WHERE c.user = :user ORDER BY c.date DESC")
    List<LocalDate> findDistinctCommitDatesByUser(@Param("user") User user);
}
