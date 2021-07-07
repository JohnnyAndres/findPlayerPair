const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        $
            .get(url_api, opts, (data) => {
                resolve(data)
            })
            .fail(() => reject(new Error('Error', url_api)) )
    }) 
}


const API_URL = 'https://mach-eight.uc.r.appspot.com/'
const opts = { crossDomain: true }

const getData = async (url_api) => {
    try {
        const data = await fetchData(url_api) 
        findPair(data)
    }catch (err) {
        console.error(err)
    }
} 


const search = () =>{
    const list = document.getElementById("list");
    list.innerHTML = ""
    getData(API_URL)
}

const findPair = (data) => {
    let sum = document.getElementById('players-height').value
    let playersHeight = data.values.map(function(player){
        return parseInt(player.h_in) 
    })
    let playersNames = data.values.map(function(player){
        return (`${player.first_name} ${player.last_name}`) 
    })

    pairs = []
    pairsNames = []
    complements = []
   
    for (player of data.values){
        let number = parseInt(player.h_in)
        let name = `${player.first_name} ${player.last_name}`

        let diff = sum - number
        let index = complements.indexOf(diff)

        if (index != -1){
            pairs.push([diff, number])
            name2 = playersNames[playersHeight.indexOf(diff)]
            pairsNames.push([name2, name])
        }
        complements.push(number) 
    }
    
    if (pairsNames.length){
        for (pair of pairsNames){
            let ul = document.getElementById("list")
            let li = document.createElement("li")
            li.appendChild(document.createTextNode(`${pair[0]} - ${pair[1]}`))
            ul.appendChild(li) 
        }
    }else{
        let ul = document.getElementById("list")
        let li = document.createElement("li")
        li.appendChild(document.createTextNode(`No matches found`))
        ul.appendChild(li) 
    }
    
}


