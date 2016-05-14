
// Server private functions
function _resComplete(e, req, res, html){
  if (e){ 
    _handleErrors(e, res);
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(html);
  }
}

// TODO: Create custom HTML errors, rather than inserting name/msg each time
function _handleErrors(e, res){
  console.log('Error', e.name, e.message);
  if (e.name === 'MethodNotAllowedError') {
    // Method not allowed
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.write(e + '\n');
    res.end();
  } else if (e.name === 'FileNotFoundError') {
    // File not found
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write(e + '\n');
    res.end();
  } else if (e.name === 'UnprocessableEntityError') {
    // Unprocessable entity
    let html = HtmlGen.getNoPostVarHtml(e.message);
    res.writeHead(422, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
  } else if (e.name === 'EntityTooLargeError') {
    // Request entity too large
    res.writeHead(413, {'Content-Type': 'text/plain'});
    res.write(e + '\n');
    res.end();
    req.connection.destroy();
  }
  else {
    // All other errors
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.write(e + '\n');
    res.end();
  }
}

export default {
  handleErrors: _handleErrors,
  resComplete: _resComplete
}