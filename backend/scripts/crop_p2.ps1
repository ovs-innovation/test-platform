Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("backend\uploads\equilibrium\new_pages\page_new2_4x.png")

# Left column: Q11 to Q17: X from 0 to 500, Y from 0 to 1180
$rectL = New-Object System.Drawing.Rectangle(0, 0, 500, 1180)
$destL = $src.Clone($rectL, $src.PixelFormat)
$destL.Save("backend\uploads\equilibrium\new_pages\crop_p2_left.png", [System.Drawing.Imaging.ImageFormat]::Png)
$destL.Dispose()

# Right column: Q18 to Q25: X from 500 to 1000, Y from 0 to 1180
$rectR = New-Object System.Drawing.Rectangle(500, 0, 500, 1180)
$destR = $src.Clone($rectR, $src.PixelFormat)
$destR.Save("backend\uploads\equilibrium\new_pages\crop_p2_right.png", [System.Drawing.Imaging.ImageFormat]::Png)
$destR.Dispose()

$src.Dispose()
Write-Host "Cropped Page 2 Left and Right"

