#!/bin/bash

# Clone the repository
git clone https://github.com/swapan-datahawklab/vscode-task-dashboard.git
cd vscode-task-dashboard

# Install dependencies
npm install

# Compile the extension
npm run compile

# Create symlink to VSCode extensions directory
ln -s "$(pwd)" "$HOME/.vscode/extensions/vscode-plugin-dash"

echo "Task Dashboard extension installed successfully!"
echo "Please reload VSCode to use the extension." 