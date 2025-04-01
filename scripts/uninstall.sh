#!/bin/bash

# Exit on error
set -e

echo "Removing extension symlink..."
rm -f "$HOME/.vscode/extensions/vscode-plugin-dash"

echo "Extension uninstalled successfully!"
echo "Please reload VSCode to complete the uninstallation." 