const express = require('express')
const fs = require('fs')
const app = express()

/**
 * Route serving video retrieve.
 * @name get/video
 * @function
 * @memberof module:routers/video~videosRouter
 * @param {string} id - Video identifier
 * @returns Video streamed
 */
app.get('/video', function(req, res) {
  var id = req.query.id;
  console.log(`Requesting video with id ${id}`);
  if (id) {
    const path = `assets/${id}.mp4`;
    if (fs.existsSync(path)) {
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ message: 'File with indentifier `id` does not exist.' })); 
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: '`id` query parameter not found.' }));
  }
})

app.listen(process.env.PORT || 8082, function() {
  console.log('[Video Stream Server] Listening...')
});
