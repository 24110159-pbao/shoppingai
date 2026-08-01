package com.shopping.backend.service;

import com.shopping.backend.dto.request.Category.RequestCreateCategory;
import com.shopping.backend.dto.request.Category.RequestUpdateCategory;
import com.shopping.backend.dto.response.CategoryResponse;
import com.shopping.backend.entity.Category;
import com.shopping.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // Lấy tất cả category
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(category -> CategoryResponse.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .build())
                .toList();
    }

    // Tạo category
    public CategoryResponse createCategory(RequestCreateCategory request) {
        if(categoryRepository.existsByName(request.getName())){
            throw new RuntimeException("Category đã tồn tại");
        }

        Category category = new Category();
        category.setName(request.getName());

        categoryRepository.save(category);

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

    // Cập nhật category
    public CategoryResponse updateCategory(Long id, RequestUpdateCategory request) {
        if(categoryRepository.existsByName(request.getName())){
            throw new RuntimeException("Category đã tồn tại");
        }

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category không tồn tại"));

        category.setName(request.getName());

        categoryRepository.save(category);

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

    // Xóa category
    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category không tồn tại"));

        categoryRepository.delete(category);
    }
}