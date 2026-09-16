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
    //console.log(lista);
    const element = document.createElement('li');
    const bLink = document.createElement('button');
    bLink.textContent = "Ir para a página";
    bLink.id = article.title;
    bLink.className = "link";
    element.textContent = article.title;
    lista.append(element);
    lista.append(bLink);
}
}

const lista = document.getElementsByClassName("link");
if (lista){
for (const botao of lista){
    console.log(botao.id);
    botao.addEventListener('click', () => {sendArticle(botao.id)})
}
}


