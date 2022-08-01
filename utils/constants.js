export const APP_NAME = 'Onibus USP'
export const APP_DESCRIPTION = 'Localização dos ônibus que passam pelo campus da USP em tempo real'
export const THEME_COLOR = '#1092AA'

// Notas: 
// (1) Ônibus circulares possuem dois códigos de linha, internamente
// um dos códigos é substituído pelo outro para que as linhas circulares
// tenham o mesmo ID. É feito o seguinte mapeamento:
// * 35313 substituído por 2545
// (2) Nos arrays de elementos únicos, as linhas com o código substuído são
// removidas. Desta forma, a interface gráfica renderiza as linhas circulares
// como se fossem uma só.
export const BL = [
  { // 8012-10-1
    lineId: 2023,
    displayName: '8012-10 (Terminal P3)',
    iconColor: 'blue-light',
    pathColor: '#1DABFC',
  },
  { // 8012-10-2
    lineId: 34791,
    displayName: '8012-10 (Metrô Butantã)',
    iconColor: 'blue',
    pathColor: '#076EA8'
  },
  { // 8022-10-1
    lineId: 2085,
    displayName: '8022-10 (Terminal P3)',
    iconColor: 'red-light',
    pathColor: '#FB7468',
  },
  { // 8022-10-2
    lineId: 34853,
    displayName: '8022-10 (Metrô Butantã)',
    iconColor: 'red',
    pathColor: '#E8443C',
  },
  { // 8032-10-1
    lineId: 2545,
    displayName: '8032-10 (Circular)',
    iconColor: 'water-green',
    pathColor: '#16c8c3'
  },
  { // 8032-10-2
    lineId: 35313,
    displayName: '8032-10 (Circular)',
    iconColor: 'water-green',
    pathColor: '#16c8c3'
  },
  { // 177H-10-2
    lineId: 33398,
    displayName: '177H-10 (Metrô Santana)',
    iconColor: 'wine',
    pathColor: '#660022'
  },
  { // 177H-10-1
    lineId: 630,
    displayName: '177H-10 (Terminal P2)',
    iconColor: 'wine-light',
    pathColor: '#80193b'
  },
  { // 701U-10-2
    lineId: 33425,
    displayName: '701H-10 (Metrô Santana)',
    iconColor: 'purple',
    pathColor: '#5F2867'
  },
  { // 701U-10-1
    lineId: 657,
    displayName: '701H-10 (Terminal P2)',
    iconColor: 'purple-light',
    pathColor: '#943FA2'
  },
  { // 702U-10-2
    lineId: 34098,
    displayName: '702U-10 (Terminal P2)',
    iconColor: 'orange-light',
    pathColor: '#fb9119'
  },
  { // 702U-10-1
    lineId: 1330,
    displayName: '702U-10 (Term. D. Pedro II)',
    iconColor: 'orange',
    pathColor: '#e17700'
  },
  { // 7181-10-2
    lineId: 34100,
    displayName: '7181-10 (Terminal P2)',
    iconColor: 'dark-green-light',
    pathColor: '#007657'
  },
  { // 7181-10-1
    lineId: 1332,
    displayName: '7181-10 (T. Princ. Isabel)',
    iconColor: 'dark-green',
    pathColor: '#004331'
  },
  { // 7411-10-2
    lineId: 34144,
    displayName: '7411-10 (Circular)',
    iconColor: 'green',
    pathColor: '#12944A'
  },
  { // 7411-10-1
    lineId: 1376,
    displayName: '7411-10 (Circular)',
    iconColor: 'green',
    pathColor: '#12944A'
  },
  { // 7725-10-2
    lineId: 33240,
    displayName: '7725-10 (Rio Pequeno)',
    iconColor: 'brown-light',
    pathColor: '#56331f',
  },
  { // 7725-10-1
    lineId: 472,
    displayName: '7725-10 (Terminal Lapa)',
    iconColor: 'brown',
    pathColor: '#301d11',
  },
  { // 809U-10-2
    lineId: 35022,
    displayName: '809U-10 (Terminal P2)',
    iconColor: 'pink-light',
    pathColor: '#ee0c8c'
  },
  { // 809U-10-1
    lineId: 2254,
    displayName: '809U-10 (Metrô B. Funda)',
    iconColor: 'pink',
    pathColor: '#bd096f'
  }
]
export const BL_IDS = BL.map(o => o.lineId)
export const BL_UNIQUE = BL.filter(({ lineId }) => !~[35313, 34144].indexOf(lineId))
export const BL_IDS_UNIQUE = BL_UNIQUE.map(o => o.lineId)