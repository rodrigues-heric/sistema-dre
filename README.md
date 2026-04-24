# Sistema DRE

Projeto feito com backend em Node (Express) e frontend em React (Vite)

Projeto no GitHub: [Sistema DRE](https://github.com/rodrigues-heric/sistema-dre)

Kanban do projeto no GitHub: [Board](https://github.com/users/rodrigues-heric/projects/2)

> Acabei não fazendo tudo que gostaria no board por falta de tempo. Em um cenário real eu prezo pelo organização e clareza com o time.

## Instalação e execução

### Backend

1. Abra seu terminal na raíz do projeto
2. Navegue para a pasta backend (`cd backend`)
3. Instale as dependências do projeto com `npm install --include=dev`

### Frontend

1. Abra seu terminal na raíz do projeto
2. Navegue para a pasta frontend (`cd frontend`)
3. Instale as dependências do projeto com `npm install --include=dev`

### Execução

1. Na pasta backend execute `npm run dev`
2. Aguarde até que a mensagem "Server runnig: http://localhost:3000" esteja visível
3. Na pasta frontend execute `npm run dev`
4. Aguarde até que a mensagem "Local: http://localhost:5173/" esteja visível
5. Acesse o endereço http://localhost:5173/ no seu navegador

#### Testes (backend)

1. Abra seu terminal na raíz do projeto
2. Navegue para a pasta backend (`cd backend`)
3. Execute `npm run test`
4. Verifique os logs

## Estrututra do projeto e decisões técnicas

### Backend

```bash
src
├── app.test.ts
├── app.ts
├── controllers
│   ├── dreController.test.ts
│   └── dreController.ts
├── interfaces # Interfaces comuns a mais de um arquivo
│   └── dreInterface.ts
├── logger.ts # Config do logger (Morgan + Chalk)
├── middlewares # Centralização de erros e validações
│   ├── errorHandler.test.ts
│   ├── errorHandler.ts
│   ├── validateResource.test.ts
│   └── validateResource.ts
├── mocks # Separado do service para melhor manutenção
│   └── database.ts
├── routes
│   └── dreRoutes.ts
├── schemas # Validação de input de rota
│   └── dreSchema.ts
├── server.ts # Startup do servidor
├── services
│   ├── dreService.test.ts
│   └── dreService.ts
└── utils # Genéricos do projeto
    ├── appError.test.ts
    └── appError.ts
```

Backend construído em Node com Express conforme solicitado pelo desafio técnico.

Mantive a estrutura sugerida de router -> controller -> service e adicionei algumas pastas extras.

No service utilizei um cache in memory para otimização de tempo. Se a combinação mês:vertical existir então retorna do cache. Caso contrátrio atualiza o cache e retorna o valor.

No controller mantive apenas a chamada para o service e a response para quem o chamar.

Adicionei middlewares para gerenciamento de erros. Dessa forma a redução de try catchs no código é bastante alta. Isso permite maior concentração no happy path.

No route apenas direciono para o controller adequado mas antes validando o input. Também foi adicionado um middleware para este fim.

A estrutura ficou um pouco grande para o escopo do projeto porém está organizada para uma possível escala de tamanho e complexidade. Cada camada com sua devida responsabilidade.

Utilizei o Jest para os testes do backend e defini a cobertura mínima como 80%.

### Frontend

```bash
src/
├── App.css
├── App.tsx
├── components
│   ├── dre # Component principal da aplicação
│   │   └── RentabilidadeCard
│   │       ├── RentabilidadeCard.css
│   │       └── RentabilidadeCard.tsx
│   └── ui # Elementos de UI separados por responsablidade
│       ├── button
│       │   ├── Button.css
│       │   └── Button.tsx
│       ├── emptyState
│       │   ├── EmptyState.css
│       │   └── EmptyState.tsx
│       ├── footer
│       │   ├── Footer.css
│       │   └── Footer.tsx
│       ├── header
│       │   ├── Header.css
│       │   └── Header.tsx
│       ├── metric
│       │   ├── Metric.css
│       │   └── Metric.tsx
│       ├── monthPicker
│       │   ├── MonthPicker.css
│       │   └── MonthPicker.tsx
│       ├── skeleton
│       │   ├── Skeleton.css
│       │   └── Skeleton.tsx
│       └── verticalSelector
│           ├── VerticalSelector.css
│           └── VerticalSelector.tsx
├── hooks # Hooks para separação de lógica/renderização
│   └── useDreCalculate.ts
├── index.css
├── main.tsx
├── mappers # Mapper de dados auxiliar para limpar o código
│   └── dreMapper.ts
└── services # Comunicações com backend
    ├── api.ts
    └── dreService.ts
```

Separei as responsabilidades do frontend entre elementos de lógica e elementos de renderização de UI.

Em components/ui estão apenas os blocos reutilizáveis e genéricos para manter um design system de qualidade.

Em components/dre está o component principal que amarra os blocos para a tela principal da aplicação (responsividade desktop e mobile).

Os estilos visuais foram feitos em arquivos css próprios, evitando o uso de bibliotecas para o desafio técnico.

No mapper fiz um mapeamento de dados para retirar lógicas desnecessárias do código principal.

No service centralizei as chamadas ao backend, focando apenas na lógica e organização dos dados.

No hooks fiz o meio campo entre a ui e o service para separação de responsabilidades.

Utilizei um toast para notificar o usuário de sucessos e erros ao buscar os dados.

Screenshots ao final do arquivo.

## Melhorias futuras

### Backend

Em um contexto de trabalho com mais pessoas eu pensaria em utilizar outro framework. O Express é muito bom por ser leve porém pode acabar virando uma confusão se mal organizado.

Acredito que NestJS, por ter uma estrutura mais rígida, se encaixaria melhor para um time grande. Assim, não importa quem fosse mexer no código sempre saberia o que procurar e onde.

No desafio eu utilizei cache in memory por conta do tempo curto. Em uma v2 eu utilizaria Redis, ou outro, para o gerenciamento de cache. Dessa forma não teria problemas ao reiniciar o servidor.

Ainda sobre uma v2, utilizaria uma chave de idempotência para validar requests duplicados e evitar consumo de recursos do servidor.

Por fim eu adicionaria uma ferramenta de automação/integração, como o n8n, para que o projeto pudesse se comunicar com outras frentes.

Para isso eu garantiria um Canonical Data Model para as comunicações ocorrem de forma correta.

### Frontend

Utilizei css puro para o desafio mas em um cenário real eu estudaria utilizar bibliotecas para acelerar o desenvolvimento.

A combinação que me vem a mente é Tailwind + Shadcn. Assim, uma vez que o design system fosse definido não seria necessário criar os estilos na mão.

Shadcn para a criação de componentes abertos e o Tailwind para estilizar. Isso poderia ficar envelopado em uma biblioteca/submodule e ser apenas consumido sem alterações em seus códigos.

Devido ao tempo eu não adicionei os testes do frontend mas certamente os faria com mais tempo.

As opções de verticais ficaram hardcoded no código. Na v2 eu faria uma requisição ao backend durante o startup para ter as opções definidas. Ou faria a requisição quando acessasse a página.

Não utilizei cache no frontend mas seria muito útil para guardar uma quantidade de dados, visto que o usuário provavelmente faria uma análise de alguns meses.

Tendo cache seria possível fazer uma paginação e análise mais aprofundada.

Por fim eu adicionaria um botão simples de export para excel para que os dados possam ser analisados em outra ferramenta do usuário caso ele quisesse.

### Ambos

Em ambas as pontas eu adicionaria um sistema de login/segurança. O login seria pelo menos um JWT HttpOnly para evitar leitura via Javascript ou um SSO caso a ferramenta estivesse integrada em um sistema mais robusto

## Screenshots

<img width="1918" height="1002" alt="Captura de tela de 2026-04-24 08-49-09" src="https://github.com/user-attachments/assets/04904dc8-f05f-4766-8eb8-1655f39eeb4d" />

<img width="1918" height="1002" alt="Captura de tela de 2026-04-24 08-49-28" src="https://github.com/user-attachments/assets/973bd11f-2827-46c1-8aaa-e8d8b349100e" />

<img width="398" height="839" alt="Captura de tela de 2026-04-24 08-49-52" src="https://github.com/user-attachments/assets/65012f7e-4a81-42ad-9da8-ff232dc0df1c" />

<img width="398" height="839" alt="Captura de tela de 2026-04-24 08-50-11" src="https://github.com/user-attachments/assets/f5856082-5132-4832-8023-c3c603118bc0" />
