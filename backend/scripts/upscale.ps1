Add-Type -AssemblyName System.Drawing

function Upscale-Image($inFile, $outFile, $scale) {
    $src = [System.Drawing.Bitmap]::FromFile($inFile)
    $w = [int]($src.Width * $scale)
    $h = [int]($src.Height * $scale)
    $dest = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($src, 0, 0, $w, $h)
    $g.Dispose()
    $dest.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    $src.Dispose()
    Write-Host "Upscaled $inFile to $outFile ($w x $h)"
}

Upscale-Image "backend\uploads\equilibrium\new_pages\page_new1.png" "backend\uploads\equilibrium\new_pages\page_new1_4x.png" 4
Upscale-Image "backend\uploads\equilibrium\new_pages\page_new2.png" "backend\uploads\equilibrium\new_pages\page_new2_4x.png" 4

