package com.shopping.backend.controller;

import com.shopping.backend.dto.request.Order.CreateOrderRequest;
import com.shopping.backend.dto.response.ApiResponse;
import com.shopping.backend.dto.response.InvoiceResponse;
import com.shopping.backend.dto.response.OrderResponse;
import com.shopping.backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            Authentication authentication) {

        ApiResponse<OrderResponse> response = new ApiResponse<>();

        response.setCode("201");
        response.setMessage("success");
        response.setResult(
                orderService.createOrder(request, authentication.getName())
        );

        return response;
    }
    @GetMapping("/{id}")
    public ApiResponse<InvoiceResponse> getInvoice(
            @PathVariable Long id,
            Authentication authentication) {

        ApiResponse<InvoiceResponse> response = new ApiResponse<>();

        response.setCode("200");
        response.setMessage("success");
        response.setResult(
                orderService.getInvoice(id, authentication.getName())
        );

        return response;
    }
}