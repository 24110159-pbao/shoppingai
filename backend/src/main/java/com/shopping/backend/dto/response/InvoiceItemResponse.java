package com.shopping.backend.dto.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvoiceItemResponse {

    private String productName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subTotal;
}