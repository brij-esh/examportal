package com.examportal.app.services.serviceImpl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examportal.app.entity.User;
import com.examportal.app.entity.UserRole;
import com.examportal.app.exceptions.UserDoesNotExistException;
import com.examportal.app.exceptions.UserExistException;
import com.examportal.app.repository.RoleRepository;
import com.examportal.app.repository.UserRepository;
import com.examportal.app.services.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // Creating User
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws UserExistException {
        User local = this.userRepository.findByUsername(user.getUsername());
        if(local!=null){
            System.out.println("User already Exist!");
            throw new UserExistException("Already present user!!");
        }else{

            for(UserRole userRole : userRoles){
                roleRepository.save(userRole.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }

    //get user using username
    @Override
    public User getUser(String username) throws UserDoesNotExistException{
        User local = this.userRepository.findByUsername(username);
        if(local==null){
            System.out.println("User does not exist!");
            throw new UserDoesNotExistException("No existing user with username : "+username+"!!");
        }
        return local;
    }

    //delete user using username
    @Override
    public void deleteUser(String username) throws UserDoesNotExistException{
        User local = this.userRepository.findByUsername(username);
        if(local==null){
            System.out.println("User does not exist!");
            throw new UserDoesNotExistException("No existing user with username : "+username+"!!");
        }
        this.userRepository.deleteByUsername(username);
    }

    //check user exist or not
    @Override
    public boolean checkUserExist(String username){
        User local = this.userRepository.findByUsername(username);
        return local==null;
    }

    @Override
    public User updateUser(User user) {
        User local = this.userRepository.findByUsername(user.getUsername());
        local.setEmail(user.getEmail());
        local.setFirstName(user.getFirstName());
        local.setLastName(user.getLastName());
        local.setPassword(passwordEncoder.encode(user.getPassword()));
        local.setPhone(user.getPhone());
        return this.userRepository.save(local);
    }
    
}
