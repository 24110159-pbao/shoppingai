package com.shopping.backend.controller;

import com.shopping.backend.dto.request.Category.RequestCreateCategory;
import com.shopping.backend.dto.request.Category.RequestUpdateCategory;
import com.shopping.backend.dto.response.ApiResponse;
import com.shopping.backend.dto.response.CategoryResponse;
import com.shopping.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // GET /categories
    @GetMapping
    public ApiResponse<List<CategoryResponse>> getAllCategories() {

        ApiResponse<List<CategoryResponse>> response = new ApiResponse<>();

        try {

            response.setCode("200");
            response.setMessage("success");
            response.setResult(categoryService.getAllCategories());

        } catch (RuntimeException e) {

            response.setCode("400");
            response.setMessage(e.getMessage());

        }

        return response;
    }

    // POST /categories
    @PostMapping
    public ApiResponse<CategoryResponse> createCategory(
            @RequestBody RequestCreateCategory request
    ) {

        ApiResponse<CategoryResponse> response = new ApiResponse<>();

        try {

            response.setCode("201");
            response.setMessage("success");
            response.setResult(categoryService.createCategory(request));

        } catch (RuntimeException e) {

            response.setCode("400");
            response.setMessage(e.getMessage());

        }

        return response;
    }

    // PUT /categories/{id}
    @PutMapping("/{id}")
    public ApiResponse<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @RequestBody RequestUpdateCategory request
    ) {

        ApiResponse<CategoryResponse> response = new ApiResponse<>();

        try {

            response.setCode("200");
            response.setMessage("success");
            response.setResult(categoryService.updateCategory(id, request));

        } catch (RuntimeException e) {

            response.setCode("400");
            response.setMessage(e.getMessage());

        }

        return response;
    }

    // DELETE /categories/{id}
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCategory(
            @PathVariable Long id
    ) {

        ApiResponse<String> response = new ApiResponse<>();

        try {

            categoryService.deleteCategory(id);

            response.setCode("200");
            response.setMessage("success");
            response.setResult("Xóa danh mục thành công");

        } catch (RuntimeException e) {

            response.setCode("404");
            response.setMessage(e.getMessage());

        }

        return response;
    }

}