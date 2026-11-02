Add-Type -AssemblyName System.Drawing

$f1 = "C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793439276267_9db46197.png"
$f2 = "C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793439292682_aa197090.png"

$b1 = [System.Drawing.Bitmap]::FromFile($f1)
$b2 = [System.Drawing.Bitmap]::FromFile($f2)

Write-Host "Img1: $($b1.Width) x $($b1.Height)"
Write-Host "Img2: $($b2.Width) x $($b2.Height)"

$outDir = "backend\uploads\equilibrium\new_pages"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$b1.Save("$outDir\page_new1.png", [System.Drawing.Imaging.ImageFormat]::Png)
$b2.Save("$outDir\page_new2.png", [System.Drawing.Imaging.ImageFormat]::Png)

$b1.Dispose()
$b2.Dispose()
Write-Host "Saved to $outDir"

