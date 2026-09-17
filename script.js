function sendArticle(title){
    const artigo = site.paginas.find((article) => (article.title == title));
    localStorage.setItem("artigo", JSON.stringify(artigo));
    openPag("./noticia.html");
    return artigo;
}

function openPag(pagina){
    window.location.href = pagina;
}

class Site {
    constructor(nome, paginas) {
        this.nome = nome;
        this.paginas = paginas;
    }
}

class Page {
    constructor(title, content, background) {
        this.title = title;
        this.content = content;
        this.background = background;
    }
}

class Article extends Page{
    constructor(resume, date, image, download) {
        super();
        this.resume = resume;
        this.date = date;
        this.image = image;
        this.download = download;
    }
}

const site = new Site("Hub notícias", []);
let artigo = new Article();
const visNoticia = document.getElementById("visNoticia");
const conteudo = await fetch("./content.txt")
.then((resposta) => {return resposta.text()})
.catch((e) => {console.log(e)});
const noticias = await fetch("./news.json")
.then((resposta) => {return resposta.json()})
.catch((e) => {console.log(e)});

for (const noticia of noticias){
    const article = new Article();
    article.background = noticia.background;
    article.title = noticia.title;
    article.resume = noticia.resume;
    console.log(noticia.content);
    article.content = await fetch(noticia.content)
    .then((res) => {return res.text()}).catch((e) => {console.log("Erro: "+e)});
    article.date = noticia.date;
    article.image = noticia.imagem;
    article.download = noticia.download;
    site.paginas.push(article);
}

if(document.getElementById("lista")){
for(const article of site.paginas){
    const lista = document.getElementById("lista");
    const element = document.createElement('li');
    const image = document.createElement('img');
    const container = document.createElement('div');
    const noticia = document.createElement('div');
    const bLink = document.createElement('button');
    const divLegenda = document.createElement('div');

    element.className = "title";
    image.src = article.image;
    image.className = "banner";
    bLink.textContent = "Visualizar";
    bLink.id = article.title;
    bLink.className = "link";
    element.textContent = article.title;
    divLegenda.append(element);
    divLegenda.append(bLink);
    container.append(image);
    container.append(divLegenda)
    noticia.append(container);
    divLegenda.className = "legenda";
    container.className = "container";
    noticia.className = "noticia";
    lista.append(noticia);
    
}
}

const lista = document.getElementsByClassName("link");
if (lista){
for (const botao of lista){
    console.log(botao.id);
    botao.addEventListener('click', () => {sendArticle(botao.id)})
}
}

document.querySelectorAll('*').forEach(el => {
    if (el.offsetWidth > window.innerWidth) {
        console.log(el);
    }
});


