package com.example.university_managment_system.department;

import com.example.university_managment_system.major.Major;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/department")
public class DepartmentController {
    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService)  {
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<Department> getDepartments() {
        return departmentService.getDepartments();
    }

    @GetMapping(path = "{departmentId}")
    public Department getDepartment(@PathVariable("departmentId") Long departmentId) {
        return departmentService.getDepartment(departmentId);
    }


    @PostMapping
    public void registerNewDepartment(@RequestBody Department Department) {
        departmentService.addNewDepartment(Department);
    }

    @DeleteMapping(path = "{departmentId}")
    public void deleteDepartment(@PathVariable("departmentId") Long departmentId) {
        departmentService.deleteDepartment(departmentId);
    }

    @PutMapping(path = "{DepartmentId}")
    public void updateDepartment(
            @PathVariable("DepartmentId") Long DepartmentId,
            @RequestBody Department Department) {
        departmentService.updateDepartment(DepartmentId, Department);
    }
}
