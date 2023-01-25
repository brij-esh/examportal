package com.examportal.app.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.app.entity.User;
import com.examportal.app.securityModel.JwtRequest;
import com.examportal.app.securityModel.JwtResponse;
import com.examportal.app.services.serviceImpl.UserDetailsServiceImpl;
import com.examportal.app.springSecurityConfig.JwtUtils;

@RestController
@CrossOrigin("http://localhost:4200")
public class AuthenticateController {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private JwtUtils jwtUtils;


    //generate token
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
        try {
            this.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
            throw new Exception("User not found");
        }

        //authenticated
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("User disabled!");
        } catch (BadCredentialsException e){
            throw new Exception("Bad Credentials!");
        }
    }
    
    //returns the details of current user
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        System.out.println(principal.getName());
        return (User)  this.userDetailsServiceImpl.loadUserByUsername(principal.getName());
    }

}
