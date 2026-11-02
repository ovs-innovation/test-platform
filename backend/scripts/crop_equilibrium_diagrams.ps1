Add-Type -AssemblyName System.Drawing

$outDir = "backend/uploads/equilibrium/diagrams"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir }

function CropAndSave($sourcePath, $x, $y, $w, $h, $outPath) {
  $sourceImg = [System.Drawing.Image]::FromFile($sourcePath)
  $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
  $bmp = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($sourceImg, (New-Object System.Drawing.Rectangle(0, 0, $rect.Width, $rect.Height)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $sourceImg.Dispose()
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Saved diagram: $outPath"
}

# page76 is 245 x 346: Q38 graph is located in bottom-left or right column around y: 180..260
# Let's inspect page76 width and height first
$p76 = [System.Drawing.Image]::FromFile('backend/uploads/equilibrium/page76.png')
Write-Host "Page 76: $($p76.Width) x $($p76.Height)"
$p76.Dispose()

# Q38 on page 76: right column, middle
CropAndSave 'backend/uploads/equilibrium/page76.png' 145 180 85 50 "$outDir/eq_q38.png"

# page79: Q68 pH curve (middle of page, left column)
# Q75 4 graphs (bottom of right column)
CropAndSave 'backend/uploads/equilibrium/page79.png' 20 220 95 65 "$outDir/eq_q68.png"
CropAndSave 'backend/uploads/equilibrium/page79.png' 130 240 110 50 "$outDir/eq_q75.png"

# page80: Q80 4 graphs (left column)
# Q86 titration curve (middle of page, right column)
CropAndSave 'backend/uploads/equilibrium/page80.png' 5 70 110 90 "$outDir/eq_q80.png"
CropAndSave 'backend/uploads/equilibrium/page80.png' 135 110 85 65 "$outDir/eq_q86.png"

# page83: Q123 4 graphs (right column)
CropAndSave 'backend/uploads/equilibrium/page83.png' 130 215 110 75 "$outDir/eq_q123.png"

Write-Host "All initial crops completed!"

