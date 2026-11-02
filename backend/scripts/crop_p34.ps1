Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("backend\uploads\periodic\pages\page34.png")

# Left half: Q3 to Q9
$rectL = New-Object System.Drawing.Rectangle(0, 0, [int]($src.Width / 2), $src.Height)
$destL = $src.Clone($rectL, $src.PixelFormat)
$destL.Save("backend\uploads\periodic\pages\crop_p34_left.png", [System.Drawing.Imaging.ImageFormat]::Png)
$destL.Dispose()

# Right half: Q10 to Q16
$rectR = New-Object System.Drawing.Rectangle([int]($src.Width / 2), 0, ($src.Width - [int]($src.Width / 2)), $src.Height)
$destR = $src.Clone($rectR, $src.PixelFormat)
$destR.Save("backend\uploads\periodic\pages\crop_p34_right.png", [System.Drawing.Imaging.ImageFormat]::Png)
$destR.Dispose()

$src.Dispose()
Write-Host "Cropped Page 34 Left and Right"

