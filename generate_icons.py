#!/usr/bin/env python3
"""
Icon Generator for Add Free Extension
Resizes the base icon to required Chrome extension sizes
"""

from PIL import Image
import os

# Paths
base_icon_path = "/Users/murugeshkolhar/.gemini/antigravity/brain/02ddcb9c-901a-449b-921b-bb02fd9648b1/shield_play_icon_1764175573652.png"
output_dir = "/Users/murugeshkolhar/IdeaProjects/AddFreeExtension/add-free-extension/icons"

# Required sizes for Chrome extension
sizes = [16, 48, 128]

def generate_icons():
    """Generate icons in all required sizes"""
    # Load the base icon
    base_image = Image.open(base_icon_path)
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate each size
    for size in sizes:
        # Resize with high-quality resampling
        resized = base_image.resize((size, size), Image.Resampling.LANCZOS)
        
        # Save with the correct filename
        output_path = os.path.join(output_dir, f"icon{size}.png")
        resized.save(output_path, "PNG", optimize=True)
        print(f"✓ Generated {size}x{size} icon: icon{size}.png")
    
    print(f"\n✅ All icons generated successfully in {output_dir}")

if __name__ == "__main__":
    generate_icons()
