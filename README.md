<p align="center">
  <img src="art/logo.png" height="128" />
  <h1 align="center">Ônibus USP</h1>
</p>

<p align="center">
  <a aria-label="License" href="https://github.com/bususp/bususp/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/badge/LICENSE-GNU--GPLv3-sucess?style=for-the-badge&labelColor=000">
  </a>
  <a aria-label="Nextjs logo" href="https://github.com/vercel/next.js/discussions">
    <img alt="" src="https://img.shields.io/badge/MADE%20WITH%20NEXTJS-blueviolet.svg?style=for-the-badge&logo=Next.js&labelColor=000000&logoWidth=20">
  </a>
  <a aria-label="Nextjs logo" href="https://github.com/vercel/next.js/discussions">
    <img alt="" src="https://img.shields.io/badge/MADE%20WITH%20LEAFLET-blue.svg?style=for-the-badge&logo=leaflet&labelColor=000&logoWidth=20&logoColor=green">
  </a>
</p>

<p align="center">
  <a aria-label="Vercel logo" href="https://vercel.com">
    <img src="https://img.shields.io/badge/POWERED%20BY%20VERCEL-000.svg?style=for-the-badge&logo=vercel&labelColor=000&logoWidth=20">
  </a>
  <a aria-label="Vercel logo" href="https://vercel.com">
    <img src="https://img.shields.io/badge/POWERED%20BY%20OSP-000.svg?style=for-the-badge&logo=openstreetmap&labelColor=000&logoWidth=20">
  </a>
</p>

# API SPTrans

Aqui tem um sumário de alguns recursos disponibilizados pela SPTrans que são relevantes no desenvolvimento desta aplicação

## Informação dos trajetos
Os Trajetos são obtidos a partir do seguinte recurso: `http://olhovivo.sptrans.com.br/KmlFile/<nome da linha com sentido>?D=2022-5-3&V=45`

`<nome da linha>` por exemplo **8012-10-1** ou **2012-10-2**


## Informação da posição dos veículos
`http://olhovivo.sptrans.com.br/data/Posicao/Linha?codigoLinha=<id da linha>`

`<id da linha>` por exemplo **2023**


## Informação das linhas rastreadas

### Modelo de dados

Recurso SPTrans: `http://api.olhovivo.sptrans.com.br/v2.1/Linha/Buscar?termosBusca=<nome da linha>`

`<nome da linha>` por exemplo **8012-10**

|Chave|Descrição|
|---|---|
|`[int] cl`|Código identificador da linha. Este é um código identificador único de cada linha do sistema (por sentido de operação)|
|`[bool] lc`|Indica se uma linha opera no modo circular (sem um terminal secundário)|
|`[str] lt`|Informa a primeira parte do letreiro numérico da linha|
|`[int] tl`|Informa a segunda parte do letreiro numérico da linha, que indica se a linha opera nos modos: **BASE (10), ATENDIMENTO (21, 23, 32, 41)**|
|`[int] sl`|Informa o sentido ao qual a linha atende, onde 1 significa Terminal Principal para Terminal Secundário e 2 para Terminal Secundário para Terminal Principal|
|`[str] tp`|Informa o letreiro descritivo da linha no sentido Terminal Principal para Terminal Secundário|
|`[str] ts`|Informa o letreiro descritivo da linha no sentido Terminal Secundário para Terminal Principal|

### Respostas

#### 8012-10
```json
[
  {
    "cl": 2023,
    "lc": false,
    "lt": "8012",
    "sl": 1,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ BUTANTÃ"
  }, 
  {
    "cl": 34791,
    "lc": false,
    "lt": "8012",
    "sl": 2,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ BUTANTÃ"
  }
]
```

#### 8022-10
```json
[
  {
    "cl": 2085,
    "lc": false,
    "lt": "8022",
    "sl": 1,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ BUTANTÃ"
  }, 
  {
    "cl": 34853,
    "lc": false,
    "lt": "8022",
    "sl": 2,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ BUTANTÃ"
  }
]
```

