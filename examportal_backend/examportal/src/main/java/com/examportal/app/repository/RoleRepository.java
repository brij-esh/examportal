package com.examportal.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examportal.app.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
    
}
