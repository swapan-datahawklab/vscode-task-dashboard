# Exit on error
$ErrorActionPreference = "Stop"

# Check prerequisites
function Test-Command {
    param ($Command)
    $null = Get-Command -Name $Command -ErrorAction SilentlyContinue
    return $?
}

if (-not (Test-Command "git")) {
    Write-Error "Error: git is required but not installed. Aborting."
    exit 1
}

if (-not (Test-Command "node")) {
    Write-Error "Error: node is required but not installed. Aborting."
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Error "Error: npm is required but not installed. Aborting."
    exit 1
}

# Clone the repository
Write-Host "Cloning repository..."
git clone https://github.com/swapan-datahawklab/vscode-task-dashboard.git
Set-Location vscode-task-dashboard

# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Compile the extension
Write-Host "Compiling extension..."
npm run compile

# Create junction to VSCode extensions directory
Write-Host "Creating junction..."
$extensionsPath = Join-Path $env:USERPROFILE ".vscode\extensions"
New-Item -ItemType Directory -Path $extensionsPath -Force | Out-Null
New-Item -ItemType Junction -Path (Join-Path $extensionsPath "vscode-plugin-dash") -Target (Get-Location) -Force | Out-Null

Write-Host "Task Dashboard extension installed successfully!"
Write-Host "Please reload VSCode to use the extension." 