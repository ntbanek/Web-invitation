const express = require("express");
const bodyParser = require('body-parser');
const mysql_connection = require('./mysql_connection.js');
const multer = require('multer')
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get("/addRows", (req, res) => {
    mysql_connection.con.query('INSERT INTO general_informations (name1, name2, date, bgd_color, bgd_image, photo, description) VALUES (\"\", \"\", \"\", \"\", \"\", \"\", \"\"); ');
    mysql_connection.con.query('INSERT INTO wedding_informations (place, address, time, wedding_photo, wedding_description) VALUES (\"\", \"\", \"\", \"\", \"\"); ');
    mysql_connection.con.query('INSERT INTO reception_informations (reception_place, reception_address, reception_photo, reception_description) VALUES (\"\", \"\", \"\", \"\"); '); 
});
  
app.post('/sendForm', jsonParser, function (req, res) {

    mysql_connection.con.query('UPDATE general_informations SET name1 = \"' + req.body.name1 + '\", name2 = \"' + req.body.name2 + '\", date = \"' + req.body.date + '\", bgd_color = \"' + req.body.bgd_color + '\", description = \"' + req.body.description + '\" WHERE client_id = \"' + req.body.userId + '\"; ');
    res.json({ message: "Dane dodane!" });
})

app.post('/sendFormWedding', jsonParser, function (req, res) {

    mysql_connection.con.query('UPDATE wedding_informations SET place = \"' + req.body.place + '\", address = \"' + req.body.address + '\", time = \"' + req.body.time + '\", wedding_description = \"' + req.body.wedding_description + '\" WHERE client_id = \"' + req.body.userId + '\"; ');

    res.json({ message: "Dane dodane!" });
})

app.post('/sendFormReception', jsonParser, function (req, res) {

    mysql_connection.con.query('UPDATE reception_informations SET reception_place = \"' + req.body.reception_place + '\", reception_address = \"' + req.body.reception_address + '\", reception_description = \"' + req.body.reception_description + '\" WHERE client_id = \"' + req.body.userId + '\"; ');
      
    res.json({ message: "Dane dodane!" });
})

app.post('/login', jsonParser, function (req, res) {
    console.log(req.body);
    mysql_connection.con.query('SELECT client_id FROM login_data WHERE ( username = \"' + req.body.username + '\" AND password = \"' + req.body.password + '\"); ', function (err, results) {
        if(results[0])
        {
            res.json({ message: "OK", client_id: results[0].client_id, token: "test" });
        }
        else
        {
            res.json({ message: "Zły login lub hasło!" });
        }
    });
})

app.post('/register', jsonParser, function (req, res) {
    console.log(req.body);
    if(req.body.password == req.body.password_repeated && req.body.username != "" && req.body.password != "")
    {
        mysql_connection.con.query('SELECT client_id FROM login_data WHERE ( username = \"' + req.body.username + '\"); ', function (err, results) {
            if(results[0])
            {
                res.json({ message: "Login" });
            }
            else
            {
                mysql_connection.con.query('INSERT INTO login_data (username, password) VALUES (\"' + req.body.username + '\", \"' + req.body.password + '\"); ');
                res.json({ message: "OK" });
            }
        });
    }
    else
    {
        res.json({ message: "Rejestracja nie przebiegła poprawnie!" });
    }
})

app.get('/show/:id', function(req , res){
    console.log(req.params.id);
    mysql_connection.con.query('SELECT name1, name2, date, bgd_color, bgd_image, photo, description FROM general_informations WHERE client_id = \"' + req.params.id + '\"', function (err, results) {
        if (err) throw err;
        console.log(results);
        if (results[0])
        {
            res.json({ message: results[0] });
        }
        else
        {
            res.json({ message: "Strona nie istnieje!" });
        }
    });
  });

  app.get('/showWedding/:id', function(req , res){
    //console.log(req.params.id);
    mysql_connection.con.query('SELECT place, address, time, wedding_photo, wedding_description FROM wedding_informations WHERE client_id = \"' + req.params.id + '\"', function (err, results) {
        if (err) throw err;
        console.log('result from' + results);
        if (results[0])
        {
            res.json({ message: results[0] });
        }
        else
        {
            res.json({ message: "Strona nie istnieje!" });
        }
    });
  });

  app.get('/showReception/:id', function(req , res){
    console.log(req.params.id);
    mysql_connection.con.query('SELECT reception_place, reception_address, reception_photo, reception_description FROM reception_informations WHERE client_id = \"' + req.params.id + '\"', function (err, results) {
        if (err) console.log(err);
        console.log(results);
        if (results[0])
        {
            res.json({ message: results[0] });
        }
        else
        {
            res.json({ message: "Strona nie istnieje!" });
        }
    });
  });


  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'server/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload/:id/:name',function(req, res) {
 
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               console.log("multer ettot")
           } else if (err) {
              console.log("other: " + err)
           }

           if(req.params.name == 'photo')
           {
           mysql_connection.con.query('UPDATE general_informations SET photo = \"' + req.file.filename  + '\" WHERE client_id = \"' + req.params.id + '\"; ');
           }
           else if(req.params.name == 'bgd_image')
           {
            mysql_connection.con.query('UPDATE general_informations SET bgd_image = \"' + req.file.filename  + '\" WHERE client_id = \"' + req.params.id + '\"; ');
           }
           else if(req.params.name == 'wedding_photo')
           {
           mysql_connection.con.query('UPDATE wedding_informations SET wedding_photo = \"' + req.file.filename  + '\" WHERE client_id = \"' + req.params.id + '\"; ');
           }
           else if(req.params.name == 'reception_photo')
           {
            mysql_connection.con.query('UPDATE reception_informations SET reception_photo = \"' + req.file.filename  + '\" WHERE client_id = \"' + req.params.id + '\"; ');
           }
           return;
    })
}
);

app.get("/image/:filename", (req, res) => {
    res.sendFile(__dirname + '/images/' + req.params.filename);
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
 

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });