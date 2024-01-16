import { APIKEY, ICONS } from "../helpers/api.js"
import { APIURL2 } from "../helpers/api.js"


const d = document
const form = d.querySelector('.form')
const containerData = d.querySelector('.container-data')


form.addEventListener('submit', submitData)

function submitData(e) {
    e.preventDefault()
    const name = e.target.country
    console.log(name.value)
    
    if(name.value.length < 1){
        alert('inserta una ciudad valida')
        return
    }
    petitionApi(name.value)
    form.reset()
}

async function petitionApi(nameCity = 'lima') {
    try {
        let response = await fetch(`${APIURL2}${nameCity}&appid=${APIKEY}`)
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
petitionApi()

function showData(data) {
    
    const {name, main:{temp, temp_max, temp_min} ,sys:{country}, weather:[valor]} = data
   // console.log(valor.icon)

   const containerTemplate = document.createElement('div')
   containerTemplate.innerHTML = `
        <div class ='card-body text-center text-capitalize text-info'>
            <h1> clima de : ${name}</h1>
            <h1> pais : ${country}</h1>
            <img src=${ICONS}${valor.icon}@2x.png>
            <h2>temperatura: ${parseInt(temp-273.15)}°</h2>
            <h3>temperatura maxima: ${parseInt(temp_max-273.15)}°</h3>
            <h3>temperatura minima: ${parseInt(temp_min-273.15)}°</h3>
        </div>
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
    dataError.innerHTML = `<h1 class ='text-danger text-center'>${error}</h1>`
    containerData.innerHTML = dataError.innerHTML
}



