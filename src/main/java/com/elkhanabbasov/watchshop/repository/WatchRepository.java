package com.elkhanabbasov.watchshop.repository;

import com.elkhanabbasov.watchshop.model.Watch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchRepository extends JpaRepository<Watch, Integer> {
}

