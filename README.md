# Passo a Passo para executar o projeto

1. Abrir o backend feito em .Net 8 no visual studio 2022 ou visual studio code.
2. Dentro do projeto ConsultaFilmes.Repository procurar o arquivo FilmeRepository.cs  7
3. No arquivo informar o Token de acesso da API pública na linha 22
![image](https://github.com/user-attachments/assets/14a93b3c-8c69-4502-820f-3e28f76a1210)

4. Para executar o projeto tanto o backend quanto frontend possuem o docker-compose configurado. É necessário ter o docker instalado na máquina.
5. O backend se executado pelo Visual Studio 2022 é possível executar o compose diretamente selecionando o projeto como o projeto de inicialização:

![image](https://github.com/user-attachments/assets/d85547b7-51aa-478f-bc21-ab839ddea9fa)

6. Caso uso do VSCODE, tanto para o frontend quanto para o backen, é necessário executar o seguinte código (necessário navegar com o CMD para cada pasta e executar)
- docker-compose build
- docker-compose up

## Executando testes Cypress via Docker
Este comando irá construir os containers necessários, iniciar seus serviços frontend e backend, e então executar os testes Cypress contra esses serviços.
Para executar os testes Cypress usando Docker, siga estes passos:
1. Certifique-se de que o Docker está instalado e em execução.
2. Na raiz do projeto, execute:
- npm run cy:docker


## Executando o projeto completo com Docker Compose
Isso construirá os containers necessários, iniciará todos os serviços definidos no docker-compose.yml e executará os testes Cypress.
Para executar todo o projeto (frontend, backend e testes) usando Docker Compose:
1. Na raiz do projeto, execute:
- docker-compose up --build
2. Para parar todos os serviços, use:
- docker-compose down

## Desenvolvimento local
Para desenvolvimento local sem Docker:
1. Inicie o backend (instruções específicas do seu projeto)
2. Inicie o frontend (instruções específicas do seu projeto)
3. Para abrir o Cypress Test Runner:
- npm run cy:open

4. Para executar os testes Cypress no terminal:
- npm run cy:run