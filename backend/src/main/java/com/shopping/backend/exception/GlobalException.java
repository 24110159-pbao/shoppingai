package com.shopping.backend.exception;

import com.shopping.backend.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(AppException.class)
    public ApiResponse<Object> handleAppException(AppException ex){

        ApiResponse<Object> response = new ApiResponse<>();

        response.setCode("400");
        response.setMessage(ex.getMessage());

        return response;
    }
}