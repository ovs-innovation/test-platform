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

$results = @()
for ($i = 1; $i -le 10; $i++) {
    $pNum = "{0:D3}" -f $i
    $imgPath = (Resolve-Path "backend/scripts/vector_pages/page_$pNum.png").Path
    $bytes = [System.IO.File]::ReadAllBytes($imgPath)
    $ras = [Windows.Storage.Streams.InMemoryRandomAccessStream]::new()
    $writer = [Windows.Storage.Streams.DataWriter]::new($ras)
    $writer.WriteBytes($bytes)
    $null = Await ($writer.StoreAsync()) ([System.UInt32])
    $null = Await ($writer.FlushAsync()) ([System.Boolean])
    $ras.Seek(0)
    $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($ras)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $ocrResult = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    
    $lines = @()
    foreach ($line in $ocrResult.Lines) {
        $lines += $line.Text
    }
    $results += [PSCustomObject]@{
        page = $i
        text = $ocrResult.Text
        lines = $lines
    }
    Write-Output "Processed page $i"
}

$results | ConvertTo-Json -Depth 5 | Out-File -FilePath "backend/scripts/sample_ocr_10.json" -Encoding utf8
Write-Output "Done 10 pages!"
