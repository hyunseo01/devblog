package devfolio.util;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ImageValidator {

    private static final List<String> ALLOWED_EXTENSIONS = List.of(
            ".jpg", ".jpeg", ".png", ".gif", ".webp"
    );

    public static boolean isExtensionAllowed(String filename) {
        if (filename == null || !filename.contains(".")) return false;
        String ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
        return ALLOWED_EXTENSIONS.contains(ext);
    }

    public static boolean isSizeAllowed(MultipartFile file, long maxSize) {
        return file.getSize() <= maxSize;
    }

    public static String getAllowedExtensionsMessage() {
        return "허용된 확장자: " + String.join(", ", ALLOWED_EXTENSIONS);
    }
}
