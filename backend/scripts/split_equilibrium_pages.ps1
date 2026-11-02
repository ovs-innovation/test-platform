Add-Type -AssemblyName System.Drawing

$outDir = "backend/uploads/equilibrium"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir }

# Image 1 (695 x 492) -> 2 pages side-by-side: Page 74, Page 75
$img1 = [System.Drawing.Image]::FromFile('C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684831_91890cc9.png')
$midX = [int]($img1.Width / 2)

function CropAndSave($sourceImg, $rect, $outPath) {
  $bmp = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($sourceImg, (New-Object System.Drawing.Rectangle(0, 0, $rect.Width, $rect.Height)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Saved: $outPath"
}

CropAndSave $img1 (New-Object System.Drawing.Rectangle(0, 0, $midX, $img1.Height)) "$outDir/page74.png"
CropAndSave $img1 (New-Object System.Drawing.Rectangle($midX, 0, ($img1.Width - $midX), $img1.Height)) "$outDir/page75.png"
$img1.Dispose()

# Helper for 4-page grid (2 rows x 2 cols)
function Split4($filePath, $p1, $p2, $p3, $p4) {
  $img = [System.Drawing.Image]::FromFile($filePath)
  $midX = [int]($img.Width / 2)
  $midY = [int]($img.Height / 2)

  # Top-left
  CropAndSave $img (New-Object System.Drawing.Rectangle(0, 0, $midX, $midY)) "$outDir/$p1.png"
  # Top-right
  CropAndSave $img (New-Object System.Drawing.Rectangle($midX, 0, ($img.Width - $midX), $midY)) "$outDir/$p2.png"
  # Bottom-left
  CropAndSave $img (New-Object System.Drawing.Rectangle(0, $midY, $midX, ($img.Height - $midY))) "$outDir/$p3.png"
  # Bottom-right
  CropAndSave $img (New-Object System.Drawing.Rectangle($midX, $midY, ($img.Width - $midX), ($img.Height - $midY))) "$outDir/$p4.png"
  $img.Dispose()
}

Split4 'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684860_b5162862.png' "page76" "page77" "page78" "page79"
Split4 'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684872_70e227e9.png' "page80" "page81" "page82" "page83"
Split4 'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684911_08dd609d.png' "page84" "page85" "page86" "page87"
Split4 'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684922_b8f1f4ec.png' "page88" "page89" "page90" "page91"

Write-Host "All pages split successfully!"

