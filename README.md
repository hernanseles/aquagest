# AquaGest

Plataforma demonstrativa para acompanhar consumo de água de instituições. Interface em português com login simulado, cadastro e edição de prédios, registros mensais, gráficos, metas, alertas, relatórios CSV e configurações.

## Executar

```sh
npm install
npm run dev
```

```sh
npm test
npm run build
```

## Demonstração

Qualquer e-mail de formato válido e senha não vazia permite entrar. Ou use **Explorar demonstração**. Não use senhas reais. Não existe autenticação, banco de dados ou envio de e-mail. Senhas nunca são salvas. Os dados ficam no navegador e são compartilhados entre todos os logins daquele navegador. A sessão é local à aba.

Consumos representam volume mensal em litros, não leituras acumuladas. Um prédio tem no máximo um registro por mês. Alertas comparam o mês imediatamente anterior e usam limite inicial de aumento superior a 10%. Base ausente ou zero não produz percentual. O alerta não confirma vazamento.

## Publicação

Projeto Vite, saída `dist`, comando `npm run build`. `vercel.json` configura o build. Vincule este repositório à Vercel para publicar automaticamente a branch `main`. Não são necessárias variáveis de ambiente.

## Design

Manrope e DM Sans locais, detalhes de vidro translúcido inspirados na água, componentes Radix e gráficos Recharts. Veja DESIGN.md e UX-CONTRACT.md.
