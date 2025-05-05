package devfolio.service;

import devfolio.dto.CommentUploadResponse;
import devfolio.util.ImageMaxSize;
import devfolio.util.ImageValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import static devfolio.util.ImageValidator.*;

@Slf4j
@Service
public class CommentUploadService {

    private static final String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/imgs/";

    public CommentUploadResponse upload(MultipartFile file) {
        if (file.isEmpty()) {
            return new CommentUploadResponse(false, "파일이 비어 있습니다.", null);
        }

        if (!isExtensionAllowed(file.getOriginalFilename())) {
            return new CommentUploadResponse(false, getAllowedExtensionsMessage(), null);
        }

        if (!isSizeAllowed(file, ImageMaxSize.COMMENT)) {
            return new CommentUploadResponse(false, "1MB 이하의 파일만 업로드 가능합니다.", null);
        }

        try {
            String originalFilename = file.getOriginalFilename();
            String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uuid = UUID.randomUUID().toString();
            String newFileName = uuid + ext;

            File saveFile = new File(uploadDir + newFileName);
            file.transferTo(saveFile);

            return new CommentUploadResponse(true, "댓글 이미지 업로드 성공", "/imgs/" + newFileName);
        } catch (IOException e) {
            log.error("댓글 파일 업로드 실패", e);
            return new CommentUploadResponse(false, "파일 업로드 실패", null);
        }
    }
}
