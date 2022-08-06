# Markey agendamento web

Projeto criado utilizando vue-3 e vite.

### Pacotes utilizadas
- <a href="https://github.com/beholdr/maska">maska</a> v.1.5.0
- <a href="https://vuejs.org/">vue</a> v.3.2.37,
- <a href="https://router.vuejs.org/" >vue-router</a> b.4.1.3
- <a href="https://vuex.vuejs.org/">vuex</a> v.^4.0.2
---
## Instruções para rodar o projeto.

```sh
npm install
```

- Cria um servidor e builda o projeto em ambiente de desenvolvimento

```sh
npm run dev
```

- Compila e minimifica para produção

```sh
npm run build
```
---
### Observações para deploy

- Caso o projeto for hospedados via `firebase-hosting` todas as rotas devem apontar para o arquivo principal `index.html`. Segue configuração exemplo:

<b>firebase.json</b>
```json
{
    "hosting": {
        "public": "dist",
        "rewrites": [
        {
            "source": "**",
            "destination": "/index.html"
        }
        ]
    }
}
```
