package devfolio.service;

import devfolio.dto.BoardUploadResponse;
import devfolio.util.ImageMaxSize;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static devfolio.util.ImageValidator.*;

@Slf4j
@Service
public class BoardUploadService {

    private static final String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/imgs/";

    public BoardUploadResponse uploadMultiple(MultipartFile[] files) {
        List<String> urls = new ArrayList<>();

        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;

            if (!isExtensionAllowed(file.getOriginalFilename())) {
                return new BoardUploadResponse(false, getAllowedExtensionsMessage(), null);
            }

            if (!isSizeAllowed(file, ImageMaxSize.BOARD)) {
                return new BoardUploadResponse(false, "5MB 이하의 파일만 업로드 가능합니다.", null);
            }

            try {
                String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
                String uuid = UUID.randomUUID().toString();
                String newFileName = uuid + ext;

                File saveFile = new File(uploadDir + newFileName);
                file.transferTo(saveFile);

                urls.add("/imgs/" + newFileName);
            } catch (IOException e) {
                log.error("게시판 이미지 업로드 실패", e);
                return new BoardUploadResponse(false, "파일 업로드 실패", null);
            }
        }

        return new BoardUploadResponse(true, "게시판 이미지 업로드 성공", urls.toArray(new String[0]));
    }
}
