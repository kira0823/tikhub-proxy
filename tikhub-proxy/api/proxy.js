module.exports = async function handler(req, res) {
  const target = 'https://api.tikhub.io' + req.url.replace('/api/proxy', '')

  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  }

  if (req.headers.authorization) {
    headers['Authorization'] = req.headers.authorization
  }

  try {
    const resp = await fetch(target, { method: 'GET', headers })
    const data = await resp.text()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json')
    res.status(resp.status).send(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
