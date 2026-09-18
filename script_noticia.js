const article = JSON.parse(localStorage.getItem("artigo"));

function openPag(pagina){
    window.location.href = pagina;
}

const bvoltar = document.getElementById("voltar");
const title = document.getElementById("title");
const content = document.getElementById("content");
const background = document.getElementById("article");
const image = document.getElementById("image");
const subtitle = document.getElementById("subtitle");
const date = document.getElementById("date");
const download = document.getElementById("download");

title.textContent = article.title;
content.textContent = article.content;
background.style.backgroundColor = article.background;
image.src = article.image;
subtitle.textContent = article.resume;
date.textContent = article.date;
download.href = article.download;  
download.download = article.download;
if(bvoltar){
    bvoltar.addEventListener("click", ()=>(openPag("./index.html")));
}