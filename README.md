![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.1.2-000000?logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![Databricks](https://img.shields.io/badge/Databricks-FF3621?logo=databricks&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/status-production-green)

# INSS Chatbot

O **INSS Chatbot** é um assistente virtual inteligente desenvolvido para democratizar o acesso às informações sobre aposentadoria do INSS. Utilizando técnicas de Inteligência Artificial, especificamente RAG (Retrieval-Augmented Generation), o chatbot fornece respostas sobre direitos previdenciários, baseando-se em informações oficiais extraídas diretamente do site do Governo Federal.

# Interface Web
Este repositório contém as configurações e códigos para criar a interface web do chatbot sobre aposentadoria do INSS, permitindo que usuários façam perguntas sobre aposentadoria e recebam respostas contextualizadas informações oficiais extraídas diretamente do site do Governo Federal.


## Estrutura do Repositório

```
.
├── .github/workflows/
│   ├── main_aposentabot.yml    # Deploy automático via GitHub Actions
│
├── backend/
│   ├── chat_connector.py       # Conexão com endpoint Databricks
│   └── .env.dev                 # Template de variáveis para desenvolvimento
│
├── static/
│   ├── css/
│   │   └── style.css           # Estilos customizados do chat
│   └── js/
│       └── chat.js             # Lógica JavaScript do chat
│
├── templates/
│   └── index.html              # Template principal do chat
│
├── app.py                      # Aplicação Flask principal
├── app.yaml                    # Configuração de deploy
├── requirements.txt            # Dependências Python
├── LICENSE                     # Licença do projeto
└── README.md                   # Este arquivo de documentação do projeto
```

## Instalação e Configuração

### Pré-requisitos

- Python 3.8+
- pip (gerenciador de pacotes Python)
- Conta no Databricks com endpoint configurado (Códigos e documentação desse processo pode ser encontrado em [https://github.com/simette/tcc-chatbot-engine/](https://github.com/simette/tcc-chatbot-engine/))
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/simette/tcc-web-app.git
cd tcc-web-app
```

### 2. Crie um ambiente virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` no diretório `backend/` baseado no template `.env.dev`:

```bash
cp backend/.env.dev backend/.env
```

🚨 **Nunca commite suas credenciais reais** 🚨

Edite o arquivo `backend/.env` com suas credenciais:

```env
# Databricks Configuration
SERVING_ENDPOINT=seu-endpoint-aqui
DATABRICKS_HOST=https://seu-workspace.databricks.com
DATABRICKS_TOKEN=seu-token-aqui
```

### 5. Execute a aplicação

```bash
python app.py
```

A aplicação estará disponível em `http://localhost:5000`


