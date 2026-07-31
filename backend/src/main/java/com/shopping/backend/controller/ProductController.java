package com.shopping.backend.controller;

import com.shopping.backend.dto.request.Product.RequestCreateProduct;
import com.shopping.backend.dto.request.Product.RequestUpdateProduct;
import com.shopping.backend.dto.response.ProductResponse;
import com.shopping.backend.service.ProductService;
import com.shopping.backend.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;


    @GetMapping
    public ApiResponse<List<ProductResponse>> getAllProducts() {

        ApiResponse<List<ProductResponse>> response = new ApiResponse<>();

        try {

            response.setCode("200");
            response.setMessage("success");
            response.setResult(productService.getAllProducts());

        } catch (RuntimeException e) {

            response.setCode("400");
            response.setMessage(e.getMessage());

        }

        return response;
    }



    @GetMapping("/{id}")
    public ApiResponse<ProductResponse> getProductById(@PathVariable Long id) {

        ApiResponse<ProductResponse> response = new ApiResponse<>();

        try {

            response.setCode("200");
            response.setMessage("success");
            response.setResult(productService.getProductById(id));

        } catch (RuntimeException e) {

            response.setCode("404");
            response.setMessage(e.getMessage());

        }

        return response;
    }
    @PostMapping
    public ApiResponse<ProductResponse> createProduct(@RequestBody RequestCreateProduct request){
        ApiResponse<ProductResponse> response = new ApiResponse<>();
        try{

            response.setCode("201");
            response.setMessage("success");
            response.setResult(productService.createProduct(request));

        }catch(RuntimeException e){

            response.setCode("400");
            response.setMessage(e.getMessage());

        }

        return response;
    }
    // PUT /products
    @PutMapping ("/{id}")
    public ApiResponse<ProductResponse> updateProduct(@PathVariable Long id,@RequestBody RequestUpdateProduct request) {

        ApiResponse<ProductResponse> response = new ApiResponse<>();

        try {

            response.setCode("200");
            response.setMessage("success");
            response.setResult(productService.updateProduct(id,request));

        } catch (RuntimeException e) {

            response.setCode("400");
            response.setMessage(e.getMessage());

        }

        return response;
    }

    // DELETE /products/{id}
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteProduct(
            @PathVariable Long id
    ) {

        ApiResponse<String> response = new ApiResponse<>();

        try {

            productService.deleteProduct(id);

            response.setCode("200");
            response.setMessage("success");
            response.setResult("Xóa sản phẩm thành công");

        } catch (RuntimeException e) {

            response.setCode("404");
            response.setMessage(e.getMessage());

        }

        return response;
    }
}