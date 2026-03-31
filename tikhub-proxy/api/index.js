export default function handler(req, res) {
  const url = req.url || '/'
  const target = 'https://api.tikhub.io' + url.replace(/^\/api\/index/, '').replace(/^\/api/, '')

  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  }

  const auth = req.headers['authorization']
  if (auth) {
    headers['Authorization'] = auth
  }

  return fetch(target, { method: 'GET', headers })
    .then(resp => resp.text().then(data => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-Type', 'application/json')
      res.status(resp.status).send(data)
    }))
    .catch(e => {
      res.status(500).json({ error: e.message })
    })
}
