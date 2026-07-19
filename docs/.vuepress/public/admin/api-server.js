import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3001;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function scanDirectory(dirPath, relativePath = '') {
  const items = [];
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relPath = relativePath ? path.join(relativePath, entry.name) : entry.name;
      
      if (entry.isDirectory()) {
        items.push({
          name: entry.name,
          path: relPath,
          type: 'dir'
        });
      } else if (entry.name.endsWith('.md')) {
        items.push({
          name: entry.name,
          path: relPath,
          type: 'file'
        });
      }
    }
  } catch (error) {
    console.error('Error scanning directory:', error);
  }
  
  return items;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const pathname = new URL(req.url, `http://localhost:${PORT}`).pathname;

  try {
    if (pathname === '/api/local-files' && req.method === 'POST') {
      const body = await parseBody(req);
      const dirPath = body.path;
      
      if (!dirPath || !fs.existsSync(dirPath)) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid path' }));
        return;
      }

      const files = scanDirectory(dirPath);
      res.writeHead(200);
      res.end(JSON.stringify(files));

    } else if (pathname === '/api/local-file' && req.method === 'POST') {
      const body = await parseBody(req);
      const filePath = body.path;

      if (!filePath || !fs.existsSync(filePath)) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'File not found' }));
        return;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      res.writeHead(200);
      res.end(JSON.stringify({ content }));

    } else if (pathname === '/api/local-file' && req.method === 'PUT') {
      const body = await parseBody(req);
      const filePath = body.path;
      const content = body.content;

      if (!filePath) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid path' }));
        return;
      }

      fs.writeFileSync(filePath, content, 'utf-8');
      res.writeHead(200);
      res.end(JSON.stringify({ success: true }));

    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Local file API server running on http://localhost:${PORT}`);
});