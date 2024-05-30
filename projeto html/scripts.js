
const key = "6935db7b1b7f3a14598e5edd21328962"

function dataplacing(dados) {
    console.log(dados)
    tmp = Math.floor(dados.main.temp)
    let alertaclima = "Boa temperatura";
    let alertacondi = "Boas condições";
    let alertaumid = "Boa umidade";
    if (tmp <= 0) {
        alertaclima = "Frio EXTREMO, evite exposição!<br>Se mantenha aquecido!";
    } else if (tmp > 0 && tmp <= 15) {
        alertaclima = "Frio. Use roupas grossas<br>Se mantenha aquecido.";
    } else if (tmp >= 30 && tmp < 38) {
        alertaclima = "Calor. Use roupas frescas<br>Hidrate-se";
    } else if (tmp >= 38) {
        alertaclima = "Calor EXTREMO. Evite exposição!<br>Hidrate-se e use protetor!";
    }

    if (dados.main.humidity <= 30) {
        alertaumid = "Baixa umidade!<br>Risco de secas e incêndios!";
    }

    if (dados.weather[0].id === 500 || dados.weather[0].id === 501) {
        alertacondi = "Utilize guarda-chuva";
    }

    if (dados.weather[0].id === 502) {
        alertacondi = "Utilize guarda-chuva!<br>Mantenha-se alerta!";
    }

    if (dados.weather[0].id === 503) {
        alertacondi = "Risco de enchente!<br>Mantenha-se alerta!";
    }

    if (dados.weather[0].id === 701) {
        alertacondi = "Baixa visibilidade!<br>Mantenha-se alerta!";
    }
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temperatura").innerHTML = "Temp: " + tmp + "°C"
    document.querySelector(".tipoclima").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".imgclass").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    document.querySelector(".alerta").innerHTML = alertaclima + "<br>" + alertacondi + "<br>" + alertaumid

}

function dataplacing2(dados2) {
    console.log(dados2);
    var dataAtual = new Date();
    var datas = [];

    for (var i = 0; i < 5; i++) {
        dataAtual.setDate(dataAtual.getDate() + 1);
        var dia = dataAtual.getDate();
        var mes = dataAtual.getMonth() + 1;
        var diaFormatado = dia < 10 ? '0' + dia : dia;
        var mesFormatado = mes < 10 ? '0' + mes : mes;
        datas.push(diaFormatado + '/' + mesFormatado);
    }

    let soma = 0;
    for (let i = 0; i < 7; i++) {
        soma += dados2.list[i].main.temp;
    }

    let avgTempDiaria = [];
    for (let i1 = 1; i1 < 5; i1++) {
        let somaDiaria = 0;
        for (let i2 = 0; i2 < 8; i2++) {
            somaDiaria += dados2.list[i1 * 8 + i2].main.temp;
        }
        const avgTemp = somaDiaria / 8;
        avgTempDiaria.push(avgTemp);
    }

    console.log(avgTempDiaria.map(temp => temp.toFixed(2)));
    let dia1 = soma / 7;

    document.querySelector(".temp1").innerHTML = "Média<br>" + dia1.toFixed(1) + "°C";
    document.querySelector(".temp2").innerHTML = "Média<br>" + avgTempDiaria[0].toFixed(1) + "°C";
    document.querySelector(".temp3").innerHTML = "Média<br>" + avgTempDiaria[1].toFixed(1) + "°C";
    document.querySelector(".temp4").innerHTML = "Média<br>" + avgTempDiaria[2].toFixed(1) + "°C";
    document.querySelector(".temp5").innerHTML = "Média<br>" + avgTempDiaria[3].toFixed(1) + "°C";
    document.querySelector(".dia1").innerHTML = (datas[0]);
    document.querySelector(".dia2").innerHTML = (datas[1]);
    document.querySelector(".dia3").innerHTML = (datas[2]);
    document.querySelector(".dia4").innerHTML = (datas[3]);
    document.querySelector(".dia5").innerHTML = (datas[4]);
}


document.querySelector(".imgclass1").src = `https://openweathermap.org/img/wn/${dados2.weather[0].icon}.png`
document.querySelector(".imgclass2").src = `https://openweathermap.org/img/wn/${dados2.weather[0].icon}.png`
document.querySelector(".imgclass3").src = `https://openweathermap.org/img/wn/${dados2.weather[0].icon}.png`
document.querySelector(".imgclass4").src = `https://openweathermap.org/img/wn/${dados2.weather[0].icon}.png`
document.querySelector(".imgclass5").src = `https://openweathermap.org/img/wn/${dados2.weather[0].icon}.png`

async function citysearch(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},{BR}&appid=${key}&lang=pt_br&units=metric`).then(result => result.json())
    dataplacing(dados)
}

async function citysearch2(cidade) {
    const dados2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade},{BR}&appid=${key}&lang=pt_br&units=metric`).then(result => result.json())
    dataplacing2(dados2)
}

function clickbuttom() {
    const cidade = document.querySelector(".input-cidade").value
    citysearch(cidade)
    citysearch2(cidade)
}