Add-Type -AssemblyName System.Drawing

$outDir = "c:\Users\rs004\OneDrive\Desktop\test-platform\backend\uploads\structure_of_atom"

function Crop-Image($srcPath, $x, $y, $w, $h, $destPath) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $rect = [System.Drawing.Rectangle]::new([int]$x, [int]$y, [int]$w, [int]$h)
    $dest = [System.Drawing.Bitmap]::new([int]$w, [int]$h)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.DrawImage($src, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    $src.Dispose()
    Write-Output "Saved: $destPath ($w x $h)"
}

# Image 1: media_1793435652976_576ab8f9.png (Pages 10, 11)
$img1 = "C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793435652976_576ab8f9.png"
$bmp1 = [System.Drawing.Bitmap]::FromFile($img1)
$w1 = $bmp1.Width
$h1 = $bmp1.Height
$bmp1.Dispose()
Write-Output "Image 1 size: $w1 x $h1"
$halfW1 = [int]($w1 / 2)
Crop-Image $img1 0 0 $halfW1 $h1 "$outDir\page10.png"
Crop-Image $img1 $halfW1 0 ($w1 - $halfW1) $h1 "$outDir\page11.png"

# Image 2: media_1793435682481_6ffad59b.jpg (Pages 12, 13 top, Pages 14, 15 bottom)
$img2 = "C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793435682481_6ffad59b.jpg"
$bmp2 = [System.Drawing.Bitmap]::FromFile($img2)
$w2 = $bmp2.Width
$h2 = $bmp2.Height
$bmp2.Dispose()
Write-Output "Image 2 size: $w2 x $h2"
$halfW2 = [int]($w2 / 2)
$halfH2 = [int]($h2 / 2)
Crop-Image $img2 0 0 $halfW2 $halfH2 "$outDir\page12.png"
Crop-Image $img2 $halfW2 0 ($w2 - $halfW2) $halfH2 "$outDir\page13.png"
Crop-Image $img2 0 $halfH2 $halfW2 ($h2 - $halfH2) "$outDir\page14.png"
Crop-Image $img2 $halfW2 $halfH2 ($w2 - $halfW2) ($h2 - $halfH2) "$outDir\page15.png"

# Image 3: media_1793435700890_c97b63c1.png (Pages 16, 17 top, Pages 18, 19 bottom)
$img3 = "C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793435700890_c97b63c1.png"
$bmp3 = [System.Drawing.Bitmap]::FromFile($img3)
$w3 = $bmp3.Width
$h3 = $bmp3.Height
$bmp3.Dispose()
Write-Output "Image 3 size: $w3 x $h3"
$halfW3 = [int]($w3 / 2)
$halfH3 = [int]($h3 / 2)
Crop-Image $img3 0 0 $halfW3 $halfH3 "$outDir\page16.png"
Crop-Image $img3 $halfW3 0 ($w3 - $halfW3) $halfH3 "$outDir\page17.png"
Crop-Image $img3 0 $halfH3 $halfW3 ($h3 - $halfH3) "$outDir\page18.png"
Crop-Image $img3 $halfW3 $halfH3 ($w3 - $halfW3) ($h3 - $halfH3) "$outDir\page19.png"

# Image 4: media_1793435714088_b4b1b2c6.jpg (Pages 20, 21)
$img4 = "C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793435714088_b4b1b2c6.jpg"
$bmp4 = [System.Drawing.Bitmap]::FromFile($img4)
$w4 = $bmp4.Width
$h4 = $bmp4.Height
$bmp4.Dispose()
Write-Output "Image 4 size: $w4 x $h4"
$halfW4 = [int]($w4 / 2)
Crop-Image $img4 0 0 $halfW4 $h4 "$outDir\page20.png"
Crop-Image $img4 $halfW4 0 ($w4 - $halfW4) $h4 "$outDir\page21.png"

