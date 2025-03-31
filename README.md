# VSCode Task Dashboard

A Visual Studio Code extension that provides a dashboard for running tasks with clickable buttons.

## Features

- Clean and modern task dashboard interface
- Clickable task cards to run commands
- Visual feedback for task execution
- Customizable task list
- VSCode theme-aware styling

## Usage

1. Install the extension
2. Click on the Task Dashboard icon in the activity bar (sidebar)
3. Click on any task card to run the corresponding task

## Customization

To customize the tasks, edit the `_getTasks()` method in `src/extension.ts`. Each task should have:

- `id`: A unique identifier
- `name`: Display name of the task
- `command`: The VSCode command to execute
- `description`: A brief description of what the task does

## Development

1. Clone the repository
2. Run `npm install`
3. Press F5 to start debugging
4. Make your changes
5. Press Ctrl+Shift+B to build

## Packaging and Installation

### For Development
1. Run `npm install` to install dependencies
2. Press F5 in VSCode to launch the extension in debug mode

### Creating a Package
1. Install vsce: `npm install -g @vscode/vsce`
2. Run `npm install` to ensure dependencies are up to date
3. Run `vsce package` to create a .vsix file

### Installing the Extension
Method 1 (Command Line):
```bash
code --install-extension vscode-task-dashboard-0.0.1.vsix
```

Method 2 (VSCode UI):
1. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
2. Type "Install from VSIX"
3. Select the .vsix file
4. Restart VSCode

### Uninstalling
1. Open Extensions (Ctrl+Shift+X)
2. Find "Task Dashboard"
3. Click the gear icon and select "Uninstall"

## Requirements

- VSCode 1.85.0 or higher 