#!/bin/bash
# Icon Generator for Add Free Extension
# Uses macOS native 'sips' tool to resize icons

BASE_ICON="/Users/murugeshkolhar/.gemini/antigravity/brain/02ddcb9c-901a-449b-921b-bb02fd9648b1/shield_play_icon_1764175573652.png"
OUTPUT_DIR="/Users/murugeshkolhar/IdeaProjects/AddFreeExtension/add-free-extension/icons"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Generate icons in required sizes
for size in 16 48 128; do
    output_file="$OUTPUT_DIR/icon${size}.png"
    sips -z $size $size "$BASE_ICON" --out "$output_file" > /dev/null 2>&1
    echo "✓ Generated ${size}x${size} icon: icon${size}.png"
done

echo ""
echo "✅ All icons generated successfully in $OUTPUT_DIR"
