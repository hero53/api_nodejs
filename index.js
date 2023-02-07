const express = require('express');
const cors = require('cors');
const app = express();
const port =3001;
const mysql = require('mysql');
// const mysql = require('mysql2');
const bodyParser = require('body-parser')
app.use(express.json())
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'echauffement',
  port:3306
});
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connection.connect((error) => {
  if (error) console.error(error);
  else console.log('Connexion à la base de données réussie.');
});


// Création d'une nouvelle publication
// app.post('/', (req, res) => {
//   let query="INSERT INTO t_publication SET ?";
//   console.log(req.body);
//   let donnee={
//     pupublication:req.body.pupublication,
//     idarticle:req.body.idarticle,
//     datepublication:req.body.datepublication,
    

//   };
//     // const newProduct = {content: req.body.content};
//     connection.query(query,donnee,(error, results) => {
//       if (error)res.json({msg:error});
//       else {
//         res.json({msg:"Publication bien Executée"});
//       }
//     });
//   });
// lecture de toutes les publications
  
  app.get('/', (req, res) => {
    // res.json("results");
    let query="SELECT * FROM proprietaires";
    console.log(req.body);
    
      // const newProduct = {content: req.body.content};
      connection.query(query,(error, results) => {
        if (error)res.json({msg:error});
        else {
          res.json(results);
        }
      });
    });
  // Modification d'une publication

  app.post('/update/:id', (req,res) => {
    const id = req.params.id;
    const { nom, prenom } = req.body;
    // res.json({msg:"Publication bien été modifié !!! "+req.body.nom});
    // let query=`UPDATE proprietaires SET nom=${req.body.nom},prenom=${req.body.prenom} WHERE id=${req.params.id}`;
    let sql=`UPDATE proprietaires SET nom=?,prenom=? WHERE id=?`;
    console.log(req.body);
    
      // const newProduct = {content: req.body.content};
      connection.query(sql, [nom, prenom, id], function (error, results) {
        if (error) {
          return res.json(error);
        }     
        res.send(results);
        // connection.query(query,(error, results) => {
        //   if (error)res.json({msg:error});
        //   else {
        //     res.json({msg:"Publication bien été modifié"});
        //   }
      });
    });
  
app.listen(port, () => {
  console.log(`L'application écoute sur le port ${port}.`);
});
