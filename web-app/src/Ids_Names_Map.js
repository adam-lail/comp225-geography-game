

    import fs from 'fs'
    import Papa from 'papaparse'

    const csv = 'ids_names.csv'
    const file = fs.createReadStream(csv);

    var countriesHashMap = {}

    Papa.parse(file, {
        header: false,
        step: function(result) {
            countriesHashMap[result.data[0]] = result.data[1]
            //console.log(result.data[0] + " : " + result.data[1])
        }
    });

    // for (key in countriesHashMap) {
    //     console.log(key + " : " + countriesHashMap[key])
    // }

    export var countriesHashMap;
    

