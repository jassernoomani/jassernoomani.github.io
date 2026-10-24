"""Prepare a portrait for the player card.

Usage:
  python tools/duotone.py original.jpg public/photo.jpg          # natural colours + cool shadows (default)
  python tools/duotone.py original.jpg public/photo.jpg --blue   # full blue gradient map
Needs Pillow (pip install pillow).
"""
import sys
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

STOPS = [(0.00, (2, 11, 46)), (0.30, (7, 28, 107)), (0.55, (20, 82, 255)),
         (0.78, (63, 216, 255)), (0.92, (184, 241, 255)), (1.00, (248, 252, 255))]


def crop_card(src):
    """Head-and-shoulders crop matching the card's photo slot (~1.41:1)."""
    w, h = src.size
    cw = round(w * 0.92)
    ch = round(cw / 1.41)
    left = (w - cw) // 2
    top = max(0, round(h * 0.06))
    return src.crop((left, top, left + cw, min(h, top + ch))).resize((900, round(900 / 1.41)), Image.LANCZOS)


def cool_shadows(img):
    """Keep skin tones; push dark areas and the background toward navy."""
    navy = Image.new('RGB', img.size, (10, 30, 90))
    mask = img.convert('L').point(lambda v: int(max(0, 110 - v) * 1.6))
    return ImageEnhance.Contrast(Image.composite(navy, img, mask)).enhance(1.06)


def full_blue(img):
    def lerp(a, b, t):
        return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))
    table = []
    for v in range(256):
        x = v / 255
        for (p0, c0), (p1, c1) in zip(STOPS, STOPS[1:]):
            if x <= p1:
                table.append(lerp(c0, c1, (x - p0) / (p1 - p0)))
                break
    g = ImageEnhance.Contrast(ImageOps.autocontrast(ImageOps.grayscale(img), cutoff=1)).enhance(1.12)
    g = g.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
    return Image.merge('RGB', [g.point([c[i] for c in table]) for i in range(3)])


if __name__ == '__main__':
    src, out = sys.argv[1], sys.argv[2]
    card = crop_card(Image.open(src).convert('RGB'))
    result = full_blue(card) if '--blue' in sys.argv else cool_shadows(card)
    result.save(out, quality=86, optimize=True, progressive=True)
    print('saved', out)
