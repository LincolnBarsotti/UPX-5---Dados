const ExcelJS = require('exceljs');
const fs = require('fs');

// Função para ler o arquivo XLSX e converter para JSON
async function readXLSX(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    const worksheet = workbook.getWorksheet(1);  // Seleciona a primeira planilha
    let jsonData = [];

    // Captura os títulos da primeira linha
    const titles = [];
    worksheet.getRow(1).eachCell((cell) => {
        titles.push(cell.value);
    });

    // Começa a partir da segunda linha, já que a primeira contém os títulos
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {  // Ignora a primeira linha com os títulos
            let rowData = {};
            row.eachCell((cell, colNumber) => {
                rowData[titles[colNumber - 1]] = cell.value; // Usa o título correspondente
            });
            jsonData.push(rowData);
        }
    });

    return jsonData;
}

// Caminho do arquivo XLSX convertido
const filePath = './incidentes.xlsx';  // Substitua pelo caminho do arquivo XLSX

// Captura os dados do XLSX, converte para JSON e salva em um arquivo
readXLSX(filePath)
    .then((data) => {
        // Converte o JSON para string formatada
        const jsonContent = JSON.stringify(data, null, 2);
        
        // Salva o JSON em um arquivo
        fs.writeFile('dados.json', jsonContent, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo JSON:', err);
            } else {
                console.log('Arquivo JSON foi salvo com sucesso!');
            }
        });
    })
    .catch((error) => {
        console.error('Erro ao ler o XLSX:', error);
    });
