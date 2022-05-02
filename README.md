# Desafio Full-Stack

O desafio consiste em criar o *front* e o *back-end* que gerencie os espetáculos e as reservas das poltronas de um teatro.

## Instruções

O candidato pode escolher as tecnologias **node.js** ou **python** para o *back-end*, já para o *front-end* pode escolher o seu **framework preferido**.

O projeto deve ser construido utilizando **sqlite3** como banco de dados.

As aplicações devem rodar dentro de **dois conteiners** (um para o *front* e outro para o *back*). Deverá ser montado um **docker-compose** com o ambiente necessário para executar as aplicações.

1. Efetue o **fork** deste repositório e crie um branch com o seu nome. (ex: ronaldo-rodrigues).
2. Após finalizar o desafio, crie um **Pull Request** com o seu nome. (ex: ronaldo-rodrigues).
3. Aguarde algum contribuidor realizar o code review.

## Recursos

Confirma abaixo os recursos que devem ser implementados na aplicação:

### Login

* O login deve ser realizado por email;
* A senha deve ser armazena no banco utilizando **Argon2**;

### Espetáculos

* Cadastrar espetáculo;
* Editar espetáculo;
  
### Poltronas

* Reservar poltrona por espetáculo;
* Cancelar reserva de poltrona por espetáculo;
* Mostrar o total de lugares reservados por espetáculo;
* Mostrar o total de lugares disponíveis por espetáculo.
  
### Financeiro

* Exibir o valor total de arrecadação. (Sendo que cada poltrona reservada custe R$: 27,99)
* Calcular e exibir os impostos (14,33%)
  
## Como vamos avaliar

* Vamos subir a aplicação usando **docker-compose** e acessar via localhost;
  * No **comentário do PR** deve ser informado o **login e a senha** para entrar na aplicação.
* Vamos cadastrar/editar/deletar/atualizar os espetáculo;
* Vamos reservar e cancelar as reservas das poltronas;
* Vamos verificar se o valor arrecadado + impostos estão precisos e corretos.
  
## Diferenciais

* Uma pequena implementação de teste automatizado da API ou do Front.
  