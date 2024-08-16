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
Este comando irá executar os testes Cypress contra esses serviços frontend e backend.
7. Na raiz do projeto, execute um destes dois comandos:
- npx cypress run
- npm run cy:run