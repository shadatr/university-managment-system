package com.example.backend.administrator;

import com.example.backend.teacher.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/administrator")
public class AdministratorController {
    private final AdministratorService AdministratorService;

    @Autowired
    public AdministratorController(AdministratorService AdministratorService)  {
        this.AdministratorService = AdministratorService;
    }

    @GetMapping
    public List<Administrator> getAdministrators() {
        return AdministratorService.getAdministrators();
    }

    @GetMapping(path = "{administratorId}")
    public Administrator getAdministrator(@PathVariable("administratorId") Long AdministratorId) {
        return AdministratorService.getAdministrator(AdministratorId);
    }

    @PostMapping
    public void registerNewAdministrator(@RequestBody Administrator Administrator) {
        AdministratorService.addNewAdministrator(Administrator);
    }

    @DeleteMapping(path = "{administratorId}")
    public void deleteAdministrator(@PathVariable("administratorId") Long AdministratorId) {
        AdministratorService.deleteAdministrator(AdministratorId);
    }

    @PutMapping(path = "{administratorId}")
    public void updateAdministrator(
            @PathVariable("administratorId") Long AdministratorId,
            @RequestBody Administrator Administrator) {
        AdministratorService.updateAdministrator(AdministratorId, Administrator);
    }
}
