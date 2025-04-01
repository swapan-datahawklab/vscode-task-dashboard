import * as vscode from 'vscode';
import * as path from 'path';

export class TaskDashboardProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
    private _tasks: vscode.Task[] = [];

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

        webviewView.webview.html = this.getHtmlContent(webviewView.webview);
        this.updateTasks();
    }

    public refresh() {
        this.updateTasks();
    }

    private async updateTasks() {
        const tasks = await vscode.tasks.fetchTasks();
        this._tasks = tasks;
        if (this._view) {
            this._view.webview.html = this.getHtmlContent(this._view.webview);
        }
    }

    public getHtmlContent(webview: vscode.Webview): string {
        const tasksHtml = this._tasks.map(task => `
            <div class="task-item">
                <button onclick="runTask('${task.name}')">${task.name}</button>
            </div>
        `).join('');

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Task Dashboard</title>
            <style>
                body {
                    padding: 10px;
                    color: var(--vscode-foreground);
                    background-color: var(--vscode-editor-background);
                }
                .task-item {
                    margin: 5px 0;
                }
                button {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 8px 12px;
                    cursor: pointer;
                    width: 100%;
                    text-align: left;
                }
                button:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
            </style>
        </head>
        <body>
            <h2>Available Tasks</h2>
            <div id="tasks">
                ${tasksHtml}
            </div>
            <script>
                const vscode = acquireVsCodeApi();
                function runTask(taskName) {
                    vscode.postMessage({
                        command: 'runTask',
                        taskName: taskName
                    });
                }
            </script>
        </body>
        </html>`;
    }
} 