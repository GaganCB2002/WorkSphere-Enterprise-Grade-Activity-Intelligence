# WorkSphere Enterprise - Full Project Orchestrator (PowerShell)

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "   WorkSphere Enterprise Command Portal Launcher   " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

Set-Location -LiteralPath "$root\..\..\.."

Start-Process "cmd.exe" -ArgumentList "/c run_all.bat"

Write-Host "Enterprise launcher triggered successfully." -ForegroundColor Green
