package com.shopping.backend.dto.request.Category;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class RequestCreateCategory {
    @NotBlank
    private String name;
}
