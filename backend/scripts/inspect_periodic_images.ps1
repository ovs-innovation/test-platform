Add-Type -AssemblyName System.Drawing

$files = @(
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793440898961_5221576a.png',
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793440913494_9add25a7.png',
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793440957524_30c5dc2a.png',
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793440989041_f487f3d2.png',
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793441006702_c9c44854.png'
)

$outDir = "backend\uploads\periodic"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

$i = 1
foreach ($f in $files) {
  $img = [System.Drawing.Bitmap]::FromFile($f)
  Write-Host "Image $i : $($img.Width) x $($img.Height)"
  $img.Save("$outDir\raw_$i.png", [System.Drawing.Imaging.ImageFormat]::Png)
  $img.Dispose()
  $i++
}
Write-Host "Saved raw images to $outDir"

