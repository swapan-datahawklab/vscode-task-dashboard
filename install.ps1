# Clone the repository
git clone https://github.com/swapan-datahawklab/vscode-task-dashboard.git
cd vscode-task-dashboard

# Install dependencies
npm install

# Compile the extension
npm run compile

# Create junction to VSCode extensions directory
New-Item -ItemType Junction -Path "$env:USERPROFILE\.vscode\extensions\vscode-plugin-dash" -Target "$(pwd)" -Force

Write-Host "Task Dashboard extension installed successfully!"
Write-Host "Please reload VSCode to use the extension." 