Add-Type -AssemblyName System.Drawing

$files = @(
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684831_91890cc9.png',
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684860_b5162862.png',
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684872_70e227e9.png',
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684911_08dd609d.png',
  'C:\Users\rs004\.gemini\antigravity\brain\ea114050-c04d-40cb-bb53-743bed972f43\.user_uploaded\media_1793437684922_b8f1f4ec.png'
)

$idx = 1
foreach ($f in $files) {
  $img = [System.Drawing.Image]::FromFile($f)
  Write-Host "Image $idx : $($img.Width) x $($img.Height)"
  $img.Dispose()
  $idx++
}

