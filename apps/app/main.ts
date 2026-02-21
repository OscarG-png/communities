import { app, BrowserWindow } from 'electron';
import path from 'path';

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
