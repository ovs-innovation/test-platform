Add-Type -AssemblyName System.Runtime.WindowsRuntime

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]

function Await($WinRtTask, $ResultType) {
    $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
    $netTask = $asTask.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
    $netTask.Result
}

$null = [Windows.Globalization.Language, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation.winmd, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.winmd, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Foundation.winmd, ContentType = WindowsRuntime]

$lang = [Windows.Globalization.Language]::new('en-US')
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)

function RunOcr($file) {
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ras = [Windows.Storage.Streams.InMemoryRandomAccessStream]::new()
    $writer = [Windows.Storage.Streams.DataWriter]::new($ras)
    $writer.WriteBytes($bytes)
    $null = Await ($writer.StoreAsync()) ([System.UInt32])
    $null = Await ($writer.FlushAsync()) ([System.Boolean])
    $ras.Seek(0)
    $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($ras)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $ocrResult = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    return $ocrResult.Text
}

$files = Get-ChildItem "backend/scripts/real_prob_pages/*.png" | Sort-Object Name
$total = $files.Count
Write-Host "Found $total pages to OCR..."

$results = [System.Collections.Generic.Dictionary[string, string]]::new()
$i = 0

foreach ($f in $files) {
    $i++
    $txt = RunOcr $f.FullName
    $results[$f.Name] = $txt
    if ($i % 20 -eq 0 -or $i -eq $total) {
        Write-Host "Processed $i / $total pages..."
    }
}

$json = ConvertTo-Json $results -Depth 5
[System.IO.File]::WriteAllText("backend/scripts/real_prob_all_pages_ocr.json", $json)
Write-Host "OCR complete! Output saved to backend/scripts/real_prob_all_pages_ocr.json"

