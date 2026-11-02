Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("backend\uploads\equilibrium\new_pages\page_new1_4x.png")

# Let's crop individual questions from the right column: X from 490 to 1040 (width 550)
function CropQuestion($y1, $h, $name) {
    $rect = New-Object System.Drawing.Rectangle(490, $y1, 550, $h)
    $dest = $src.Clone($rect, $src.PixelFormat)
    $dest.Save("backend\uploads\equilibrium\new_pages\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Saved $name"
}

CropQuestion 0 140 "q_ar_1"
CropQuestion 140 140 "q_ar_2"
CropQuestion 280 140 "q_ar_3"
CropQuestion 420 140 "q_ar_4"
CropQuestion 560 140 "q_ar_5"
CropQuestion 700 140 "q_ar_6"
CropQuestion 840 140 "q_ar_7"
CropQuestion 980 140 "q_ar_8"
CropQuestion 1120 120 "q_ar_9"
CropQuestion 1240 108 "q_ar_10"

$src.Dispose()

