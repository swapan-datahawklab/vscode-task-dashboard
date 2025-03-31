import * as vscode from 'vscode';
import * as path from 'path';

interface Task {
    id: string;
    name: string;
    command: string;
    description: string;
}

class TaskDashboardProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'taskDashboard';

    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
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

    private async _runTask(taskId: string) {
        const task = this._getTasks().find(t => t.id === taskId);
        if (task) {
            try {
                await vscode.commands.executeCommand(task.command);
                vscode.window.showInformationMessage(`Task "${task.name}" started successfully`);
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to run task "${task.name}": ${error}`);
            }
        }
    }

    private _getTasks(): Task[] {
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

    private _getHtmlForWebview(webview: vscode.Webview) {
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

export function activate(context: vscode.ExtensionContext) {
    const provider = new TaskDashboardProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(TaskDashboardProvider.viewType, provider)
    );

    let disposable = vscode.commands.registerCommand('taskDashboard.refresh', () => {
        vscode.commands.executeCommand('workbench.action.webview.refresh');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {} 