package com.example.backend.administrator;

import com.example.backend.teacher.Teacher;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministratorService {
    private final AdministratorRepository AdministratorRepository;

    @Autowired
    public AdministratorService(AdministratorRepository AdministratorRepository) {
        this.AdministratorRepository = AdministratorRepository;
    }

    public List<Administrator> getAdministrators() {
        return AdministratorRepository.findAll();
    }

    public Administrator getAdministrator(Long AdministratorId) {
        return AdministratorRepository.findById(AdministratorId).orElseThrow(() -> new IllegalStateException(
                "Administrator with id " + AdministratorId + " does not exist"
        ));
    }

    public void addNewAdministrator(Administrator Administrator) {
        Optional<Administrator> AdministratorOptional = AdministratorRepository.findAdministratorByEmail(Administrator.getEmail());
        if (AdministratorOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        AdministratorRepository.save(Administrator);
    }

    public void deleteAdministrator(Long AdministratorId) {
        boolean exists = AdministratorRepository.existsById(AdministratorId);
        if (!exists) {
            throw new IllegalStateException("Administrator with id " + AdministratorId + " does not exist");
        }
        AdministratorRepository.deleteById(AdministratorId);
    }

    @Transactional
    public void updateAdministrator(Long AdministratorId, Administrator Administrator) {
        Administrator AdministratorToUpdate = AdministratorRepository.findById(AdministratorId)
                .orElseThrow(() -> new IllegalStateException(
                        "Administrator with id " + Administrator.getId() + " does not exist"
        ));
        AdministratorToUpdate.setName(Administrator.getName());
        AdministratorToUpdate.setSurname(Administrator.getSurname());
        AdministratorToUpdate.setEmail(Administrator.getEmail());
        AdministratorToUpdate.setBirth_date(Administrator.getBirth_date());
        AdministratorToUpdate.setPhone(Administrator.getPhone());
        AdministratorToUpdate.setAddress(Administrator.getAddress());
        AdministratorToUpdate.setPassword(Administrator.getPassword());
    }


}




