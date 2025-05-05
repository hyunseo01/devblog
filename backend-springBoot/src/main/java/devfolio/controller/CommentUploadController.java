package devfolio.controller;

import devfolio.dto.CommentUploadResponse;
import devfolio.service.CommentUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentUploadController {

    private final CommentUploadService commentUploadService;

    @PostMapping("/upload.do")
    public ResponseEntity<CommentUploadResponse> uploadImg(@RequestPart MultipartFile img){
        return ResponseEntity.ok(commentUploadService.upload(img));
    }
}
