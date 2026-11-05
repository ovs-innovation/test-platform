import cv2
import os

src_dir = r'backend\uploads\animal_kingdom_pages'
diag_dir = r'backend\uploads\animal_kingdom_pages\diagrams'
os.makedirs(diag_dir, exist_ok=True)

def crop_box(p, y1, x1, y2, x2, name):
    img = cv2.imread(os.path.join(src_dir, f'page_{p}.png'))
    h, w = img.shape[:2]
    py1, px1, py2, px2 = int(y1*h), int(x1*w), int(y2*h), int(x2*w)
    crop = img[py1:py2, px1:px2]
    # upscale 3x lanczos
    ch, cw = crop.shape[:2]
    crop_3x = cv2.resize(crop, (cw * 3, ch * 3), interpolation=cv2.INTER_LANCZOS4)
    out_path = os.path.join(diag_dir, f'{name}.png')
    cv2.imwrite(out_path, crop_3x)
    print(f'Cropped {name}: {crop_3x.shape}')

# 1. Q28: page 384, bottom left
crop_box(384, 0.74, 0.05, 0.83, 0.45, 'q28_petromyzon')

# 2. Q37: page 385, top left
crop_box(385, 0.04, 0.03, 0.18, 0.47, 'q37_chordate_plan')

# 3. Q68: page 387, right middle (around y: 0.60 to 0.76, x: 0.52 to 0.98)
crop_box(387, 0.61, 0.55, 0.76, 0.95, 'q68_salamandra_hippocampus')

# 4. Q79: page 388, bottom right (y: 0.68 to 0.84, x: 0.52 to 0.98)
crop_box(388, 0.68, 0.53, 0.84, 0.98, 'q79_ostrich_peacock')

# 5. Q98: page 390, right mid (y: 0.46 to 0.58, x: 0.53 to 0.95)
crop_box(390, 0.46, 0.53, 0.58, 0.95, 'q98_chordate_section')

# 6. Q104: page 391, left mid-bottom (y: 0.56 to 0.68, x: 0.15 to 0.42)
crop_box(391, 0.56, 0.15, 0.68, 0.42, 'q104_platypus')

# 7. Q115: page 392, left mid (y: 0.40 to 0.53, x: 0.12 to 0.40)
crop_box(392, 0.40, 0.12, 0.53, 0.40, 'q115_cobra')

# 8. Q118: page 392, right table (y: 0.08 to 0.63, x: 0.52 to 0.98)
crop_box(392, 0.08, 0.52, 0.63, 0.98, 'q118_table_organisms')

# 9. Q145: page 395, left bottom (y: 0.51 to 0.81, x: 0.08 to 0.45)
crop_box(395, 0.51, 0.08, 0.81, 0.45, 'q145_starfish_ascidia')

# 10. Q146: page 395, right table (y: 0.08 to 0.49, x: 0.52 to 0.98)
crop_box(395, 0.08, 0.52, 0.49, 0.98, 'q146_table_organisms')

# 11. Q185: page 399, left bottom + right top. Let's make a combined image of a, b, c, d
img399 = cv2.imread(os.path.join(src_dir, 'page_399.png'))
h, w = img399.shape[:2]
part_ab = img399[int(0.79*h):int(0.93*h), int(0.05*w):int(0.48*w)]
part_cd = img399[int(0.04*h):int(0.23*h), int(0.53*w):int(0.95*w)]

# Resize both to same width and stack vertically
target_w = 400
h_ab = int(part_ab.shape[0] * target_w / part_ab.shape[1])
h_cd = int(part_cd.shape[0] * target_w / part_cd.shape[1])
ab_res = cv2.resize(part_ab, (target_w, h_ab), interpolation=cv2.INTER_LANCZOS4)
cd_res = cv2.resize(part_cd, (target_w, h_cd), interpolation=cv2.INTER_LANCZOS4)
combined = cv2.vconcat([ab_res, cd_res])
cv2.imwrite(os.path.join(diag_dir, 'q185_animals_abcd.png'), combined)
print('Cropped and combined q185_animals_abcd')

