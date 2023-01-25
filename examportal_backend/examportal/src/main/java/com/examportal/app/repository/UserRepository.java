package com.examportal.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.examportal.app.entity.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Long>{

    public User findByUsername(String username);

    public void deleteByUsername(String username);
    
}
