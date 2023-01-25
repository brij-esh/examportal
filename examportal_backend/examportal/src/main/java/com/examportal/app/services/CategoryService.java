package com.examportal.app.services;

import java.util.Set;

import com.examportal.app.entity.exam.Category;

public interface CategoryService {

    //add
    public Category addCategory(Category category);

    //update
    public Category updateCategory(Category category);

    //get all category
    public Set<Category> getCategories();

    //get single catrgory
    public Category getCategory(Long id);

    //delete category
    public void deleteCategory(Long id);

}
