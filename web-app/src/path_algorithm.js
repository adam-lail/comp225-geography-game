import un_borders from './un_borders.js'

import countriesHashMap from './country_codes.js'

/* ----PATH CHECKING FUNCTIONS---- */
// functions based on this pseudocode/tutorial: https://yuminlee2.medium.com/breadth-first-search-bfs-algorithm-b93ef5258c4d#:~:text=BFS%20can%20be%20used%20to,level%20neighbors%2C%20and%20so%20on.

export function bfs(country1, country2) {
    var queue = []
    queue.push(country1)
    var visited = {}
    visited[country1] = null // keys are nodes (countries), values are previous node
    while (queue.length != 0) {
        var curr = queue[0]
        removeItemOnce(queue, queue[0])
        if (curr == country2) {
            return true
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
    return false
}

export function bfs_with_user_countries(country1, country2, countries) {
    var queue = []
    queue.push(country1)
    var visited = {}
    visited[country1] = null // keys are nodes (countries), values are previous node
    while (queue.length != 0) {
        var curr = queue[0]
        removeItemOnce(queue, queue[0])
        if (curr == country2) {
            return true
        }
        if (un_borders[curr] == null) {
            continue
        } else {
            un_borders[curr].forEach(neighbor => {
                if (!(neighbor in visited) && (countries.includes(neighbor))) {
                    visited[neighbor] = curr
                    queue.push(neighbor)
                }
            })
        }
    }
    return false
}


export function bfs_shortest_path(country1, country2) {
    var queue = []
    queue.push(country1)
    var visited = {}
    visited[country1] = null // keys are nodes (countries), values are previous node
    while (queue.length != 0) {
        var curr = queue[0]
        removeItemOnce(queue, queue[0])
        if (curr == country2) {
            break
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
    return get_path(visited, country2)
}


export function bfs_shortest_path_with_user_countries(country1, country2, countries) {
    var queue = []
    queue.push(country1)
    var visited = {}
    visited[country1] = null // keys are nodes (countries), values are previous node
    while (queue.length != 0) {
        var curr = queue[0]
        removeItemOnce(queue, queue[0])
        if (curr == country2) {
            break
        }
        if (un_borders[curr] == null) {
            continue
        } else {
            un_borders[curr].forEach(neighbor => {
                if (!(neighbor in visited) && countries.includes(neighbor)) {
                    visited[neighbor] = curr
                    queue.push(neighbor)
                }
            })
        }
    }
    return get_path(visited, country2)
}


/* ----GET END COUNTRIES FUNCTIONS---- */


function getRandomCountry() {
    const dictLength = Object.keys(countriesHashMap).length
    var randomKey = Object.keys(countriesHashMap)[getRandomInt(0, dictLength)];
    return countriesHashMap[randomKey]
}

export function chooseEndCountries() {
    var country1 = ""
    var country2 = ""
    var arr = [country1, country2]
    while (!(bfs(country1, country2) && (country1 != country2) && !(un_borders[country1].includes(country2)))) {
        country1 = getRandomCountry()
        country2 = getRandomCountry()
        arr = [country1, country2]
    }
    return arr
}



/* ----HELPER FUNCTIONS---- */


// function copied from https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

// function copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// function based on this pseudocode/tutorial: https://yuminlee2.medium.com/breadth-first-search-bfs-algorithm-b93ef5258c4d#:~:text=BFS%20can%20be%20used%20to,level%20neighbors%2C%20and%20so%20on.
function get_path(visited, country2) {
    var path = []
    var curr = country2
    while (curr != null) {
        path.push(curr)
        curr = visited[curr]
    }
    return path.reverse()
}

