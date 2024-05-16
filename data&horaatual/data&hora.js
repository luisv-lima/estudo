const fs = require('fs');

function escreverDataHora(filename, callback) {
    const dataHoraAtual1 = new Date().toLocaleString();
    fs.writeFile(filename, dataHoraAtual1, (err) =>{
        if (err) {
            callback(err);
            return;
        }
        callback(null, `Arquivo '${filename}' criado com sucesso.`)
    });
    }

    function lerArquivo(filename, callback) {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, data);
        });
    }

    const filename = 'data_hora.txt';

    escreverDataHora(filename, (err, result) => {
        if (err) {
            console.error('Erro ao escrever no arquivo:', err);
            return;
        }
        console.log(result);

        lerArquivo(filename, (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return;
            }
            console.log('Conteúdo do arquivo:', data)
        });
    });
