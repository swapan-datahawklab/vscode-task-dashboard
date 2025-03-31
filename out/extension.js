"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
class TaskDashboardProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'runTask':
                    await this._runTask(data.taskId);
                    break;
            }
        });
    }
    async _runTask(taskId) {
        const task = this._getTasks().find(t => t.id === taskId);
        if (task) {
            try {
                await vscode.commands.executeCommand(task.command);
                vscode.window.showInformationMessage(`Task "${task.name}" started successfully`);
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to run task "${task.name}": ${error}`);
            }
        }
    }
    _getTasks() {
        // This is where you would define your tasks
        return [
            {
                id: 'build',
                name: 'Build Project',
                command: 'workbench.action.tasks.runTask',
                description: 'Build the current project'
            },
            {
                id: 'test',
                name: 'Run Tests',
                command: 'workbench.action.tasks.runTask',
                description: 'Run all tests'
            },
            {
                id: 'lint',
                name: 'Lint Code',
                command: 'workbench.action.tasks.runTask',
                description: 'Run linter on the codebase'
            }
        ];
    }
    _getHtmlForWebview(webview) {
        const tasks = this._getTasks();
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Task Dashboard</title>
                <style>
                    body {
                        padding: 10px;
                        color: var(--vscode-foreground);
                        font-family: var(--vscode-font-family);
                    }
                    .task-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 10px;
                    }
                    .task-card {
                        background: var(--vscode-editor-background);
                        border: 1px solid var(--vscode-panel-border);
                        border-radius: 4px;
                        padding: 10px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .task-card:hover {
                        background: var(--vscode-list-hoverBackground);
                    }
                    .task-name {
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .task-description {
                        font-size: 0.9em;
                        color: var(--vscode-descriptionForeground);
                    }
                </style>
            </head>
            <body>
                <div class="task-grid">
                    ${tasks.map(task => `
                        <div class="task-card" onclick="runTask('${task.id}')">
                            <div class="task-name">${task.name}</div>
                            <div class="task-description">${task.description}</div>
                        </div>
                    `).join('')}
                </div>
                <script>
                    const vscode = acquireVsCodeApi();
                    function runTask(taskId) {
                        vscode.postMessage({
                            type: 'runTask',
                            taskId: taskId
                        });
                    }
                </script>
            </body>
            </html>
        `;
    }
}
TaskDashboardProvider.viewType = 'taskDashboard';
function activate(context) {
    const provider = new TaskDashboardProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(TaskDashboardProvider.viewType, provider));
    let disposable = vscode.commands.registerCommand('taskDashboard.refresh', () => {
        vscode.commands.executeCommand('workbench.action.webview.refresh');
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map