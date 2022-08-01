SVG_TEMPLATE = """
<svg width="20" height="35" viewBox="0 0 20 35" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>map-marker</title>
  <defs>
    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
      <stop stop-color="{initial_color}" offset="0%"/>
      <stop stop-color="{final_color}" offset="100%"/>
    </linearGradient>
    <path d="M10 34.596c2.412-7.1 4.223-11.95 5.433-14.553C17.247 16.14 20 14.287 20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.371 2.532 6.142 4.438 10.043 1.27 2.601 3.124 7.452 5.562 14.553z" id="b"/>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <use fill="url(#a)" xlink:href="#b"/>
    <path stroke-opacity=".243" stroke="{stroke_color}" d="M9.997 33.055c2.184-6.368 3.843-10.773 4.982-13.223.42-.902.893-1.723 1.54-2.715.157-.24.994-1.493 1.217-1.84C18.975 13.344 19.5 11.927 19.5 10a9.5 9.5 0 0 0-19 0c0 2.012.507 3.462 1.695 5.372.23.37 1.228 1.892 1.484 2.3.471.753.857 1.434 1.208 2.152 1.198 2.452 2.9 6.858 5.11 13.231z"/>
    <circle fill-opacity="{fill_opacity}" fill="{circle_color}" cx="10" cy="10" r="3.6"/>
  </g>
</svg>
""".lstrip()


# tool: https://www.color-hex.com/color/5f2867
COLORS = {
  'blue': {
    'initial_color': '#1DABFC', 
    'final_color': '#076EA8',
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'blue-light': {
    'initial_color': '#1DABFC', 
    'final_color': '#076EA8', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'red': {
    'initial_color': '#FB7468', 
    'final_color': '#E8443C', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'red-light': {
    'initial_color': '#FB7468', 
    'final_color': '#E8443C', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'green': {
    'initial_color': '#50DE40', 
    'final_color': '#12944A', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'green-light': {
    'initial_color': '#50DE40', 
    'final_color': '#12944A', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'purple': {
    'initial_color': '#943FA2',
    'final_color': '#5F2867', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'purple-light': {
    'initial_color': '#943FA2', 
    'final_color': '#5F2867', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'brown': {
    'initial_color': '#56331f', 
    'final_color': '#301d11', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'brown-light': {
    'initial_color': '#56331f', 
    'final_color': '#301d11', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'dark-green': {
    'initial_color': '#007657', 
    'final_color': '#004331', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'dark-green-light': {
    'initial_color': '#007657', 
    'final_color': '#004331', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'pink': {
    'initial_color': '#ee0c8c', 
    'final_color': '#bd096f', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'pink-light': {
    'initial_color': '#ee0c8c', 
    'final_color': '#bd096f', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'water-green': {
    'initial_color': '#04b1ac', 
    'final_color': '#026f6c', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'water-green-light': {
    'initial_color': '#04b1ac', 
    'final_color': '#026f6c', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'orange': {
    'initial_color': '#fb9119', 
    'final_color': '#e17700', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'orange-light': {
    'initial_color': '#fb9119', 
    'final_color': '#e17700', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
  'wine': {
    'initial_color': '#80193b', 
    'final_color': '#660022', 
    'circle_color': '#000',
    'stroke_color': '#000',
    'fill_opacity': '.54',
  },
  'wine-light': {
    'initial_color': '#80193b', 
    'final_color': '#660022', 
    'circle_color': '#FFF',
    'stroke_color': '#000',
    'fill_opacity': '.62',
  },
}

def main():
  # colors = [
  #   ('#F8AA3B', '#DF6800'),
  #   ('#F7996E', '#F57A3D')
  # ]

  for name, params in COLORS.items():
    with open(f'../public/assets/img/marker-{name}.svg', 'w') as fp:
      fp.write(SVG_TEMPLATE.format(**params))


if __name__ == '__main__':
  main()