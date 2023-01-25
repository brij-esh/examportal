package com.examportal.app.securityModel;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority{


    private String authorityString;

    public Authority(String authority){
        this.authorityString = authority;
    }

    @Override
    public String getAuthority() {
        return this.authorityString;
    }

}
