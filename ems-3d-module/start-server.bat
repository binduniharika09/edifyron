@echo off
title Smart EMS 3D Module Server
echo ========================================================
echo   Starting Smart Industrial EMS 3D Digital Twin Server
echo ========================================================
echo.
echo Opening http://localhost:8080/ in your browser...
start http://localhost:8080/
powershell -NoProfile -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://*:8080/'); $listener.Start(); Write-Host 'Server running at http://localhost:8080/ (Press Ctrl+C to stop)'; while($listener.IsListening){ $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response; $path = '.' + $req.RawUrl.Split('?')[0]; if($path -eq './'){$path = './index.html'}; if(Test-Path $path){ $bytes = [System.IO.File]::ReadAllBytes($path); $ext = [System.IO.Path]::GetExtension($path); switch($ext){ '.html'{$res.ContentType='text/html'} '.js'{$res.ContentType='application/javascript'} '.css'{$res.ContentType='text/css'} '.json'{$res.ContentType='application/json'} default{$res.ContentType='application/octet-stream'} } $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.Close() }"
pause
