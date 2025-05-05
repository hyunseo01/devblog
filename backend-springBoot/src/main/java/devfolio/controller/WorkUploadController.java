package devfolio.controller;

import devfolio.dto.WorkUploadResponse;
import devfolio.service.WorkUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/work")
@RequiredArgsConstructor
public class WorkUploadController {
    private final WorkUploadService workUploadService;

    @PostMapping("/upload.do")
    public ResponseEntity<WorkUploadResponse> uploadImg(@RequestPart MultipartFile[] imgs ){
        return ResponseEntity.ok(workUploadService.uploadMultiple(imgs));
    }
}
