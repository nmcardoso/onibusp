// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'
import { BL_IDS } from '../../utils/constants'

const jar = new CookieJar()

const posUrl = c => `Posicao/Linha?codigoLinha=${c}`
const authUrl = `Login/Autenticar?token=${process.env.SPTRANS_TOKEN}`

const client = wrapper(axios.create({
  baseURL: 'http://api.olhovivo.sptrans.com.br/v2.1/',
  timeout: 6000,
  jar: jar
}))

const MS_PER_MINUTE = 60000
let lastAuth = null

const auth = async () => {
  const now = new Date()
  const maxAge = new Date(now - 60 * MS_PER_MINUTE)

  if (!lastAuth || lastAuth < maxAge) {
    await client.post(authUrl)
    lastAuth = now
  }
}

// força os ônibus circulares a terem o mesmo código de linha mapeando
// o código de um para outro
let maskedIds = [...BL_IDS]
maskedIds[BL_IDS.indexOf(35313)] = 2545

let lastResponse = null
let cachedResponse = null


export default async function handler(req, res) {
  try {
    await auth()

    const now = new Date()
    if (!lastResponse || lastResponse < now - 3200) {
      const requests = BL_IDS.map(lineId => client.get(posUrl(lineId)))
      const responses = await Promise.all(requests)
      const data = responses.map(({ data }) => data)

      const aggregate = data.map((v, i) => {
        v['cl'] = maskedIds[i]
        return v
      })

      cachedResponse = aggregate
      lastResponse = now
      res.json(aggregate)
    } else {
      res.json(cachedResponse)
    }
  } catch (e) {
    console.log(e.message)
    console.log(e.request?.res?.responseUrl)
    console.log(e.response?.data?.Message)
    res.send('error')
  }
}
