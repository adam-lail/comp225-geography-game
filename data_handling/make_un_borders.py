# Run this code to generate a csv file that contains only border pairs
# for United Nations recognized countries (193 as of March 2024)
# un_countries.csv from https://stefangabos.github.io/world_countries/
# borders.csv from https://github.com/geodatasource/country-borders

import csv

def read_csv(file_name):
    line_array = []
    with open(file_name, mode = 'r') as file:
        csv_file = csv.reader(file)
        for lines in csv_file:
            line_array.append(lines)
    return line_array

def make_un_borders():
    with open('data_handling/un_borders.csv', 'w') as un_borders:
        borders = read_csv('data_handling/borders.csv')
        un_countries = read_csv('data_handling/un_countries.csv')
        lower_un_countries = [country[1].lower() for country in un_countries]
        for b in borders:
            if b[0].lower() in lower_un_countries:
                if len(b) == 4 and b[2].lower() in lower_un_countries:
                    un_borders.write('"' + b[0] + '","' + b[1] + '","' + b[2] + '","' + b[3] + '"\n')
                elif b[2] == "":
                    un_borders.write('"' + b[0] + '","' + b[1] + '","",""\n')

make_un_borders()
