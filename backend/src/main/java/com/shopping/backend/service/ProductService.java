package com.shopping.backend.service;

import com.shopping.backend.dto.request.Product.RequestCreateProduct;
import com.shopping.backend.dto.request.Product.RequestUpdateProduct;
import com.shopping.backend.dto.response.ProductResponse;
import com.shopping.backend.entity.Category;
import com.shopping.backend.entity.Product;
import com.shopping.backend.repository.CategoryRepository;
import com.shopping.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // GET /products
    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()// nếu ko dùng map thì dùng for
                .stream()
                .map(product -> ProductResponse.builder()
                        .id(product.getId())
                        .categoryId(product.getCategory().getId())
                        .categoryName(product.getCategory().getName())
                        .name(product.getName())
                        .price(product.getPrice())
                        .quantity(product.getQuantity())
                        .image(product.getImage())
                        .build())
                .toList();
    }


    // GET /products/{id}
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product không tồn tại")
                );

        return ProductResponse.builder()
                .id(product.getId())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .image(product.getImage())
                .build();
    }
    public ProductResponse createProduct(RequestCreateProduct request){
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category không tồn tại"));
        Product product = new Product();

        product.setCategory(category);
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setImage(request.getImage());
        productRepository.save(product);

        return ProductResponse.builder()
                .id(product.getId())
                .categoryId(category.getId())
                .categoryName(category.getName())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .image(product.getImage())
                .build();
    }
    public ProductResponse updateProduct(Long id,RequestUpdateProduct request){
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category không tồn tại"));

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product không tồn tại"));

        product.setCategory(category);
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setImage(request.getImage());
        productRepository.save(product);

        return ProductResponse.builder()
                .id(product.getId())
                .categoryId(category.getId())
                .categoryName(category.getName())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .image(product.getImage())
                .build();
    }

    public void deleteProduct(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product không tồn tại"));
        productRepository.delete(product);
    }

}