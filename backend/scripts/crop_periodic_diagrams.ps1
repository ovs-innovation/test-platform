Add-Type -AssemblyName System.Drawing

$outDir = "backend\uploads\periodic\diagrams"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

function CropBmp($inFile, $rect, $outFile) {
    $src = [System.Drawing.Bitmap]::FromFile($inFile)
    $dest = $src.Clone($rect, $src.PixelFormat)
    $src.Dispose()
    $dest.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Saved: $outFile"
}

# 1. Q1 graphs from page23.png (1371 x 1611)
# Q1 options are located in the left column between y ~ 340 and 1000, x ~ 50 to 650
CropBmp "backend\uploads\periodic\pages\page23.png" (New-Object System.Drawing.Rectangle(60, 320, 600, 680)) "$outDir\pt_q1.png"

# 2. Q14 graph from page24.png (684 x 969)
# Q14 is on left column around y ~ 180 to 250, x ~ 20 to 180
CropBmp "backend\uploads\periodic\pages\page24.png" (New-Object System.Drawing.Rectangle(20, 180, 170, 75)) "$outDir\pt_q14.png"

# 3. Q17 graph from page24.png (684 x 969)
# Q17 is on left column around y ~ 380 to 450, x ~ 60 to 180
CropBmp "backend\uploads\periodic\pages\page24.png" (New-Object System.Drawing.Rectangle(60, 380, 120, 65)) "$outDir\pt_q17.png"

Write-Host "Diagrams cropped!"

