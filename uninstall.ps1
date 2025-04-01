# Exit on error
$ErrorActionPreference = "Stop"

Write-Host "Removing extension junction..."
$extensionPath = Join-Path $env:USERPROFILE ".vscode\extensions\vscode-plugin-dash"
if (Test-Path $extensionPath) {
    Remove-Item -Path $extensionPath -Force
}

Write-Host "Extension uninstalled successfully!"
Write-Host "Please reload VSCode to complete the uninstallation." 