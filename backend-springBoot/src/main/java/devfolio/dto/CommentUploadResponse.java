package devfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter@AllArgsConstructor
public class CommentUploadResponse {
    private boolean success;
    private String message;
    private String url;
}
