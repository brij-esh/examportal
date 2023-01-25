package com.examportal.app.entity.exam;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 5000)
    private String title;
    @Column(length = 5000)
    private String description;
    private Long maxMarks;
    private Long numberOfQuestion;
    private boolean active = false;
    

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    @OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Question> questions = new LinkedHashSet<>();


    public boolean getActive(){
        return active;
    }

    public void setActive(boolean active){
        this.active =  active;
    }


}
