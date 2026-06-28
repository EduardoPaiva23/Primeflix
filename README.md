# PrimeFlix

App de filmes construído com **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4** e **shadcn/ui**. Consome a API do [TMDB](https://www.themoviedb.org/) para listar filmes em cartaz, ver detalhes, buscar títulos e montar uma lista de favoritos (salva no `localStorage`).

## Funcionalidades

- **Em cartaz** — grid de filmes que estão nos cinemas (Server Component).
- **Detalhes** — sinopse, nota, backdrop e link de trailer no YouTube.
- **Busca** — barra de busca com validação (React Hook Form + Zod).
- **Favoritos** — salvar/remover filmes, persistidos no `localStorage`.

## Stack

- Next.js 16 (App Router, Server Components)
- React 19 + TypeScript
- Tailwind CSS 4 (config CSS-first) + shadcn/ui
- React Hook Form + Zod (formulário de busca e validação de dados)
- Sonner (toasts)

## Como rodar

```bash
npm install
cp .env.example .env.local   # e preencha TMDB_API_KEY
npm run dev                  # http://localhost:3000
```

### Variáveis de ambiente

| Nome           | Descrição                                              |
| -------------- | ------------------------------------------------------ |
| `TMDB_API_KEY` | Chave da API do TMDB (server-only). Obtenha em https://www.themoviedb.org/settings/api |

## Scripts

- `npm run dev` — servidor de desenvolvimento (porta 3000)
- `npm run build` — build de produção
- `npm run start` — sobe o build de produção
- `npm run lint` — ESLint
- `npm run type-check` — checagem de tipos (`tsc --noEmit`)
