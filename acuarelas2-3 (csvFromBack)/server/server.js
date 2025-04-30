const express = require('express'); 
const fs = require('fs'); 
const path = require('path'); 
const Papa = require('papaparse');

const app = express(); 
const port = 3000; 

app.use(express.static('public')); 

app.get('/api/inventory', (req, res) => { 
    const csvFilePath = path.join(__dirname, 'inventory.csv'); 
    fs.readFile(csvFilePath, 'utf8', (err, data) => { 
        if (err) {
            return res.status(500).send('Error leyendo csv'); 
        }
        const results = Papa.parse(data, { header: true }); 
        const processedData = results.data.map(item => { 
            const keys = Object.keys(item);
            const fourthColumnKey = keys[3]; 
            const fourthColumnValue = parseFloat(item[fourthColumnKey]); 
            if (!isNaN(fourthColumnValue)) { 
                item["Precio Venta (20%)"] = (fourthColumnValue * 1.20).toFixed(2);
            } else {
                item["Precio Venta (20%)"] = "N/A";
            }
            return item;
        });
        res.json(processedData); 
    })
});

app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`); 
});