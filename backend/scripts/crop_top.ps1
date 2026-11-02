Add-Type -AssemblyName System.Drawing

$b = [System.Drawing.Bitmap]::FromFile("backend\uploads\equilibrium\new_pages\page_new1.png")
$rect = New-Object System.Drawing.Rectangle(0, 0, 130, 80)
$c = $b.Clone($rect, $b.PixelFormat)
$c.Save("backend\uploads\equilibrium\new_pages\q_top.png")
$c.Dispose()
$b.Dispose()
Write-Host "Saved q_top.png"

