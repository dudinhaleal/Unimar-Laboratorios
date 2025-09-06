# UNIMAR - Catálogo de Laboratórios

Um catálogo interativo moderno para os laboratórios da Universidade de Marília, desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Características

- **Interface Moderna**: Design responsivo e intuitivo com Tailwind CSS
- **Componentes Reutilizáveis**: Arquitetura baseada em componentes com shadcn/ui
- **TypeScript**: Tipagem estática para maior segurança e produtividade
- **Filtros Avançados**: Busca por nome, curso e tipo de laboratório
- **Mapa Interativo**: Localização dos laboratórios com Mapbox
- **Sistema de Agendamento**: Formulário para agendar visitas aos laboratórios
- **Hooks Customizados**: Lógica de negócio separada em hooks reutilizáveis

## 🛠️ Tecnologias

- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS
- **shadcn/ui** - Componentes de interface
- **React Router** - Roteamento
- **Lucide React** - Ícones
- **Mapbox GL JS** - Mapas interativos

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface (shadcn/ui)
│   ├── sections/       # Seções da página principal
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── Footer.tsx      # Rodapé da aplicação
│   └── ...
├── hooks/              # Hooks customizados
│   ├── useLaboratories.ts
│   ├── useBooking.ts
│   └── ...
├── layouts/            # Layouts da aplicação
├── pages/              # Páginas da aplicação
├── types/              # Definições de tipos TypeScript
├── data/               # Dados mockados
└── lib/                # Utilitários
```

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Compilar para produção:**
   ```bash
   npm run build
   ```

4. **Visualizar build de produção:**
   ```bash
   npm run preview
   ```

## 🎨 Design System

O projeto utiliza um design system consistente baseado nas cores da UNIMAR:

- **Primary**: #004AAD (Azul UNIMAR)
- **Secondary**: #0084DC (Azul claro)
- **Accent**: #0084DC (Destaque)
- **Background**: #FEFEFE (Branco)
- **Foreground**: #283146 (Cinza escuro)

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🔧 Funcionalidades

### Laboratórios
- Listagem de todos os laboratórios disponíveis
- Filtros por curso e tipo
- Busca por nome ou descrição
- Detalhes completos de cada laboratório
- Informações sobre equipamentos e responsáveis

### Mapa Interativo
- Localização precisa dos laboratórios
- Marcadores interativos
- Informações detalhadas ao clicar
- Controles de navegação

### Sistema de Agendamento
- Formulário de agendamento de visitas
- Validação de campos obrigatórios
- Confirmação visual de envio
- Integração com dados dos laboratórios

## 🧩 Componentes Principais

- **Header**: Navegação principal e ações
- **HeroSection**: Seção de apresentação
- **SearchSection**: Filtros e busca
- **LaboratoriesSection**: Listagem de laboratórios
- **ResourcesSection**: Recursos especiais
- **MapSection**: Mapa interativo
- **BookingModal**: Modal de agendamento

## 🎯 Hooks Customizados

- **useLaboratories**: Gerenciamento de laboratórios e filtros
- **useBooking**: Gerenciamento do sistema de agendamento
- **useTheme**: Gerenciamento de tema (claro/escuro)

## 📦 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linter

## 🌟 Melhorias Implementadas

1. **Arquitetura Limpa**: Separação clara de responsabilidades
2. **Componentes Reutilizáveis**: Código modular e manutenível
3. **TypeScript**: Tipagem estática para maior segurança
4. **Hooks Customizados**: Lógica de negócio separada
5. **Design System**: Consistência visual
6. **Responsividade**: Funciona em todos os dispositivos
7. **Performance**: Otimizações de build e carregamento

## 📄 Licença

Este projeto é propriedade da Universidade de Marília - UNIMAR.

---

Desenvolvido com ❤️ para a Universidade de Marília
