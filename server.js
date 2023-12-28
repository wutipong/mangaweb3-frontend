import { handler } from './build/handler.js';
import express from 'express';
import 'dotenv/config'
import proxy from 'express-http-proxy';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

app.use('/api', proxy(process.env.PUBLIC_BACKEND_URL, {
    proxyReqPathResolver: (req) => req.url.replace(/^\/api/, '')
}));

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});