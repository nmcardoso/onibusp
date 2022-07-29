export const APP_NAME = 'Onibus USP'
export const APP_DESCRIPTION = 'Localização dos ônibus que passam pelo campus da USP em tempo real'
export const THEME_COLOR = '#1092AA'

export const BUS_LINES = {
  34791: { // 8012-10-1
    displayName: '8012-10 (Metro Butanta)',
    iconColor: 'blue',
    pathColor: '#1DABFC',
  },
  2023: { // 8012-10-2
    displayName: '8012-10 (Terminal P3)',
    iconColor: 'blue-light',
    pathColor: '#076EA8',
  },
  34853: { // 8022-10-1
    displayName: '8022-10 (Metro Butanta)',
    iconColor: 'red',
    pathColor: '#FB7468',
  },
  2085: { // 8022-10-2
    displayName: '8022-10 (Terminal P3)',
    iconColor: 'red-light',
    pathColor: '#E8443C',
  },
  35313: { // 8032-10-1
    displayName: '8032-10',
    iconColor: 'green',
    pathColor: '#50DE40',
  },
  2545: { // 8032-10-2
    displayName: '8032-10',
    iconColor: 'green',
    pathColor: '#12944A',
  }
}
export const BUS_LINES_ARRAY = Object.keys(BUS_LINES)