import cv2
import numpy as np

img = cv2.imread('backend/scripts/straight_lines_pages/page_001.png', cv2.IMREAD_GRAYSCALE)

# Clean watermark: any pixel > 215 is set to 255 (pure white)
cleaned = np.where(img > 215, 255, img).astype(np.uint8)

# Normalize/stretch remaining text (0-215) to 0-255
# text that is dark becomes even darker
cleaned = cv2.normalize(cleaned, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX)

cv2.imwrite('backend/scripts/straight_lines_pages/page_001_preprocessed.png', cleaned)
print("Saved preprocessed page 1")

