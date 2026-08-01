package com.shopping.backend.dto.response;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;

}
