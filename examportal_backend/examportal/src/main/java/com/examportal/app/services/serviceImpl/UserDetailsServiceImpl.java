package com.examportal.app.services.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.examportal.app.entity.User;
import com.examportal.app.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User local = this.userRepository.findByUsername(username);
        if(local==null){
            System.out.println("User not found!");
            throw new UsernameNotFoundException(username+" doesn't exist");
        }
        return local;
    }
    
}
