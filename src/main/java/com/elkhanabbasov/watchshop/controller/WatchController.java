package com.elkhanabbasov.watchshop.controller;

import com.elkhanabbasov.watchshop.model.Watch;
import com.elkhanabbasov.watchshop.service.WatchService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/watches")  //Base
public class WatchController {

    private final WatchService watchService;

    public WatchController(WatchService watchService) {
        this.watchService = watchService;
    }

    @GetMapping
    public ResponseEntity<List<Watch>> getAllWatches() {
        return ResponseEntity.ok(watchService.getAllWatches());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Watch> getWatchById(@PathVariable int id) {
        Watch watch = watchService.getWatchById(id);
        return (watch != null) ? ResponseEntity.ok(watch) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Watch> addWatch(@RequestBody Watch watch) {
        Watch savedWatch = watchService.addWatch(watch);
        return ResponseEntity.ok(savedWatch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWatch(@PathVariable int id) {
        watchService.deleteWatch(id);
        return ResponseEntity.noContent().build();
    }

    //Accepts an image file, saves it in the "uploads/" folder, and updates the watch entity
    @PostMapping("/upload/{id}")
    public ResponseEntity<String> uploadImage(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        try {
            // Ensure directory exists
            Path uploadDir = Paths.get("").toAbsolutePath().resolve("uploads");
            Files.createDirectories(uploadDir);

            // Generate path
            Path filePath = uploadDir.resolve(file.getOriginalFilename());

            // Save file
            Files.write(filePath, file.getBytes());

            // Update watch image path in the database
            Watch watch = watchService.getWatchById(id);
            if (watch != null) {
                watch.setImagePath("/api/watches/images/" + file.getOriginalFilename()); // Store API path, not file path
                watchService.addWatch(watch);
            }

            return ResponseEntity.ok("File uploaded successfully: " + filePath);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading file: " + e.getMessage());
        }
    }

    //Retrieves an image from the "uploads/" folder and serves it to the frontend
    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("").toAbsolutePath().resolve("uploads").resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(filePath))  // Detects image type
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
