import cv2
import os

upload_dir = r'C:\Users\saura\Desktop\test-platform\backend\uploads\animal_kingdom_pages'
src_user = r'C:\Users\saura\.gemini\antigravity\brain\e4ae8dc5-a41f-4a9a-9424-05a26a8b9758\.user_uploaded'
out_pages = os.path.join(upload_dir, 'pages_batch2')
os.makedirs(out_pages, exist_ok=True)

mapping = [
    {
        'file': 'media_1793698441707_4143a34f.jpg',
        'pages': [402, 403, 404, 405]
    },
    {
        'file': 'media_1793698441721_bb7eadfd.jpg',
        'pages': [406, 407, 408, 409]
    }
]

for item in mapping:
    img = cv2.imread(os.path.join(src_user, item['file']))
    h, w = img.shape[:2]
    hw, hh = w // 2, h // 2
    quads = [
        (item['pages'][0], img[:hh, :hw]),
        (item['pages'][1], img[:hh, hw:]),
        (item['pages'][2], img[hh:, :hw]),
        (item['pages'][3], img[hh:, hw:])
    ]
    for pnum, qimg in quads:
        p_path = os.path.join(out_pages, f'page_{pnum}.png')
        cv2.imwrite(p_path, qimg)
        # Also split each page into left and right columns upscaled 2.5x
        qh, qw = qimg.shape[:2]
        mid = qw // 2
        l = qimg[:, :mid]
        r = qimg[:, mid:]
        l_up = cv2.resize(l, (mid * 3, qh * 3), interpolation=cv2.INTER_LANCZOS4)
        r_up = cv2.resize(r, ((qw - mid) * 3, qh * 3), interpolation=cv2.INTER_LANCZOS4)
        cv2.imwrite(os.path.join(out_pages, f'p{pnum}_left.png'), l_up)
        cv2.imwrite(os.path.join(out_pages, f'p{pnum}_right.png'), r_up)
        print(f'Page {pnum} saved and columns cropped.')

print('Batch 2 pages ready!')

