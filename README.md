## Library App

### _Descrição_
Frontend do app library

### _Instalação_

Clonar e executar o seguinte projeto:
https://github.com/lype86/book_app

Execute os seguintes comandos:
```
$ git clone https://github.com/lype86/library.git
$ cd library
$ virtualenv venv -p /usr/bin/python3
$ source venv/bin/activate
$ pip install -r requirements.txt
```

### _Preparação_

Crie o arquivo library/settings.ini da seguinte forma:
```
[settings]
HOST=<host>
PORT=<porta>
DEBUG=<True ou False>
HOST_API=<endereço o qual está rodando a api>
```
 
### _Execução_
```
$ python app.py
```
