const key = "6935db7b1b7f3a14598e5edd21328962"

function dataplacing(dados) {
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temperatura").innerHTML = "Temp: " + Math.floor(dados.main.temp) + "°C"
    document.querySelector(".tipoclima").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = dados.main.humidity + "%"
    document.querySelector(".imgclass").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
}

async function citysearch(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},{BR}&appid=${key}&lang=pt_br&units=metric`).then(result => result.json())

    dataplacing(dados)
}

function clickbuttom() {
    const cidade = document.querySelector(".input-cidade").value
    citysearch(cidade)
}