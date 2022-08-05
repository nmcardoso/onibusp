// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'
import { invertObject } from '../../utils/algorithm'

// força os ônibus circulares a terem o mesmo código de linha mapeando
// o código de um para outro.
// Chave: linha a ser substituída. Valor: linha substituta
const MASK = {
  35313: 2524, // 8032-10
  34144: 1376, // 7411-10
}
const REVERSE_MASK = invertObject(MASK)

const posUrl = c => `Posicao/Linha?codigoLinha=${c}`
const authUrl = `Login/Autenticar?token=${process.env.SPTRANS_TOKEN}`

const client = wrapper(axios.create({
  baseURL: 'http://api.olhovivo.sptrans.com.br/v2.1/',
  timeout: 6000,
  jar: new CookieJar()
}))

const AUTH_DURATION = 3600000 // 1 hour
let lastAuth = null

const auth = async () => {
  const now = new Date()

  if (!lastAuth || lastAuth < now - AUTH_DURATION) {
    await client.post(authUrl)
    lastAuth = now
  }
}

const CACHE = [] // [{data: {...}, time: new Date()}]
const CACHE_DURATION = 4500


const batchFetch = async (lineIds) => {
  const requests = lineIds.map(lineId => client.get(posUrl(lineId)))
  const responses = await Promise.all(requests)
  const data = responses.map(({ data }) => data)
  const now = new Date()

  // adiciona o campo 'cl' no objeto e remapeia os ids das linhas de 
  // ônibus circulares para o id de referência
  const preparedData = data.map((v, i) => {
    v['cl'] = lineIds[i] in MASK ? MASK[lineIds[i]] : lineIds[i]
    return v
  })

  for (let i = 0; i < preparedData.length; i++) {
    const idx = CACHE.findIndex(({ data }) => data.cl == preparedData[i].cl)
    const dataToInsert = { data: preparedData[i], time: now }
    if (idx !== -1) {
      CACHE[idx] = dataToInsert
    } else {
      CACHE.push(dataToInsert)
    }
  }

  return preparedData
}


const handlePostRequest = async (req, res) => {
  try {
    await auth()

    const now = new Date()

    const lineIds = req.body?.q || []

    // adiciona os ids correspondentes das linhas de ônibus circulares 
    // a partir do id de referência
    for (let lineId in REVERSE_MASK) {
      if (lineIds.includes(lineId)) {
        lineIds.push(REVERSE_MASK[lineId])
      }
    }

    const cachedData = CACHE.filter(({ data, time }) => {
      return lineIds.includes(data.cl) && !(time < now - CACHE_DURATION)
    }).map(({ data }) => data)

    const cachedIds = cachedData.map(({ cl }) => cl)

    const idsToUpdate = lineIds.filter(cl => {
      return !cachedIds.includes(cl)
    })

    const updatedData = await batchFetch(idsToUpdate)

    const allData = [...cachedData, ...updatedData]

    // console.log('cached', cachedData)
    // console.log('updated', updatedData)

    res.json(allData)
  } catch (e) {
    console.log(e.message)
    console.log(e.request?.res?.responseUrl)
    console.log(e.response?.data?.Message)
    res.send('error')
  }
}


export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handlePostRequest(req, res)
  } else {
    res.send('Invalid method')
  }
}
