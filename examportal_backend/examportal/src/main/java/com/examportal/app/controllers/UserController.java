package com.examportal.app.controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.app.entity.Role;
import com.examportal.app.entity.User;
import com.examportal.app.entity.UserRole;
import com.examportal.app.exceptions.UserDoesNotExistException;
import com.examportal.app.exceptions.UserExistException;
import com.examportal.app.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    //Creating Admin


    // creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws UserExistException{
        //encoding password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        Set<UserRole> roles = new HashSet<>();

        Role role = new Role();
        if(user.getUsername().startsWith("admin_")){
            //will create Admin
            user.setUsername(user.getUsername().substring(6));
            role.setRoleId(65L);
            role.setRoleName("ADMIN");
        }else{
            // will Create Normal User
            role.setRoleId(45L);
            role.setRoleName("NORMAL");
        }
            
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        return this.userService.createUser(user, roles);
    }

    //get user 
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) throws UserDoesNotExistException{
        return this.userService.getUser(username);
    }

    //delete user
    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable("username") String username) throws UserDoesNotExistException{
        this.userService.deleteUser(username);
        System.out.println("Deleted "+username);
    }

    //check user exist or not
    @GetMapping("/check/{username}")
    public boolean checkUserExist(@PathVariable("username") String username){
        return this.userService.checkUserExist(username);
    }

    //update user
    @PutMapping("/update-user")
    public void updateUser(@RequestBody User user){
        this.userService.updateUser(user);
        System.out.println("Updated user! "+user.getUsername());
    }
    
}
