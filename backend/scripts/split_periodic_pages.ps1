Add-Type -AssemblyName System.Drawing

$outDir = "backend\uploads\periodic\pages"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

function SplitAndSave($srcPath, $rect, $outName, $scale = 3) {
    $img = [System.Drawing.Bitmap]::FromFile($srcPath)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $img.Dispose()

    $w = [int]($cropped.Width * $scale)
    $h = [int]($cropped.Height * $scale)
    $dest = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($cropped, 0, 0, $w, $h)
    $g.Dispose()
    $cropped.Dispose()

    $dest.Save("$outDir\$outName.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Saved $outName ($w x $h)"
}

# Image 1 (457 x 537) -> Page 23
SplitAndSave "backend\uploads\periodic\raw_1.png" (New-Object System.Drawing.Rectangle(0, 0, 457, 537)) "page23" 3

# Image 2 (457 x 646) -> 2 rows x 2 cols
$img2 = [System.Drawing.Bitmap]::FromFile("backend\uploads\periodic\raw_2.png")
$w2 = $img2.Width
$h2 = $img2.Height
$midX2 = [int]($w2 / 2)
$midY2 = [int]($h2 / 2)
$img2.Dispose()

SplitAndSave "backend\uploads\periodic\raw_2.png" (New-Object System.Drawing.Rectangle(0, 0, $midX2, $midY2)) "page24" 3
SplitAndSave "backend\uploads\periodic\raw_2.png" (New-Object System.Drawing.Rectangle($midX2, 0, ($w2 - $midX2), $midY2)) "page25" 3
SplitAndSave "backend\uploads\periodic\raw_2.png" (New-Object System.Drawing.Rectangle(0, $midY2, $midX2, ($h2 - $midY2))) "page26" 3
SplitAndSave "backend\uploads\periodic\raw_2.png" (New-Object System.Drawing.Rectangle($midX2, $midY2, ($w2 - $midX2), ($h2 - $midY2))) "page27" 3

# Image 3 (453 x 637) -> 2 rows x 2 cols
$img3 = [System.Drawing.Bitmap]::FromFile("backend\uploads\periodic\raw_3.png")
$w3 = $img3.Width
$h3 = $img3.Height
$midX3 = [int]($w3 / 2)
$midY3 = [int]($h3 / 2)
$img3.Dispose()

SplitAndSave "backend\uploads\periodic\raw_3.png" (New-Object System.Drawing.Rectangle(0, 0, $midX3, $midY3)) "page28" 3
SplitAndSave "backend\uploads\periodic\raw_3.png" (New-Object System.Drawing.Rectangle($midX3, 0, ($w3 - $midX3), $midY3)) "page29" 3
SplitAndSave "backend\uploads\periodic\raw_3.png" (New-Object System.Drawing.Rectangle(0, $midY3, $midX3, ($h3 - $midY3))) "page30" 3
SplitAndSave "backend\uploads\periodic\raw_3.png" (New-Object System.Drawing.Rectangle($midX3, $midY3, ($w3 - $midX3), ($h3 - $midY3))) "page31" 3

# Image 4 (453 x 317) -> 1 row x 2 cols
$img4 = [System.Drawing.Bitmap]::FromFile("backend\uploads\periodic\raw_4.png")
$w4 = $img4.Width
$h4 = $img4.Height
$midX4 = [int]($w4 / 2)
$img4.Dispose()

SplitAndSave "backend\uploads\periodic\raw_4.png" (New-Object System.Drawing.Rectangle(0, 0, $midX4, $h4)) "page32" 3
SplitAndSave "backend\uploads\periodic\raw_4.png" (New-Object System.Drawing.Rectangle($midX4, 0, ($w4 - $midX4), $h4)) "page33" 3

# Image 5 (227 x 208) -> Page 34
SplitAndSave "backend\uploads\periodic\raw_5.png" (New-Object System.Drawing.Rectangle(0, 0, 227, 208)) "page34" 3

Write-Host "All pages split and upscaled!"

