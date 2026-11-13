import type { UnitContent } from "./types";

export const unitData: UnitContent = {
  unitNumber: "Módulo 4 · Unidade 4",
  unitTitle: "Integrações Avançadas com Bancos de Dados e Ferramentas Externas",
  unitSubtitle:
    "Como conectar agentes de IA ao mundo real — com dados confiáveis, ações governadas e risco sob controle.",
  overview:
    "Esta unidade encerra a formação em IA Generativa conectando três mundos: o raciocínio do modelo, os dados da organização e as ferramentas que executam trabalho real. Você vai dominar MCP, comunicação A2A, consultas sob demanda, guardrails, CRM/ERP e métricas de retorno.",
  simulatorTitle: "Simulador de Integração Segura (MCP + Banco + Guardrail)",
  simulatorSubtitle:
    "Veja como uma pergunta do usuário atravessa a camada de integração até retornar um dado confiável.",
  simulatorSteps: [
    {
      id: "usuario",
      label: "1. Pedido do Usuário",
      shortDesc: "Pergunta em linguagem natural.",
      detail:
        "Um gestor pergunta: 'Quantos pedidos da região Nordeste estão com entrega atrasada hoje?'.",
      payload: `{
  "pergunta": "Pedidos atrasados na região Nordeste hoje",
  "usuario_perfil": "gerente_logistica"
}`,
    },
    {
      id: "agente",
      label: "2. Agente (LLM)",
      shortDesc: "Identifica a ferramenta e parâmetros.",
      detail:
        "Em vez de inventar um número, o agente decide consultar a ferramenta padronizada via protocolo MCP com filtro específico.",
      payload: `{
  "tool": "consultar_pedidos_atrasados",
  "parametros": {
    "regiao": "Nordeste",
    "apenas_hoje": true
  }
}`,
    },
    {
      id: "mcp",
      label: "3. Camada MCP & Guardrail",
      shortDesc: "Valida escopo, limites e leitura.",
      detail:
        "O servidor MCP garante menor privilégio (somente leitura), bloqueia comandos perigosos (como DELETE) e limita a quantidade de linhas retornadas.",
      payload: `{
  "protocolo": "MCP",
  "permissao": "READ_ONLY",
  "guardrail": "BLOQUEAR_ESCRITA_E_EXCLUSAO",
  "limite_linhas": 50
}`,
    },
    {
      id: "banco",
      label: "4. Banco / ERP",
      shortDesc: "Executa consulta precisa sob demanda.",
      detail:
        "O banco de dados retorna apenas os 3 pedidos atrasados com os campos necessários (sem jogar a tabela inteira no prompt).",
      payload: `{
  "total_atrasados": 3,
  "pedidos": ["#881", "#894", "#902"],
  "cache_hit": false
}`,
    },
    {
      id: "resposta",
      label: "5. Resposta Governada",
      shortDesc: "Entrega dado real com métricas.",
      detail:
        "O agente responde ao gestor com números exatos e o sistema registra latência, custo e log de auditoria.",
      payload: `{
  "resposta": "Hoje há 3 pedidos atrasados no Nordeste: #881, #894 e #902.",
  "latencia": "0.8s",
  "auditado": true
}`,
    },
  ],
  concepts: [
    {
      id: "u4c1",
      chapter: "Capítulo 1 · A Ponte",
      title: "O Agente que Fala vs. O Agente que Opera",
      summary:
        "Por que integração não é só 'conectar API', mas desenhar um sistema confiável.",
      fromZero:
        "Um agente que só fala responde com base no que decorou. Um agente que opera consulta estoques, clientes e agendas em tempo real. Mas toda ação real traz risco — por isso precisamos de um contrato de confiança.",
      inPractice:
        "Entradas confiáveis (dados reais e atualizados) + saídas controladas (ações com limites) = valor real para o negócio.",
      attention:
        "Conectar uma API sem validar permissões e limites transforma um erro simples da IA em um incidente operacional.",
      keyTakeaway:
        "Integração de verdade une dados confiáveis, ações governadas e risco sob controle.",
    },
    {
      id: "u4c2",
      chapter: "Capítulo 2 · Fundamentos",
      title: "A Evolução: Bancos, APIs, Automação e Agentes",
      summary:
        "O que muda com a moda e o que permanece como base sólida.",
      fromZero:
        "Bancos de dados organizaram as informações; APIs permitiram que sistemas conversassem; automações criaram fluxos fixos; e os agentes trouxeram raciocínio dinâmico sobre essas mesmas bases.",
      inPractice:
        "Empresas que já têm bancos organizados e APIs bem documentadas conseguem adotar agentes de IA muito mais rápido.",
      attention:
        "Agente de IA não conserta banco de dados bagunçado — se o dado na origem estiver errado, o agente vai responder errado.",
      keyTakeaway:
        "Modas passam, mas dados organizados e APIs bem feitas continuam sendo a fundação.",
    },
    {
      id: "u4c3",
      chapter: "Capítulo 3 · Protocolos",
      title: "MCP (Model Context Protocol) e Comunicação A2A",
      summary:
        "O 'USB-C da IA' e como agentes colaboram com outros agentes.",
      fromZero:
        "Antes do MCP, cada ferramenta exigia uma adaptação exclusiva. O MCP virou um padrão universal (como o cabo USB-C) para conectar qualquer agente a bancos e sistemas. Já o A2A (Agent-to-Agent) permite que um agente peça ajuda a outro especialista.",
      inPractice:
        "Um Agente de Atendimento usa MCP para ler o banco de pedidos e usa A2A para consultar o Agente Financeiro sobre um estorno.",
      attention:
        "Sempre defina um contrato claro para cada ferramenta: o que entra, o que sai e se ela é síncrona, assíncrona ou idempotente.",
      keyTakeaway:
        "Padronização com MCP evita retrabalho e facilita evoluir o sistema.",
    },
    {
      id: "u4c4",
      chapter: "Capítulo 4 & 5 · Dados sob Demanda",
      title: "O Equívoco do Agente Onisciente",
      summary:
        "Por que nunca devemos despejar o banco inteiro no prompt.",
      fromZero:
        "Tentar enviar milhares de linhas do banco para a IA de uma vez gera lentidão que contamina o sistema, explode a fatura de tokens e faz o modelo se confundir.",
      inPractice:
        "O jeito certo é buscar dados sob demanda com perguntas precisas: trazer apenas as colunas e linhas exatas para aquela decisão.",
      attention:
        "Decisões fora do tempo (usar dado desatualizado) ou consultas pesadas sem filtro derrubam a performance do banco da empresa.",
      keyTakeaway:
        "Menos dados irrelevantes no prompt = mais velocidade, economia e exatidão.",
    },
    {
      id: "u4c5",
      chapter: "Capítulo 6 · Otimização",
      title: "4 Padrões que Funcionam + Guardrails",
      summary:
        "Limitar escopo, reutilizar resultados, evitar redundância e proteger o banco.",
      fromZero:
        "1) Limitar escopo: o agente só vê as tabelas necessárias. 2) Reutilizar resultados (cache): não perguntar a mesma coisa toda hora. 3) Evitar redundância: consultas enxutas. 4) Guardrails: travas contra comandos destrutivos.",
      inPractice:
        "Se 500 clientes perguntam o horário da loja, o cache responde na hora sem precisar consultar o banco 500 vezes.",
      attention:
        "Nunca deixe um agente montar comandos livres de exclusão ou alteração direta no banco de produção.",
      keyTakeaway:
        "Trate cada consulta do agente como um produto: rápida, enxuta e protegida por guardrails.",
    },
    {
      id: "u4c6",
      chapter: "Capítulo 7 & 8 · Arquitetura e Sistemas",
      title: "3 Níveis de Integração e Onde o Agente Atua (CRM/ERP)",
      summary:
        "Leitura, Sincronização e Ação Direta nos sistemas da empresa.",
      fromZero:
        "Nível 1 (Leitura): só consulta na hora. Nível 2 (Sincronização): mantém cópia rápida para busca. Nível 3 (Ação Direta): altera CRM (clientes), ERP (estoque/financeiro) ou dispara fluxos externos.",
      inPractice:
        "Toda ação crítica no ERP ou em meios de pagamento deve seguir o Padrão de Ação Crítica: validar parâmetros e exigir confirmação.",
      attention:
        "Comece sempre pelo Nível 1. Só libere o Nível 3 quando houver auditoria e aprovação humana.",
      keyTakeaway:
        "O agente não substitui o ERP ou CRM — ele se conecta a eles com segurança.",
    },
    {
      id: "u4c7",
      chapter: "Capítulo 9 & 10 · Riscos e Governança",
      title: "Os 4 Grandes Riscos e os Pilares de Controle",
      summary:
        "Acesso excessivo, execução indevida, cascata e ataques via ferramentas.",
      fromZero:
        "Em produção enfrentamos: acesso excessivo, erro de lógica, efeito cascata (um erro derruba outros sistemas) e ataques escondidos em dados. Combatemos isso com Menor Privilégio, Human-in-the-Loop, Logs e Monitoramento.",
      inPractice:
        "Se o agente começar a fazer 20 chamadas por segundo fora do padrão, o monitoramento dispara um alerta e bloqueia a execução.",
      attention:
        "Logs e auditoria garantem evidência completa caso seja necessário reverter ou explicar uma ação.",
      keyTakeaway:
        "Governança sólida é o que transforma um piloto em um sistema confiável em produção.",
    },
    {
      id: "u4c8",
      chapter: "Capítulo 11 & 12 · Economia e Encerramento",
      title: "ROI, Custos Ocultos e as 4 Métricas que Importam",
      summary:
        "Como provar o valor da integração e fechar o curso com visão prática.",
      fromZero:
        "O retorno (ROI) nasce da economia de tempo e da redução de erros. Mas existem custos ocultos: tokens, latência e manutenção. Por isso medimos 4 indicadores: Taxa de Sucesso, Latência, Custo por Tarefa e Intervenção Humana.",
      inPractice:
        "Você conclui o curso dominando a tríade da IA em produção: Raciocínio do Modelo + Dados Confiáveis + Ações Governadas.",
      attention:
        "O que não é medido não pode ser melhorado nem justificado para a liderança.",
      keyTakeaway:
        "Comece simples, meça tudo, proteja os dados e mantenha o humano no controle.",
    },
  ],
  quiz: [
    {
      id: 1,
      question: "O que significa dizer que 'integração não é só conectar API'?",
      options: [
        "Significa que APIs não funcionam com IA.",
        "Significa desenhar um sistema confiável com dados validados, limites, logs e controle de risco.",
        "Significa usar apenas planilhas manuais.",
        "Significa criar telas sem botões.",
      ],
      correctIndex: 1,
      explanation:
        "Conectar sem governança expõe a empresa a erros rápidos; integrar é projetar o sistema de ponta a ponta.",
    },
    {
      id: 2,
      question: "Qual é o papel do protocolo MCP (Model Context Protocol)?",
      options: [
        "Padronizar a conexão entre agentes de IA e fontes de dados/ferramentas, como um 'USB-C da IA'.",
        "Substituir os bancos de dados relacionais.",
        "Criar apresentações de slides.",
        "Comprimir arquivos de vídeo.",
      ],
      correctIndex: 0,
      explanation:
        "O MCP elimina adaptações sob medida para cada ferramenta, criando um padrão único e seguro.",
    },
    {
      id: 3,
      question: "Para que serve a comunicação A2A (Agent-to-Agent)?",
      options: [
        "Para um agente colaborador pedir ajuda a outro agente especialista.",
        "Para desligar o servidor.",
        "Para aumentar a fonte do navegador.",
        "Para evitar o uso de APIs.",
      ],
      correctIndex: 0,
      explanation:
        "Em arquiteturas complexas, agentes especialistas colaboram mantendo seus próprios escopos de segurança.",
    },
    {
      id: 4,
      question: "Por que 'jogar o banco de dados inteiro no prompt' é um equívoco?",
      options: [
        "Gera lentidão, explode o custo de tokens e aumenta o risco de o modelo se perder.",
        "Porque bancos de dados não têm texto.",
        "Porque modelos de IA preferem arquivos de áudio.",
        "Não é um equívoco, é a melhor prática.",
      ],
      correctIndex: 0,
      explanation:
        "O correto é trabalhar com dados sob demanda e perguntas precisas.",
    },
    {
      id: 5,
      question: "Qual é a função do Cache (reutilizar resultados) em consultas de agentes?",
      options: [
        "Evitar consultar o banco repetidamente para a mesma informação, ganhando velocidade e economia.",
        "Apagar dados antigos dos clientes.",
        "Impedir que o agente responda.",
        "Gerar erros aleatórios.",
      ],
      correctIndex: 0,
      explanation:
        "Reutilizar respostas recentes reduz carga no banco e diminui a latência para o usuário.",
    },
    {
      id: 6,
      question: "No modelo dos 3 níveis de integração, qual é o mais seguro para começar?",
      options: [
        "Nível 3 (Ação Direta irrestrita)",
        "Nível 1 (Leitura sob demanda, sem alterar dados)",
        "Nível 0 (sem banco)",
        "Dar senha de administrador logo no início",
      ],
      correctIndex: 1,
      explanation:
        "Começar com Leitura (Nível 1) permite validar a precisão do agente sem risco de corromper sistemas.",
    },
    {
      id: 7,
      question: "O que é o 'risco de impacto em cascata'?",
      options: [
        "Uma falha em um sistema disparar uma reação em cadeia que derruba ou corrompe outros sistemas.",
        "Uma queda de água no escritório.",
        "Um efeito visual de transição em slides.",
        "Um tipo de gráfico financeiro.",
      ],
      correctIndex: 0,
      explanation:
        "Sistemas integrados são interligados; guardrails e limites evitam que um erro se propague.",
    },
    {
      id: 8,
      question: "Qual combinação representa os pilares de governança em produção?",
      options: [
        "Acesso total + sem logs + sem revisão",
        "Menor privilégio + Human-in-the-Loop + Logs/Auditoria + Monitoramento",
        "Cache infinito + senhas compartilhadas",
        "Apenas um prompt bem escrito",
      ],
      correctIndex: 1,
      explanation:
        "Esses quatro pilares mantêm o risco sob controle e garantem rastreabilidade.",
    },
    {
      id: 9,
      question: "Quais são as 4 métricas que importam para avaliar um agente integrado?",
      options: [
        "Número de cores, tamanho do logo, fonte e brilho da tela.",
        "Taxa de Sucesso, Latência, Custo por Tarefa e Taxa de Intervenção Humana.",
        "Quantidade de cliques no mouse e temperatura da sala.",
        "Apenas o total de linhas de código.",
      ],
      correctIndex: 1,
      explanation:
        "Essas quatro métricas conectam desempenho técnico diretamente ao retorno de negócio (ROI).",
    },
    {
      id: 10,
      question: "Qual tríade resume a IA Generativa em produção ao final do curso?",
      options: [
        "Raciocínio do Modelo + Dados Confiáveis + Ações Governadas.",
        "Apenas Prompt + Sorte + Velocidade.",
        "Banco aberto + Acesso total + Zero logs.",
        "Slides + Imagens + Áudio.",
      ],
      correctIndex: 0,
      explanation:
        "A união dessas três frentes entrega valor real com segurança e responsabilidade.",
    },
  ],
  memoryPairs: [
    {
      id: "u4m1",
      term: "MCP",
      definition: "Protocolo padrão ('USB-C da IA') para conectar agentes a dados e ferramentas.",
    },
    {
      id: "u4m2",
      term: "Dados sob Demanda",
      definition: "Buscar só o necessário na hora certa, sem despejar o banco no prompt.",
    },
    {
      id: "u4m3",
      term: "Guardrails",
      definition: "Travas de segurança que bloqueiam comandos destrutivos ou fora de escopo.",
    },
    {
      id: "u4m4",
      term: "A2A",
      definition: "Comunicação padronizada para um agente colaborar com outro agente.",
    },
    {
      id: "u4m5",
      term: "Cache",
      definition: "Reutilizar resultados recentes para reduzir lentidão e custo.",
    },
    {
      id: "u4m6",
      term: "ROI em Agentes",
      definition: "Retorno obtido com economia de tempo e redução de erros menos custos ocultos.",
    },
  ],
};
