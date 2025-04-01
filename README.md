# VSCode Task Dashboard Extension

A VSCode extension that provides a dashboard for running tasks with clickable buttons. This extension allows you to view and execute tasks directly from a dedicated dashboard view.

```bash
Ctrl+Shift+B: Build, Test & Deploy (default build task)
Ctrl+Shift+T: Run Tests
Ctrl+Shift+P then type "Tasks: Run Task" to see all available tasks
```

## Features

* Task Dashboard view in the activity bar
* Clickable buttons to run tasks
* Automatic task discovery
* Refresh capability to update task list
* Modern UI with VSCode theme integration

## Project Structure

The project contains the following key files and directories:

* `src/` - Core extension code
* `out/` - Compiled JavaScript
* `.vscode/` - VSCode configuration
* `package.json` and `package-lock.json` - Dependencies
* `tsconfig.json` - TypeScript configuration
* `.eslintrc.json` - Linting rules
* `LICENSE` and `README.md` - Documentation

## Development Setup

### Prerequisites

* Node.js (v14 or later)
* VSCode
* Git

### Local Development Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/vscode-plugin-dash.git
    cd vscode-plugin-dash
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Compile the extension:

    ```bash
    npm run compile
    ```

4. Create a symlink to your VSCode extensions directory:

    ```bash
    # On Windows (PowerShell as Administrator)
    New-Item -ItemType Junction -Path "$env:USERPROFILE\.vscode\extensions\vscode-plugin-dash" -Target "$(pwd)"

    # On macOS/Linux
    ln -s "$(pwd)" "$HOME/.vscode/extensions/vscode-plugin-dash"
    ```

5. Reload VSCode to load the extension

### Development Workflow

1. Start the TypeScript compiler in watch mode:

    ```bash
    npm run watch
    ```

2. Make changes to the code in the `src` directory

3. The extension will automatically reload when you:
    * Save changes to TypeScript files
    * Reload VSCode window (Command Palette -> "Developer: Reload Window")

### Testing

1. Run the test suite:

    ```bash
    npm test
    ```

2. The test suite verifies:
    * Extension presence and activation
    * Command registration
    * Webview panel creation

### Debugging

The extension provides three debugging configurations:

1. **Run Extension**:
    * Launches a new VSCode window with your extension
    * Press F5 or select "Run Extension" from the debug menu
    * Set breakpoints in your TypeScript code
    * The debugger will stop at breakpoints
    * Source maps are enabled for TypeScript debugging

2. **Extension Tests**:
    * Runs the extension's test suite
    * Select "Extension Tests" from the debug menu
    * Tests run without stopping at breakpoints
    * Useful for quick test runs

3. **Debug Extension Tests**:
    * Optimized for debugging tests
    * Select "Debug Extension Tests" from the debug menu
    * Set breakpoints in your test files
    * Tests will pause at breakpoints
    * Skips Node.js internal files during debugging

Debugging Features:

* Source maps enabled for TypeScript debugging
* Pre-launch tasks ensure code is compiled
* Integrated with the build system
* Full TypeScript debugging support
* Test debugging capabilities

## Installation

### One-Click Installation

**On Unix-based systems (Linux/macOS):**

```bash
curl -s https://raw.githubusercontent.com/swapan-datahawklab/vscode-task-dashboard/main/install.sh | bash
```

**On Windows (PowerShell):**

```powershell
Invoke-WebRequest -Uri https://raw.githubusercontent.com/swapan-datahawklab/vscode-task-dashboard/main/install.ps1 -UseBasicParsing | Invoke-Expression
```

### Manual Installation

1. Download and extract the repository
2. Open terminal in the extracted directory
3. Run `npm install`
4. Run `npm run compile`
5. Create a symlink to your VSCode extensions directory
6. Reload VSCode

### Development Installation

* Follow the [Development Setup](#development-setup) instructions
* Create a symlink to your VSCode extensions directory
* Reload VSCode

## Uninstallation

### One-Click Uninstallation

**On Unix-based systems (Linux/macOS):**

```bash
curl -s https://raw.githubusercontent.com/swapan-datahawklab/vscode-task-dashboard/main/uninstall.sh | bash
```

**On Windows (PowerShell):**

```powershell
Invoke-WebRequest -Uri https://raw.githubusercontent.com/swapan-datahawklab/vscode-task-dashboard/main/uninstall.ps1 -UseBasicParsing | Invoke-Expression
```

### Manual Uninstallation

1. Remove the symlink:

    ```bash
    # On Windows (PowerShell as Administrator)
    Remove-Item "$env:USERPROFILE\.vscode\extensions\vscode-plugin-dash"

    # On macOS/Linux
    rm "$HOME/.vscode/extensions/vscode-plugin-dash"
    ```

2. Reload VSCode

## Usage

### Using the Extension

1. Open the Task Dashboard:
    * Click the Task Dashboard icon in the activity bar
    * Or use the Command Palette (Ctrl+Shift+P) and type "Show Task Dashboard"

2. View Available Tasks:
    * The dashboard displays all available tasks in your workspace
    * Tasks are automatically discovered from your workspace configuration

3. Run Tasks:
    * Click on any task button to execute it
    * The task will run in the integrated terminal

4. Refresh Tasks:
    * Click the refresh button or use the Command Palette
    * This updates the list of available tasks

## Configuration

### Tasks

Create a `tasks.json` file in your workspace's `.vscode` directory:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build",
            "type": "npm",
            "script": "build",
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
        {
            "label": "Test",
            "type": "npm",
            "script": "test"
        }
    ]
}
```

### Launch Configuration

Create a `launch.json` file in your workspace's `.vscode` directory:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Run Extension",
            "type": "extensionHost",
            "request": "launch",
            "args": [
                "--extensionDevelopmentPath=${workspaceFolder}"
            ],
            "outFiles": [
                "${workspaceFolder}/out/**/*.js"
            ],
            "preLaunchTask": "npm: watch",
            "sourceMaps": true,
            "resolveSourceMapLocations": [
                "${workspaceFolder}/**",
                "!**/node_modules/**"
            ]
        },
        {
            "name": "Extension Tests",
            "type": "extensionHost",
            "request": "launch",
            "args": [
                "--extensionDevelopmentPath=${workspaceFolder}",
                "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
            ],
            "outFiles": [
                "${workspaceFolder}/out/test/**/*.js"
            ],
            "preLaunchTask": "npm: test",
            "sourceMaps": true,
            "resolveSourceMapLocations": [
                "${workspaceFolder}/**",
                "!**/node_modules/**"
            ]
        },
        {
            "name": "Debug Extension Tests",
            "type": "extensionHost",
            "request": "launch",
            "args": [
                "--extensionDevelopmentPath=${workspaceFolder}",
                "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
            ],
            "outFiles": [
                "${workspaceFolder}/out/test/**/*.js"
            ],
            "preLaunchTask": "npm: test",
            "sourceMaps": true,
            "resolveSourceMapLocations": [
                "${workspaceFolder}/**",
                "!**/node_modules/**"
            ],
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
    ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
