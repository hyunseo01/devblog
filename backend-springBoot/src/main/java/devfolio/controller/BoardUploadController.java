package devfolio.controller;

import devfolio.dto.BoardUploadResponse;
import devfolio.service.BoardUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardUploadController {

    private final BoardUploadService boardUploadService;

    @PostMapping("/upload.do")
    public ResponseEntity<BoardUploadResponse> uploadImg(@RequestPart MultipartFile[] imgs){
        return ResponseEntity.ok(boardUploadService.uploadMultiple(imgs));
    }
}
