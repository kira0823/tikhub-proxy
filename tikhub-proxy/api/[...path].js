export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    return res.status(200).end()
  }

  const url = new URL(req.url, `http://${req.headers.host}`)
  const target = 'https://api.tikhub.io' + url.pathname + url.search

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