package com.examportal.app.exceptions;

public class UserExistException extends Exception{
    
    public UserExistException(String message){
        super(message);
        System.out.println(message);
    }
}
