# proxy

Proxy http para intermediar requests realizando pathRewrite (ou nao). Validado para todos os verbos HTTP e com tranferencias de arquivos binários como PDF, PNG e ZIP.

## Instalar

Se tiver o `nvm` instalado, é só usar

```
$ nvm install && npm i
```

Se já possuir o node 12.x.x na máquina, só precisa rodar

```
$ npm i
```

## Rodar testes e coverage

Depois de instalar no passo acima, usar

para rodar os testes

```
$ npm t
```

para rodar o coverage

```
$ npm run test:cover
```

## Rodando local

Para rodar local, depois de instalado usar

```
$ npm run start
```

## Configurando rotas

O proxy carrega os arquivos `JSON` de dentro da pasta `./src/proxy/services` ignorando quaiquer arquivos com problemas.

Esses arquivos contém três partes: uma de `skip` (opcional), uma de `prefix` e uma de `route` (ambas obrigatórias).

ex:

```JSON
{
    "skip": false,
    "prefix": "/python",
    "route": {
        "target": "http://localhost:8000",
        "changeOrigin": true,
        "pathRewrite": {
            "^/python": ""
        }
     }
}
```

```JSON
{
    "prefix": "/webservice",
    "route": {
        "target": "http://webservice:4000",
        "changeOrigin": true
     }
}
```

A configuração de rotas segue a documentação [desta lib](https://github.com/chimurai/http-proxy-middleware/tree/master/recipes)

### TL;DR

- `target` é obrigatório e aponta para o servidor de destino;
- `changeOrigin` é opcional e faz o replace da origem da request;
- `pathRewrite` é opcional e substitui parte da url durante a request;

Ex0: 

```JSON
{
    "skip": false,
    "prefix": "/python",
    "route": {
        "target": "https://myserver:8000",
        "changeOrigin": true,
        "pathRewrite": {
            "^/python": ""
        }
     }
}
```

Se subir o projeto local com esse servico (JSON) dentro da pasta services e executar um `curl http://localhost:3000/python`, o proxy vai interceptar essa request e transformar ela no equivalente a um `curl https://myserver:8000`. Note que parte da URL `/python` foi substituida pela string vazia.

Ex1: 

```JSON
{
    "skip": false,
    "prefix": "/python",
    "route": {
        "target": "https://myserver:8000",
        "changeOrigin": true
     }
}
```

Muito parecido com o anterior, mas sem pathrewrite. Se subir o projeto local com esse servico (JSON) dentro da pasta services e executar um `curl http://localhost:3000/python`, o proxy vai interceptar essa request e transformar ela no equivalente a um `curl https://myserver:8000/python`. Dessa vez nao mudamos nada da URL.

Ex2: 

```JSON
{
    "skip": false,
    "prefix": "/webservice",
    "route": {
        "target": "https://myserver:8000",
        "changeOrigin": true,
        "pathRewrite": {
            "^/webservice": "alvarows"
        }
     }
}
```

Se subir o projeto local com esse servico (JSON) dentro da pasta services e executar um `curl http://localhost:3000/webservice`, o proxy vai interceptar essa request e transformar ela no equivalente a um `curl https://myserver:8000/alvarows`. Note que parte da URL `/webservice` foi substituida pela string `alvarows`.

Ainda nesse exemplo, executar um `curl http://localhost:3000/webservice/requisicao`, o proxy vai interceptar essa request e transformar ela no equivalente a um `curl https://myserver:8000/alvarows/requisicao`. Ele manipula apenas a parte da URL que foi realizada o rewrite, mantendo o restante inalterado.

