Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("backend\uploads\equilibrium\new_pages\page_new1_4x.png")
$rect = New-Object System.Drawing.Rectangle(0, 500, 500, 350)
$dest = $src.Clone($rect, $src.PixelFormat)
$dest.Save("backend\uploads\equilibrium\new_pages\crop_q253.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
$src.Dispose()
Write-Host "Cropped Q253"

