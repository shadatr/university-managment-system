package com.example.university_managment_system.major;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/major")
public class MajorController {
    private final MajorService majorService;

    @Autowired
    public MajorController(MajorService majorService)  {
        this.majorService = majorService;
    }

    @GetMapping
    public List<Major> getMajors() {
        return majorService.getMajors();
    }

    @GetMapping(path = "{majorId}")
    public Major getMajor(@PathVariable("majorId") Long majorId) {
        return majorService.getMajor(majorId);
    }

    @PostMapping
    public void registerNewMajor(@RequestBody MajorRequest major) {
        majorService.addNewMajor(major);
    }

    @DeleteMapping(path = "{majorId}")
    public void deleteMajor(@PathVariable("majorId") Long majorId) {
        majorService.deleteMajor(majorId);
    }

    @PutMapping(path = "{majorId}")
    public void updateMajor(
            @PathVariable("majorId") Long majorId,
            @RequestBody MajorRequest Major) {
        majorService.updateMajor(majorId, Major);
    }
}
