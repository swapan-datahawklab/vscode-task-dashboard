import * as vscode from 'vscode';
import { TaskDashboardProvider } from './taskDashboardProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Task Dashboard extension is now active!');

    const provider = new TaskDashboardProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-plugin-dash.showDashboard', () => {
            const panel = vscode.window.createWebviewPanel(
                'taskDashboard',
                'Task Dashboard',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );

            panel.webview.html = provider.getHtmlContent(panel.webview);
            panel.onDidDispose(() => {
                // Clean up resources if needed
            }, null, context.subscriptions);

            return panel;
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-plugin-dash.refresh', () => {
            provider.refresh();
        })
    );

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('taskDashboard', provider)
    );
}

export function deactivate() {} 