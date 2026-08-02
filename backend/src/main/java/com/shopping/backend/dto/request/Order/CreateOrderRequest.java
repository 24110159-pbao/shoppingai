package com.shopping.backend.dto.request.Order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {

    @NotBlank(message = "Address is required")
    private String address;

    @NotEmpty(message = "Order must contain at least one item")
    private List<@Valid OrderItemRequest> items;

}