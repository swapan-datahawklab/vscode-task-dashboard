#!/bin/bash

# Exit on error
set -e

# Check prerequisites
command -v git >/dev/null 2>&1 || { echo "Error: git is required but not installed. Aborting." >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Error: node is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Error: npm is required but not installed. Aborting." >&2; exit 1; }

# Clone the repository
echo "Cloning repository..."
git clone https://github.com/swapan-datahawklab/vscode-task-dashboard.git
cd vscode-task-dashboard

# Install dependencies
echo "Installing dependencies..."
npm install

# Compile the extension
echo "Compiling extension..."
npm run compile

# Create symlink to VSCode extensions directory
echo "Creating symlink..."
mkdir -p "$HOME/.vscode/extensions"
ln -sf "$(pwd)" "$HOME/.vscode/extensions/vscode-plugin-dash"

echo "Task Dashboard extension installed successfully!"
echo "Please reload VSCode to use the extension." 