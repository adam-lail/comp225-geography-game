# Run this code to generate a js file that contains an object
# with key-value pairs between country names and their country codes

import csv

def read_csv():
    border_array = []
    with open('data_handling/un_borders.csv', mode = 'r') as file:
        csv_file = csv.reader(file)
        for lines in csv_file:
            border_array.append(lines)
    return border_array

def make_country_codes():
    with open('web-app/src/country_codes.js', 'w') as countries_file:
        countries_file.write('export default {\n')
        borders = read_csv()
        rows = []
        for b in borders:
            if [b[1], b[0]] not in rows:
                pair = [b[1], b[0]]
                rows.append(pair)
                countries_file.write('\t' + '"' + b[1] + '": "' + b[0].lower() + '",\n')
        countries_file.write('};')

make_country_codes()