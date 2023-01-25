package com.examportal.app.services.serviceImpl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examportal.app.entity.exam.Category;
import com.examportal.app.repository.CategoryRepository;
import com.examportal.app.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
        return new LinkedHashSet<>(this.categoryRepository.findAll());
    }

    @Override
    public Category getCategory(Long id) {
        return this.categoryRepository.findById(id).get();
    }

    @Override
    public void deleteCategory(Long id) {
        this.categoryRepository.deleteById(id);
    }
    
}
