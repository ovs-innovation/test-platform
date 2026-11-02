Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("backend\uploads\periodic\pages\page27.png")
$rect = New-Object System.Drawing.Rectangle(0, 0, $src.Width, 500)
$dest = $src.Clone($rect, $src.PixelFormat)
$dest.Save("backend\uploads\periodic\pages\crop_p27_top.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
$src.Dispose()
Write-Host "Cropped p27 top"

