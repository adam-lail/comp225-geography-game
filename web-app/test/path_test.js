import { bfs } from '/Users/kendallsullivan/Documents/GitHub/comp225/comp225-geography-game/web-app/src/path_algorithm.js'

import { bfs_with_user_countries } from '/Users/kendallsullivan/Documents/GitHub/comp225/comp225-geography-game/web-app/src/path_algorithm.js'


/* ----MANUAL PRINT STATEMENT TESTS---- */

console.log(bfs("es", "pl")) //expected true 
console.log(bfs("es", "us")) //expected false
console.log(bfs("ad", "fr")) //expected true
console.log(bfs("ca", "br")) //expected true
console.log(bfs("au", "id")) //expected false
console.log(bfs("ad", "ad")) //expected true

console.log()

var countries = ["es", "pl", "de", "pt", "ad", "fr"]
console.log(bfs_with_user_countries("es", "pl", countries)) //expected true
countries = ["es", "pl", "us"]
console.log(bfs_with_user_countries("es", "pl", countries)) //expected false
countries = ["es"]
console.log(bfs_with_user_countries("es", "es", countries)) //expected true

