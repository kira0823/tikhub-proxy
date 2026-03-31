module.exports = function handler(req, res) {
  const parsed = new URL(req.url, 'http://localhost')
  parsed.searchParams.delete('path')
  
  let path = parsed.pathname
  if (path.startsWith('/api/index')) {
    path = path.replace('/api/index', '')
  }
  if (path.startsWith('/api') && !path.startsWith('/api/v1')) {
    path = path.replace(/^\/api/, '')
  }
  if (!path.startsWith('/')) {
    path = '/' + path
  }

  const target = 'https://api.tikhub.io' + path + '?' + parsed.searchParams.toString()

  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  }

  const auth = req.headers['authorization']
  if (auth) {
    headers['Authorization'] = auth
  }

  fetch(target, { method: 'GET', headers: headers })
    .then(function(resp) {
      return resp.text().then(function(data) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json')
        res.status(resp.status).send(data)
      })
    })
    .catch(function(e) {
      res.status(500).json({ error: e.message })
    })
}
