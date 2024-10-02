const ExcelJS = require('exceljs');

// Função para ler o arquivo XLSX e converter para JSON
async function readXLSX(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    const worksheet = workbook.getWorksheet(1);  // Seleciona a primeira planilha
    let jsonData = [];

    worksheet.eachRow((row, rowNumber) => {
        let rowData = {};
        row.eachCell((cell, colNumber) => {
            rowData[`Coluna${colNumber}`] = cell.value;
        });
        jsonData.push(rowData);
    });

    return jsonData;
}

// Caminho do arquivo XLSX convertido
const filePath = './incidentes.xlsx';  // Substitua pelo caminho do arquivo XLSX

// Captura os dados do XLSX e imprime no console em formato JSON
readXLSX(filePath)
    .then((data) => {
        console.log(JSON.stringify(data, null, 2));  // Exibe os dados convertidos em JSON
    })
    .catch((error) => {
        console.error('Erro ao ler o XLSX:', error);
    });
