# Contrato de experiência

## Contexto e fonte
Brief do usuário aprovado nesta conversa: protótipo exclusivamente frontend, qualquer e-mail válido e senha não vazia, cadastro fictício, prédios, consumo mensal, alertas e relatórios. Sem cobrança, dados de sensores, envio de e-mail ou autorização de usuários. Localidade pt-BR. Meses são valores YYYY-MM sem dependência do fuso do navegador. Dados iniciais: maio a outubro de 2026.

## Canonical UI Map
| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Select/Listbox | Field e month-control | Este contrato | native, popup do sistema aceito | Teclado e inspeção visual |
| Date | Field type month | Este contrato | native, popup do sistema aceito | Registro mensal |
| Form | Field, Password, focusError | src/ui.jsx | create, edit | Validação e fluxo |
| Scrollbar | src/styles.css | DESIGN.md | global | CSS e viewport |
| Toast | App notify | Este contrato | success | Região live |
| CRUD | App commit e domain.js | Brief aprovado | local | Testes de domínio e fluxo |

## Estado e navegação
Rotas hash. Filtros e busca transitórios em memória: dados locais não compartilháveis entre usuários; a rota permanece navegável. Tabelas paginadas em grupos de seis; busca e exclusão corrigem a página. Gráficos exibem até os últimos seis meses com registros. Formulários e listas usam rolagem natural do documento. Menu móvel usa diálogo acessível. Links de prédio abrem detalhes e o histórico permite editar registros.

## Persistência e credenciais
localStorage guarda apenas instituição, prédios, registros e chaves dos alertas analisados. sessionStorage guarda apenas o nome da sessão simulada. Nenhuma senha é persistida ou transmitida. Todos os logins compartilham o mesmo conjunto local. Falhas de gravação preservam o formulário e mostram mensagem persistente. Mudanças em outra aba bloqueiam gravação desatualizada e pedem recarregamento.

## Operações
Criar e editar prédio retornam à lista. Registrar consumo atualiza o período e fecha o modal. Um registro por prédio/mês; atualização deixa explícito o valor substituído. Alertas com aumento superior ao limite em relação ao mês imediatamente anterior, nunca diagnóstico. Ausência de base ou base zero não gera percentual. Alertas analisados reaparecem se os valores mudarem. Exclusão do prédio remove seu histórico após confirmação. Restaurar substitui todos os dados locais após confirmação. CSV exporta todos os resultados filtrados, não apenas a página, com escape de fórmulas.

## Validação e feedback
Formulários noValidate com erros de texto e foco no primeiro campo inválido. Senhas ocultas e alternância acessível. Busca com limpeza explícita. Campos não negativos e limites finitos. Radix Dialog controla foco, Escape e fundo inerte; confirmação destrutiva inicialmente foca Cancelar. Alterações não salvas exigem confirmação. Região de toast única. Valores vazios, estados sem resultados e registros ausentes têm explicações.

## Verificação
Build Vite, testes de domínio, auditoria estática da skill e inspeção do fluxo principal em desktop e mobile. Sem testes exaustivos por preferência explícita do usuário. Não há servidor ou operações remotas a simular.
