import re
import json
import os


def parse_kml(file):
  with open(file) as f:
    kml_str = f.read()

  match = re.findall('<coordinates>(.*)</coordinates>', kml_str)[2]
  points = match.split(' ')
  points_list = [x.split(',')[:-1][::-1] for x in points]
  for i in range(len(points_list)):
    for j in range(2):
      points_list[i][j] = float(points_list[i][j])

  return points_list


def main():
  kml_folder = '../data/kml/'
  for file in os.listdir(kml_folder):
    with open(f'../public/data/routes/{file[:-4]}.json', 'w') as fp:
      json.dump(parse_kml(kml_folder + file), fp)
  

if __name__ == '__main__':
  main()