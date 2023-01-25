package com.examportal.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.app.entity.exam.Category;
import com.examportal.app.services.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //add actegory
    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        Category local =  this.categoryService.addCategory(category);
        return ResponseEntity.ok(local);
    }

    //get catgory
    @GetMapping("/get/{categoryId}")
    public Category getCategory(@PathVariable("categoryId") Long categoryId){
        return this.categoryService.getCategory(categoryId);
    }

    //get all category
    @GetMapping("/get-all-category")
    public ResponseEntity<?> getAllCategory(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }
    //update
    @PutMapping("/update")
    public Category updateCategory(@RequestBody Category category){
        return this.categoryService.updateCategory(category);
    }

    //delete
    @DeleteMapping("/delete/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") Long categoryId){
        this.categoryService.deleteCategory(categoryId);
    }



}
