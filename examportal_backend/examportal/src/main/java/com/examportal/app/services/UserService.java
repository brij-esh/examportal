package com.examportal.app.services;

import java.util.Set;

import com.examportal.app.entity.User;
import com.examportal.app.entity.UserRole;
import com.examportal.app.exceptions.UserDoesNotExistException;
import com.examportal.app.exceptions.UserExistException;

public interface UserService {
    // Create user here
    public User createUser(User user, Set<UserRole> userRoles) throws UserExistException;

    //get user by username
    public User getUser(String username) throws UserDoesNotExistException;

    //delete user by username
    public void deleteUser(String username) throws UserDoesNotExistException;

    //check user existence
    public boolean checkUserExist(String username);

    //update user
    public User updateUser(User user);
}
