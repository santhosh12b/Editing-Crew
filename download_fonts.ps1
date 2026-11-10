$headers = @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
$url = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap'
$css = (Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing).Content

New-Item -ItemType Directory -Force -Path 'public\fonts' | Out-Null

$regex = 'url\((https://[^\)]+\.woff2)\)'
$matches = [regex]::Matches($css, $regex)

$i = 1
foreach ($match in $matches) {
    $fontUrl = $match.Groups[1].Value
    $filename = "font_$i.woff2"
    $filepath = Join-Path 'public\fonts' $filename
    Invoke-WebRequest -Uri $fontUrl -OutFile $filepath -UseBasicParsing
    $css = $css.Replace($fontUrl, "/fonts/$filename")
    $i++
}

$css | Out-File -FilePath 'public\fonts\fonts.css' -Encoding utf8
Write-Output "Successfully downloaded $($i - 1) fonts and created fonts.css!"
