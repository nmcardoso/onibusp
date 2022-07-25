// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'
import { BUS_LINES_ARRAY } from '../../utils/constants'

const jar = new CookieJar()

const posUrl = c => `Posicao/Linha?codigoLinha=${c}`
const authUrl = `Login/Autenticar?token=${process.env.SPTRANS_TOKEN}`

const client = wrapper(axios.create({
  baseURL: 'http://api.olhovivo.sptrans.com.br/v2.1/',
  timeout: 3000,
  jar: jar
}))


export default async function handler(req, res) {
  try {
    await client.post(authUrl)

    const requests = BUS_LINES_ARRAY.map(lineCode => client.get(posUrl(lineCode)))
    const responses = await Promise.all(requests)
    const data = responses.map(({ data }) => data)

    const aggregate = data.map((v, i) => {
      v['cl'] = BUS_LINES_ARRAY[i]
      return v
    })

    res.send(aggregate)
  } catch (e) {
    console.log(e.request?.res?.responseUrl)
    console.log(e.response?.data?.Message)
    res.send('error')
  }
}
