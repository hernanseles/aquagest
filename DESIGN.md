---
version: alpha
colors:
  primary: "#087f8c"
  ink: "#20383f"
  muted: "#687e85"
  background: "#f5f8f9"
  surface: "#ffffff"
  border: "#e3ebed"
  mint: "#eaf7f6"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
  body:
    fontFamily: "DM Sans, sans-serif"
rounded:
  DEFAULT: "16px"
  control: "9px"
spacing:
  page: "36px"
  panel: "24px"
components:
  button: {}
  card: {}
  dialog: {}
---
# AquaGest

## Overview
Plataforma demonstrativa de monitoramento de água para instituições brasileiras, em português. O usuário aprovou login simulado, dados locais e publicação GitHub/Vercel. A direção visual combina clareza institucional com a materialidade da água. A assinatura é uma gota translúcida na entrada e reflexos sutis nos destaques.

DESIGN_VARIANCE: 4; MOTION_INTENSITY: 3; VISUAL_DENSITY: 5. A prioridade é clareza de dados, com personalidade concentrada na entrada. Aplicação própria React com primitivas acessíveis Radix, sem fingir pertencer a Fluent ou a outro sistema. A skill taste orienta a entrada, tipografia e consistência; frontend-design-premium orienta o painel; Emil orienta feedback e movimento.

## Colors
Tokens canônicos são as variáveis em `src/styles.css :root`. Este documento espelha a paleta; componentes e gráficos devem usar os mesmos valores. Tema claro único. Cores de alerta e sucesso têm rótulos e ícones. O vidro é uma aproximação web, não um componente nativo da Apple. Tabelas e formulários usam superfície opaca.

## Typography
Manrope em títulos e métricas; DM Sans em controles e corpo. Fontes locais via Fontsource. Números tabulares e formatação pt-BR. Sem serifas decorativas ou letras em movimento.

## Layout
Menu de 240 px no desktop, conteúdo até 1530 px, respiro de 36 px. Painéis compartilham raio de 16 px. Em telas abaixo de 768 px, menu em diálogo e conteúdo em coluna; tabelas preservam colunas em rolagem horizontal própria.

## Elevation & Depth
Sombras apenas em modais, notificações e vidro. Bordas suaves no conteúdo. Reflexos não ficam atrás de texto tabular. Vidro com fallback opaco e respeito à preferência de transparência reduzida.

## Shapes
Raio consistente em controles e painéis. Gota e anéis são ilustrações de marca, não gráficos de dados. Ícones Lucide, família já declarada na primeira versão do projeto.

## Components
Primitivas compartilhadas em `src/ui.jsx`: Button, Field, Password, Modal, Pager, Empty e SearchBox. Modal usa Radix para foco e teclado. Botões com pressão sutil de 140 ms; entrada de modal de 200 ms. Sem animação contínua em gráficos. Reduced motion desativa movimento. Busca local imediata com limpeza explícita. Erros vinculados aos campos.

## Do's and Don'ts
- Manter valores, unidades e comparações explícitos.
- Aplicar vidro em detalhes, nunca sacrificar legibilidade.
- Não afirmar detecção real de vazamentos ou autenticação real.
- Não usar efeitos pesados de WebGL em tarefas administrativas.

## Referências
- https://ui.aceternity.com/components/liquid-glass
- https://www.reactbits.dev/components/glass-surface
- Filosofia Emil Kowalski: resposta imediata, animação motivada, respeito a movimento reduzido.
As referências orientam o tratamento visual; a implementação CSS é própria e não copia componentes licenciados.
