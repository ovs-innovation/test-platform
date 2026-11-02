Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("backend\uploads\equilibrium\new_pages\page_new1_4x.png")
$rect = New-Object System.Drawing.Rectangle(480, 0, 560, 1348)
$dest = $src.Clone($rect, $src.PixelFormat)
$dest.Save("backend\uploads\equilibrium\new_pages\crop_ar_p1.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
$src.Dispose()
Write-Host "Cropped AR Page 1"

