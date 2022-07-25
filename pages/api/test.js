let i = 0

export default function handler(req, res) {
  i = i + 1
  res.send(String(i))
}