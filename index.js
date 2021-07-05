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

    pairs = []
    complements = []
   
    for (number of playersHeight){
        diff = sum - number
        numIndex = playersHeight.indexOf(number)
        index = complements.indexOf(diff)
        
        if (index != -1){
            pairs.push([data.values[index],data.values[numIndex]])
        }
        complements.push(number) 
    }
    if (pairs.length){
        for (pair of pairs){
            let ul = document.getElementById("list")
            let li = document.createElement("li")
            li.appendChild(document.createTextNode(`${pair[0].first_name} ${pair[0].last_name} -  ${pair[1].first_name} ${pair[1].last_name}`))
            ul.appendChild(li) 
        }
    }else{
        let ul = document.getElementById("list")
        let li = document.createElement("li")
        li.appendChild(document.createTextNode(`No matches found`))
        ul.appendChild(li) 
    }
    
}



