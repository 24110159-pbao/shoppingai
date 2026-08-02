package com.shopping.backend.dto.request.Order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderItemRequest {

    @NotNull
    private Long productId;

    @Min(value = 1, message = "Quantity must be greater than 0")
    private Integer quantity;

}