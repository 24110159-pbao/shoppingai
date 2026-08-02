package com.shopping.backend.dto.response;

import com.shopping.backend.entity.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class InvoiceResponse {

    private String customer;
    private String address;
    private OrderStatus status;
    private LocalDateTime createdAt;

    private List<InvoiceItemResponse> products;

    private BigDecimal totalPrice;
}