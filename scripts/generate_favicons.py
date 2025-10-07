from PIL import Image, ImageOps
from pathlib import Path

def generate_favicon_variants(src_path: Path, out_dir: Path):
    out_dir.mkdir(parents=True, exist_ok=True)
    # Sizes to generate
    sizes = {
        "favicon-16.png": 16,
        "favicon-32.png": 32,
        "apple-touch-icon.png": 180,
        "icon-192.png": 192,
        "icon-512.png": 512,
    }

    # Load source
    img = Image.open(src_path).convert("RGBA")

    # Make square canvas (padding) using max dimension
    max_side = max(img.size)
    canvas = Image.new("RGBA", (max_side, max_side), (255, 255, 255, 0))
    # Center paste
    off_x = (max_side - img.width) // 2
    off_y = (max_side - img.height) // 2
    canvas.paste(img, (off_x, off_y), img)

    for name, size in sizes.items():
        out_img = canvas.resize((size, size), Image.LANCZOS)
        # For favicons, prefer opaque background to avoid odd halos on some browsers
        if name.startswith("favicon-"):
            opaque = Image.new("RGB", (size, size), (255, 255, 255))
            opaque.paste(out_img, mask=out_img.split()[-1])
            out_path = out_dir / name
            opaque.save(out_path, format="PNG")
        else:
            out_path = out_dir / name
            out_img.save(out_path, format="PNG")
        print(f"Generated {out_path}")

if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    src = root / "assets" / "img" / "logo2.png"
    out = root / "assets" / "favicon"
    if not src.exists():
        raise SystemExit(f"Source logo not found: {src}")
    generate_favicon_variants(src, out)
