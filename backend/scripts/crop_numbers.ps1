Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("backend\uploads\equilibrium\new_pages\page_new1_4x.png")

# Crop top-left where numbers are
$rect = New-Object System.Drawing.Rectangle(0, 0, 500, 700)
$dest = $src.Clone($rect, $src.PixelFormat)
$dest.Save("backend\uploads\equilibrium\new_pages\crop_mcq_numbers.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
$src.Dispose()
Write-Host "Cropped MCQ numbers"

