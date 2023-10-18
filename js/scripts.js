const APIKEY =  '6d095bc8beadc854363743f93fb4d552'
const APIURL1 = `https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}`
const APIURL2 = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
const ICONS = 'https://openweathermap.org/img/wn/10d@2x.png'

const d = document
const form = d.querySelector('.form')
const nameCountry = d.querySelector('.name-country')
const submitButton = d.querySelector('.submitButton')
const containerData = d.querySelector('.container-data')

form.addEventListener('submit', submitData)

function submitData(e) {
    const name = e.target.country
    e.preventDefault()
    console.log(name.value)
    
    if(name.value.length < 1){
        alert('inserta una ciudad valida')
        return
    }
    petitionApi(name.value)
    form.reset()
}

async function petitionApi(nameCity) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${APIKEY}`)
        console.log(response)
        if(!response.ok){
            throw new Error('dato no encontrado')
        }
        let data = await response.json()
        console.log(data)
        showData(data)
        
    }
    catch(error){
        console.error(error)
        errorData(error)
    }
}

function showData(data) {
    const {name, main:{temp, temp_max, temp_min} ,sys:{country}, weather:[valor]} = data
   // console.log(valor.icon)

   const containerTemplate = document.createElement('div')
   containerTemplate.innerHTML = `
        <h1> clima de : ${name}</h1>
        <h1> pais : ${country}</h1>
        <img src='https://openweathermap.org/img/wn/${valor.icon}@2x.png'>
        <h2>temperatura: ${parseInt(temp-273.15)}°</h2>
        <h3>temperatura maxima: ${parseInt(temp_max-273.15)}°</h3>
        <h3>temperatura minima: ${parseInt(temp_min-273.15)}°</h3>
   `
   // console.log(containerTemplate)
   containerData.innerHTML= containerTemplate.innerHTML
  /* 
     // con insertAdjacentElement inserto un elemento en una determinada posicion, pero no sobreescribo el html, ademas que este recibe una variable que previamente se le haya asignado contenido html
     containerData.insertAdjacentElement('afterbegin',containerTemplate) 
  */

}

function errorData(error){
    const dataError = document.createElement('div')
    dataError.innerHTML = `<h1>${error}</h1>`
    containerData.innerHTML = dataError.innerHTML
}



let array1 = [1,2,3,4,5,6,7,[8,9,['x','y',[{name:'carlos',lastName: 'ortiz'}]]],[10,11]]

  /*  flat nos sirve para aplanar un array de manera recursiva, es decir si tengo 3 subarray anidados, necesitaria 3 flat para aplanarlo
      y hacer de que ese array sea de un solo nivel, el metodo flat no muta el array original
  */
  let response1 =  array1.flat().flat().flat() 
  console.log(response1)

  let array2 = [1,2,3,4]
/* el metodo fill nos sirve para remplazar elementos de un array con otros elementos, especificandole desde donde inciara ese remplazo, hasta
  donde finalizara, si omitimos este tercer parametro(que es opcional) el remplazo sera desde el indice indicado hasta el final del array, recalcar que el
  metodo muta el array original
*/

  let response2 = array2.fill({name:'carlos', lastName:21},1,3)
  console.log(response2)
