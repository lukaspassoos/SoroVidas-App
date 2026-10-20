# 🩺 SoroVidas — Localizador de Unidades de Saúde

Aplicativo mobile para Android com a proposta de facilitar a localização de unidades de saúde que realizam atendimento relacionado a intoxicações e que possam disponibilizar soros antiofídicos.

> **Status do projeto:** 🚧 Em desenvolvimento acadêmico  
> As funcionalidades descritas neste README fazem parte do escopo planejado e serão implementadas e validadas ao longo do projeto.

## 📌 Sobre o projeto

O **SoroVidas** é um projeto de extensão desenvolvido na disciplina **Programação para Dispositivos Móveis em Android**, da **UniMetrocamp (Wyden)**. A proposta é centralizar informações úteis sobre unidades de saúde, permitindo que o usuário consulte estabelecimentos conforme sua localização e necessidade.

A aplicação pretende apresentar informações como nome da unidade, endereço, distância quando calculável, horário de funcionamento, telefone e serviços oferecidos, incluindo a informação sobre disponibilidade de soro antiofídico quando esse dado estiver disponível na fonte consultada.

## 🎯 Objetivos

- Ajudar o usuário a identificar unidades de saúde próximas.
- Apresentar unidades encontradas em uma lista.
- Permitir pesquisa por nome e filtros por tipo de serviço.
- Consultar dados por meio de uma API REST, utilizando JSON.
- Disponibilizar uma área educativa com dicas básicas de primeiros socorros relacionadas ao contexto do aplicativo.
- Tratar situações como falhas de conexão, ausência de resultados e indisponibilidade dos dados.

## ✨ Funcionalidades previstas

- **Localização:** solicitar autorização para acessar a localização do dispositivo.
- **Lista de unidades:** exibir unidades retornadas pela fonte de dados e, quando houver coordenadas, permitir organização por proximidade.
- **Pesquisa:** localizar unidades pelo nome.
- **Filtros:** restringir os resultados conforme os serviços informados pela fonte de dados.
- **Detalhes da unidade:** apresentar endereço, distância quando calculável, horário, telefone e serviços quando disponíveis.
- **Informações sobre soros antiofídicos:** exibir essa informação somente quando fornecida pela fonte de dados.
- **Primeiros socorros:** oferecer conteúdo educativo e informativo.
- **Tratamento de erros:** apresentar mensagens compreensíveis em caso de falha de conexão, resposta inválida ou ausência de dados.

> A lista acima representa o escopo planejado. A disponibilidade e o funcionamento de cada recurso dependem da implementação e dos testes.

## 🛠️ Tecnologias previstas

- **React Native** — desenvolvimento da interface mobile.
- **JavaScript** — linguagem de programação da aplicação.
- **API REST** — comunicação com o serviço responsável pelos dados das unidades.
- **JSON** — formato de troca de dados.
- **Serviço de geolocalização do dispositivo** — obtenção da localização mediante autorização.
- **Banco de dados ou fonte persistente de dados** — solução a ser definida pelo grupo para fornecer e manter os registros das unidades.

A arquitetura prevista separa a interface mobile, a lógica de interação e o acesso aos dados. A definição da API e da estratégia de armazenamento ainda faz parte das atividades do projeto.

## 📱 Telas planejadas

1. **Tela inicial:** apresentação do aplicativo e atalhos para localização, pesquisa e informações.
2. **Localização e lista:** exibição das unidades encontradas e da distância, quando disponível.
3. **Pesquisa e filtros:** busca por nome e seleção de critérios relacionados aos serviços.
4. **Detalhes da unidade:** consulta das informações disponibilizadas sobre o estabelecimento.
5. **Dicas de primeiros socorros:** conteúdo educativo relacionado ao propósito do aplicativo.

### Fluxo principal

`Tela inicial → Permissão de localização → Lista de unidades → Pesquisa/filtros → Seleção da unidade → Detalhes`

## 🧱 Modelo inicial de dados

O escopo prevê inicialmente as seguintes entidades, sujeitas a ajustes conforme a API e a solução de armazenamento forem definidas:

| Entidade | Atributos previstos |
|---|---|
| `UnidadeSaude` | `id`, `nome`, `endereco`, `numero`, `bairro`, `cidade`, `latitude`, `longitude`, `telefone`, `horarioFuncionamento`, `disponibilidadeSoroAntiofidico` |
| `Servico` | `id`, `nome`, `descricao` |
| `UnidadeServico` | `idUnidade`, `idServico` |

## 🚀 Como executar

O projeto está em desenvolvimento e as instruções definitivas de instalação serão adicionadas quando a estrutura do aplicativo e suas dependências estiverem configuradas.

Quando o projeto estiver pronto para execução, esta seção deverá incluir, conforme a configuração adotada pelo grupo:

1. Pré-requisitos de ambiente.
2. Instruções para instalar as dependências.
3. Configuração de variáveis e endereço da API, se necessário.
4. Comandos para iniciar a aplicação.
5. Instruções para executar em emulador Android ou dispositivo físico.

## 🧪 Validação e testes

Entre os critérios de validação previstos estão:

- Navegação entre as telas planejadas.
- Solicitação e tratamento da permissão de localização.
- Exibição das unidades retornadas pela fonte de dados.
- Funcionamento da pesquisa e dos filtros.
- Abertura dos detalhes de uma unidade selecionada.
- Exibição das informações sobre soros antiofídicos quando fornecidas pela fonte.
- Tratamento compreensível de falhas de conexão e ausência de dados.

Os testes serão realizados durante o desenvolvimento das funcionalidades.

## 👥 Equipe

Projeto desenvolvido em grupo pelos seguintes integrantes:

- Felipe Sugizaki
- Guilherme Luiz Franco
- Leandro Schiavo
- Lucas Bueno
- Lucas Passos

## 🎓 Informações acadêmicas

- **Instituição:** UniMetrocamp (Wyden)
- **Disciplina:** Programação para Dispositivos Móveis em Android
- **Professor:** Prof. Mauro Rodrigues Alves Nogueira
- **Plataforma-alvo:** Android
- **Tipo de projeto:** Projeto de extensão acadêmica

## 🗺️ Próximas etapas

- Identificar e validar a demanda com a parte interessada.
- Definir a fonte de dados/API e a estratégia de banco de dados.
- Elaborar os diagramas de casos de uso e de classes.
- Definir o protótipo e o fluxo final das telas.
- Configurar a estrutura do projeto React Native.
- Implementar a navegação e as telas.
- Integrar a API e o serviço de geolocalização.
- Implementar pesquisa, filtros e detalhes das unidades.
- Adicionar o conteúdo informativo de primeiros socorros.
- Realizar testes e preparar a implantação, quando aplicável.

## ⚠️ Aviso importante

O SoroVidas é uma ferramenta informativa em desenvolvimento. A existência de uma unidade, seus horários, serviços e a disponibilidade de soros antiofídicos dependem da fonte de dados e de sua atualização e validação. Essas informações não devem ser consideradas garantia de estoque ou de atendimento.

**O aplicativo não substitui orientação de profissionais de saúde nem serviços de emergência.** Em uma emergência, procure atendimento profissional imediatamente.
