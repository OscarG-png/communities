import path from 'node:path';
import { app, BrowserWindow } from 'electron';

function createWindow(): void {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
	createWindow();
});