#### 8032-10
```json
[
  {
    "cl": 2545,
    "lc": true,
    "lt": "8032",
    "sl": 1,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ BUTANTÃ"
  },
  {
    "cl": 35313,
    "lc": true,
    "lt": "8032",
    "sl": 2,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ BUTANTÃ"
  }
]
```

#### 177H-10
```json
[
  {
    "cl": 630,
    "lc": false,
    "lt": "177H",
    "sl": 1,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ SANTANA"
  },
  {
    "cl": 33398,
    "lc": false,
    "lt": "177H",
    "sl": 2,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ SANTANA"
  }
]
```

#### 701U-10
```json
[
  {
    "cl": 657,
    "lc": false,
    "lt": "701U",
    "sl": 1,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ SANTANA"
  },
  {
    "cl": 33425,
    "lc": false,
    "lt": "701U",
    "sl": 2,
    "tl": 10,
    "tp": "CID. UNIVERSITÁRIA",
    "ts": "METRÔ SANTANA"
  }
]
```

#### 702U-10
```json
[
  {
    "cl": 1330,
    "lc": false,
    "lt": "702U",
    "sl": 1,
    "tl": 10,
    "tp": "TERM. PQ. D. PEDRO II",
    "ts": "CID. UNIVERSITÁRIA"
  },
  {
    "cl": 34098,
    "lc": false,
    "lt": "702U",
    "sl": 2,
    "tl": 10,
    "tp": "TERM. PQ. D. PEDRO II",
    "ts": "CID. UNIVERSITÁRIA"
  }
]
```

#### 7181-10
```json
[
  {
    "cl": 1332,
    "lc": false,
    "lt": "7181",
    "sl": 1,
    "tl": 10,
    "tp": "TERM. PRINC. ISABEL",
    "ts": "CID. UNIVERSITÁRIA"
  },
  {
    "cl": 34100,
    "lc": false,
    "lt": "7181",
    "sl": 2,
    "tl": 10,
    "tp": "TERM. PRINC. ISABEL",
    "ts": "CID. UNIVERSITÁRIA"
  }
]
```

#### 7411-10
```json
[
  {
    "cl": 1376,
    "lc": true,
    "lt": "7411",
    "sl": 1,
    "tl": 10,
    "tp": "PÇA. DA SÉ",
    "ts": "CID. UNIVERSITÁRIA"
  },
  {
    "cl": 34144,
    "lc": true,
    "lt": "7411",
    "sl": 2,
    "tl": 10,
    "tp": "PÇA. DA SÉ",
    "ts": "CID. UNIVERSITÁRIA"
  }
]
```

#### 7725-10
```json
[
  {
    "cl": 472,
    "lc": false,
    "lt": "7725",
    "sl": 1,
    "tl": 10,
    "tp": "TERM. LAPA",
    "ts": "RIO PEQUENO"
  },
  {
    "cl": 33240,
    "lc": false,
    "lt": "7725",
    "sl": 2,
    "tl": 10,
    "tp": "TERM. LAPA",
    "ts": "RIO PEQUENO"
  }
]
```

#### 809U-10
```json
[
  {
    "cl": 2254,
    "lc": false,
    "lt": "809U",
    "sl": 1,
    "tl": 10,
    "tp": "METRÔ BARRA FUNDA",
    "ts": "CID. UNIVERSITÁRIA"
  },
  {
    "cl": 35022,
    "lc": false,
    "lt": "809U",
    "sl": 2,
    "tl": 10,
    "tp": "METRÔ BARRA FUNDA",
    "ts": "CID. UNIVERSITÁRIA"
  }
]
```


## Links úteis
https://colordesigner.io/random-color-generator

https://www.color-hex.com/color/05ded8

https://www.random.org/colors/hex

https://coolors.co/palettes/popular/orange