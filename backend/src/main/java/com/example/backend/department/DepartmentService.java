package com.example.backend.department;

import com.example.backend.major.Major;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {
    private final DepartmentRepository DepartmentRepository;

    @Autowired
    public DepartmentService(DepartmentRepository DepartmentRepository) {
        this.DepartmentRepository = DepartmentRepository;
    }

    public List<Department> getDepartments() {
        return DepartmentRepository.findAll();
    }

    public Department getDepartment(Long DepartmentId) {
        return DepartmentRepository.findById(DepartmentId).orElseThrow(() -> new IllegalStateException(
                "Department with id " + DepartmentId + " does not exist"
        ));
    }

    public void addNewDepartment(Department Department) {
        Optional<Department> DepartmentOptional = DepartmentRepository.findDepartmentByName(Department.getName());
        if (DepartmentOptional.isPresent()) {
            throw new IllegalStateException("name taken");
        }
        DepartmentRepository.save(Department);
    }

    public void deleteDepartment(Long DepartmentId) {
        boolean exists = DepartmentRepository.existsById(DepartmentId);
        if (!exists) {
            throw new IllegalStateException("Department with id " + DepartmentId + " does not exist");
        }
        DepartmentRepository.deleteById(DepartmentId);
    }

    @Transactional
    public void updateDepartment(Long DepartmentId, Department Department) {
        Department DepartmentToUpdate = DepartmentRepository.findById(DepartmentId)
                .orElseThrow(() -> new IllegalStateException(
                        "Department with id " + Department.getId() + " does not exist"
        ));
        DepartmentToUpdate.setName(Department.getName());
    }

}




