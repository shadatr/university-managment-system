package com.example.backend.major;

import com.example.backend.department.Department;
import com.example.backend.department.DepartmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@Service
public class MajorService {
    private final MajorRepository majorRepository;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public MajorService(MajorRepository majorRepository, DepartmentRepository departmentRepository) {
        this.majorRepository = majorRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Major> getMajors() {
        return majorRepository.findAll();
    }

    public Major getMajor(Long MajorId) {
        return majorRepository.findById(MajorId).orElseThrow(() -> new IllegalStateException(
                "Major with id " + MajorId + " does not exist"
        ));
    }


    public void addNewMajor(@RequestBody MajorRequest majorRequest) {
        Department department = departmentRepository.findById(majorRequest.getDepartment_id()).orElseThrow(() -> new RuntimeException("Department not found"));

        Major major = new Major();
        major.setName(majorRequest.getName());
        major.setDepartment(department);
        major.setCredits(majorRequest.getCredits());
        majorRepository.save(major);
    }

    public void deleteMajor(Long MajorId) {
        boolean exists = majorRepository.existsById(MajorId);
        if (!exists) {
            throw new IllegalStateException("Major with id " + MajorId + " does not exist");
        }
        majorRepository.deleteById(MajorId);
    }

    @Transactional
    public void updateMajor(Long MajorId, @RequestBody MajorRequest majorRequest) {
        Major existingMajor = majorRepository.findById(MajorId).orElseThrow(() -> new RuntimeException("Major not found"));
        Department department = departmentRepository.findById(majorRequest.getDepartment_id()).orElseThrow(() -> new RuntimeException("Department not found"));

        existingMajor.setName(majorRequest.getName());
        existingMajor.setDepartment(department);
        existingMajor.setCredits(majorRequest.getCredits());
        majorRepository.save(existingMajor);
    }

}




