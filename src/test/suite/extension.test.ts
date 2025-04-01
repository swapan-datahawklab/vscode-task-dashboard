import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', async () => {
        const ext = vscode.extensions.getExtension('vscode-plugin-dash.vscode-plugin-dash');
        assert.ok(ext, 'Extension should be present');
        await ext?.activate();
    });

    test('Should register commands', async () => {
        const commands = await vscode.commands.getCommands();
        assert.ok(commands.includes('vscode-plugin-dash.showDashboard'), 'Show dashboard command not found');
        assert.ok(commands.includes('vscode-plugin-dash.refresh'), 'Refresh command not found');
    });

    test('Should create webview panel', async () => {
        const panel = await vscode.commands.executeCommand('vscode-plugin-dash.showDashboard');
        assert.ok(panel, 'Webview panel should be created');
    });
}); 