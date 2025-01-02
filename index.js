const express = require('express');
const multer = require('multer');
const fs = require('fs');
const c320 = require('./func/convert.js');
const port = 3000;

var app = express();

app.post('/upload', (req, res) => {
    var storage = multer.diskStorage({ 
        destination: (req, file, callback) => {
            callback(null, `${__dirname}/public`);
        },
        filename: (req, file, callback) => {
    
            callback(null, file.originalname);
        }
     });

     var upload = multer({storage: storage}).single('file');

    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).send(err);
        } else if (err) {
            return res.status(500).send(err);
        }


        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
          }

          async function start() {
            c320(req.file.originalname, res);

            await sleep(8000);
            var nome_320 = req.file.originalname.replace('128', '320');

            return  res.sendFile(`public/${nome_320}`, { root: __dirname });
             
          }

        // console.log(req.file.originalname);

        //return  res.sendFile(`public/${nome}`, { root: __dirname });

        start();

        sleep(20000);
        var nome_320 = req.file.originalname.replace('128', '320');

          async function delet() {
            await sleep(20000);
            fs.unlink('public/' + nome_320, (err) => {
                if (err) throw err;
                console.log('nome was deleted');
              });

              fs.unlink('public/' + req.file.originalname, (err) => {
                if (err) throw err;
                console.log('nome was deleted');
              });
          }

        delet();
    });
});

app.listen(port, () => console.log('rodando na porta: ' + port));