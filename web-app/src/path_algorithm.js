import un_borders from './un_borders.js'


function bfs(country1, country2) {
    var queue = []
    queue.push(country1)
    var visited = {}
    visited[country1] = null // keys are nodes (countries), values are previous node
    while (queue.length != 0) {
        var curr = queue[0]
        removeItemOnce(queue, queue[0])
        if (curr == country2) {
            return "yes"
        }
        if (un_borders[curr] == null) {
            continue
        } else {
            un_borders[curr].forEach(neighbor => {
                if (!(neighbor in visited)) {
                    visited[neighbor] = curr
                    queue.push(neighbor)
                }
            })
        }
    }
    return "no"
}

// function copied from https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

console.log(bfs("es", "pl")) //yes
console.log(bfs("es", "us")) //no
console.log(bfs("ad", "fr")) //yes
console.log(bfs("ca", "br")) //yes
console.log(bfs("au", "id")) //no
console.log(bfs("ad", "ad")) //yes

