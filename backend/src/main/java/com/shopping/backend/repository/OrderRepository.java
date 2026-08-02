package com.shopping.backend.repository;

import com.shopping.backend.entity.Order;
import com.shopping.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);

}