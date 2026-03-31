module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const url = req.url.replace(/^\/api/, '')
  const target = 'https://api.tikhub.io' + url

  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  }

  const auth = req.headers['authorization']
  if (auth) {
    headers['Authorization'] = auth
  }

  try {
    const resp = await fetch(target, { method: 'GET', headers })
    const data = await resp.text()
    res.setHeader('Content-Type', 'application/json')
    res.status(resp.status).send(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
