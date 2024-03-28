# Run this code to generate a js file that contains an object
# with key-value pairs between countries and their borders
# The borders are in a set

import csv

def read_csv():
    border_array = []
    with open('data_handling/un_borders.csv', mode = 'r') as file:
        csv_file = csv.reader(file)
        for lines in csv_file:
            border_array.append(lines)
    return border_array

def get_border_adj_list():
    borders = read_csv()
    border_dict = {}
    for pair in borders:
        if pair[0] not in border_dict:
            country_with_borders = {pair[0]: set([pair[2]])}
            border_dict.update(country_with_borders)
        else:
            border_list = border_dict.get(pair[0])
            border_list.add(pair[2])
            country_with_borders = {pair[0]: border_list}
            border_dict.update(country_with_borders)
    return border_dict

def make_borders_js():
    with open('web-app/src/un_borders.js', 'w') as borders_file:
        borders_file.write('export default {\n')
        border_dict = get_border_adj_list()
        for key in border_dict:
            values_string = ""
            for value in border_dict.get(key):
                if values_string != "":
                    values_string = values_string + ', "' + value.lower() + '"'
                else:
                    values_string = values_string + '"' + value.lower() + '"'
            borders_file.write('\t' + '"' + key.lower() + '": [' + values_string + '],\n')
        borders_file.write('};')

make_borders_js()
