package com.shopping.backend.service;

import com.shopping.backend.dto.request.Order.CreateOrderRequest;
import com.shopping.backend.dto.request.Order.OrderItemRequest;
import com.shopping.backend.dto.response.InvoiceItemResponse;
import com.shopping.backend.dto.response.InvoiceResponse;
import com.shopping.backend.dto.response.OrderItemResponse;
import com.shopping.backend.dto.response.OrderResponse;
import com.shopping.backend.entity.*;
import com.shopping.backend.repository.OrderRepository;
import com.shopping.backend.repository.ProductRepository;
import com.shopping.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request, String username) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("Order must contain at least one product");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setAddress(request.getAddress());
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (itemRequest.getQuantity() <= 0) {
                throw new RuntimeException("Quantity must be greater than 0");
            }

            if (product.getQuantity() < itemRequest.getQuantity()) {
                throw new RuntimeException(product.getName() + " is out of stock");
            }

            product.setQuantity(
                    product.getQuantity() - itemRequest.getQuantity()
            );

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(product.getPrice());

            orderItems.add(orderItem);

            total = total.add(
                    product.getPrice().multiply(
                            BigDecimal.valueOf(itemRequest.getQuantity())
                    )
            );
        }

        order.setOrderItems(orderItems);
        order.setTotalPrice(total);

        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponse(savedOrder);
    }
    private OrderResponse mapToOrderResponse(Order order) {

        OrderResponse orderResponse = new OrderResponse();

        orderResponse.setId(order.getId());
        orderResponse.setAddress(order.getAddress());
        orderResponse.setStatus(order.getStatus());
        orderResponse.setCreatedAt(order.getCreatedAt());
        orderResponse.setTotalPrice(order.getTotalPrice());

        List<OrderItemResponse> items = new ArrayList<>();

        for (OrderItem item : order.getOrderItems()) {

            OrderItemResponse itemResponse = new OrderItemResponse();

            itemResponse.setProductId(item.getProduct().getId());
            itemResponse.setProductName(item.getProduct().getName());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setUnitPrice(item.getUnitPrice());

            items.add(itemResponse);
        }

        orderResponse.setItems(items);

        return orderResponse;
    }
    @Transactional
    public InvoiceResponse getInvoice(Long orderId, String username) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getUsername().equals(username)) {
            throw new RuntimeException("You cannot view this order");
        }

        InvoiceResponse response = new InvoiceResponse();

        response.setCustomer(order.getUser().getUsername());
        response.setAddress(order.getAddress());
        response.setStatus(order.getStatus());
        response.setCreatedAt(order.getCreatedAt());
        response.setTotalPrice(order.getTotalPrice());

        List<InvoiceItemResponse> products = mapProducts(order.getOrderItems());
        response.setProducts(products);
        return response;
    }
    private List<InvoiceItemResponse> mapProducts(List<OrderItem> orderItems) {

        List<InvoiceItemResponse> products = new ArrayList<>();

        for (OrderItem item : orderItems) {

            InvoiceItemResponse dto = new InvoiceItemResponse();

            dto.setProductName(item.getProduct().getName());
            dto.setQuantity(item.getQuantity());
            dto.setUnitPrice(item.getUnitPrice());
            dto.setSubTotal(
                    item.getUnitPrice().multiply(
                            BigDecimal.valueOf(item.getQuantity())
                    )
            );

            products.add(dto);
        }

        return products;
    }
}