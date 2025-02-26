package com.elkhanabbasov.watchshop.service;

import com.elkhanabbasov.watchshop.model.Watch;
import com.elkhanabbasov.watchshop.repository.WatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchService {

    private final WatchRepository watchRepository;

    public WatchService(WatchRepository watchRepository) {
        this.watchRepository = watchRepository;
    }

    public List<Watch> getAllWatches() {
        return watchRepository.findAll();
    }

    public Watch getWatchById(int id) {
        return watchRepository.findById(id).orElse(null);
    }

    public Watch addWatch(Watch watch) {
        return watchRepository.save(watch);
    }

    public void deleteWatch(int id) {
        watchRepository.deleteById(id);
    }
}
