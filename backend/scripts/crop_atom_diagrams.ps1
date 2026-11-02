Add-Type -AssemblyName System.Drawing

$atomDir = "c:\Users\rs004\OneDrive\Desktop\test-platform\backend\uploads\structure_of_atom"
$feDir = "c:\Users\rs004\OneDrive\Desktop\test-platform\frontend\public\uploads\structure_of_atom"

function Crop-Snippet($srcPage, $relX, $relY, $relW, $relH, $outName) {
    $src = [System.Drawing.Bitmap]::FromFile("$atomDir\$srcPage")
    $x = [int]($src.Width * $relX)
    $y = [int]($src.Height * $relY)
    $w = [int]($src.Width * $relW)
    $h = [int]($src.Height * $relH)
    
    $rect = [System.Drawing.Rectangle]::new($x, $y, $w, $h)
    $dest = [System.Drawing.Bitmap]::new($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.DrawImage($src, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $dest.Save("$atomDir\$outName.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Save("$feDir\$outName.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    $src.Dispose()
    Write-Output "Cropped $outName ($w x $h)"
}

# Q3 from page10: middle-left
Crop-Snippet "page10.png" 0.05 0.44 0.45 0.18 "atom_q3"

# Q11 from page10: bottom-right
Crop-Snippet "page10.png" 0.52 0.85 0.46 0.12 "atom_q11"

# Q20 from page11: top-right of page11
Crop-Snippet "page11.png" 0.54 0.35 0.35 0.12 "atom_q20"

# Q26 from page12: middle-left
Crop-Snippet "page12.png" 0.05 0.68 0.40 0.12 "atom_q26"

# Q41 from page13: bottom-middle
Crop-Snippet "page13.png" 0.05 0.65 0.45 0.30 "atom_q41"

# Q51 from page14: bottom-left
Crop-Snippet "page14.png" 0.05 0.84 0.35 0.08 "atom_q51"

# Q74 from page16: top-left
Crop-Snippet "page16.png" 0.08 0.03 0.35 0.10 "atom_q74"

# Q76 from page16: upper-left
Crop-Snippet "page16.png" 0.05 0.20 0.45 0.10 "atom_q76"

# Q118 from page19: middle-left
Crop-Snippet "page19.png" 0.05 0.68 0.45 0.28 "atom_q118"

