// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'

const jar = new CookieJar()

const posUrl = c => `Posicao/Linha?codigoLinha=${c}`
const authUrl = `Login/Autenticar?token=${process.env.SPTRANS_TOKEN}`

const codes = [
  2023,   // 8012-10-2
  34791,  // 8012-10-1
  2085,   // 8022-10-2
  34853,  // 8022-10-1
  2545,   // 8032-10-2
  35313,  // 8032-10-1
]

const client = wrapper(axios.create({
  baseURL: 'http://api.olhovivo.sptrans.com.br/v2.1/',
  timeout: 3000,
  jar: jar
}))


export default async function handler(req, res) {
  try {
    await client.post(authUrl)

    const requests = codes.map(v => client.get(posUrl(v)))
    const responses = await Promise.all(requests)
    const data = responses.map(({ data }) => data)

    const aggregate = data.map((v, i) => {
      v['cl'] = codes[i]
      return v
    })

    res.send(aggregate)
  } catch (e) {
    console.log(e.request?.res?.responseUrl)
    console.log(e.response?.data?.Message)
    res.send('error')
  }
}
