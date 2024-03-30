import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';

export default {
    resolve: {
        alias: {
            src: path.join(__dirname, 'src'),
        },
    },
    plugins: [
        react(),
        electron({
            main: {
                entry: 'electron/index.js',
            },
            preload: {
                input: 'electron/preload.js',
            },
        }),
    ],
    server: {
        host: 'localhost',
        port: 3000,
    },
};
