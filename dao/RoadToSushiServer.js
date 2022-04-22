"use strict";

// 'require' permette di di importare tutto ciò che viene referenziato da module.exports
// const sqlite = require('sqlite3').verbose();    // DB - verbose() di sqlite3 server ad acquisire le tracce dello stack durante l'accodamento delle query; utile per debug
const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');               // CRITTOGRAFIA PASSWORD
const { reject } = require('bcrypt/promises');

class RoadToSushiServer{
    /*
    constructor(){
        this.DBSOURCE = '../database.db';
        this.db = new sqlite.Database(this.DBSOURCE, (err) =>{ // sqlite o sqlite3? Ho scaricato la 3, scarico la 1? [QUALE USO? LUI LE HA ENTRAMBE IN package.json]
            if(err){
                // Non si riesce ad apire il DB
                console.err(err.message);
                throw err;
            }
            else{
                console.log('Il database RoadTuSushi è stato aperto correttamente!');
            }
        });    
    }
    */

    // Lista di tutti i membri del personale
    getListaPersonale(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT Nome, Cognome FROM Personale";
            this.db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    if(rows === undefined){ // === uguale tipo & valore; == uguaglianza dello stesso tipo
                        resolve({error: 'Non è stato trovato nessun membro del personale.'});
                    }
                    else{
                        let membriPersonale = rows.map((row) => {return new membriPersonale(row.Nome, row.Cognome)});
                        resolve(membriPersonale);
                        // console-log("DEBUG - Personale: ", membriPersonale);
                    }   
                }
            });
        });
    }

    // Lista dei membri del personale filtrati secondo una key [RICERCA]
    getListaPersonale_filter(key){
        return new Promise((resolve, reject) => {
            // Qui ho usato `${}` al posto che i parametri query [ ... ] 
            // Dopo ho utilizzato anche l'altra forma con "this.db.all(sql, [...], (err, rows) => {
            const trovato = key.split(' ');
            const sql = `SELECT Nome, Cognome FROM Personale WHERE (Nome LIKE "%${key}%" OR Cognome LIKE "%${key}%") OR (Nome LIKE "%${trovato[0]}%" AND Cognome LIKE "%${trovato[1]}%") OR (Nome LIKE "%${trovato[1]}%" AND Cognome LIKE "%${trovato[0]}%")`; // O il Nome o il Cognome (o entrambi) contengono la key di ricerca
            this.db.all(sql, [], (err, rows) =>{
                if (err)
                    reject(err);
                else {
                    if (rows === undefined)
                        resolve({error: 'Non è stato trovato nessun membro del personale.'});
                    else{
                        let membriPersonale = rows.map((row) => {return new membriPersonale(row.Nome, row.Cognome)});
                        resolve(membriPersonale);
                    }
                }
            });                        
        });
    }

    /* FUNZIONI PER LA REGISTRAZIONE/LOGIN DI UTENTI */

    // Creazione di un cliente nella tabella Utenti
    createClienteInUtenti(utente){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Utenti VALUES (?, ?, 0)';  // Tipo_utente = 0 [CLIENTE]
            bcrypt.hash(utente.Password, 10).then((hash) => {   // Hashing pwd con sale auto-gen
                this.db.run(sql, [utente.Email, hash], function(err) {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(this.lastID);                   // SPIEGAZIONE [???]
                    }
                });
            });
        });
    }

    // Creazione di un cliente nella tabella Clienti
    createCliente(cliente){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Clienti VALUES (?, ?, ?, ?)';
            this.db.run(sql, [cliente.Email, cliente.Nome, cliente.Cognome, cliente.Telefono], function(err) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(this.lastID);                       // SPIEGAZIONE [???]
                }
            });
        });
    }

     // Creazione di un membro del personale nella tabella Utenti
     createPersonaleInUtenti(utente){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Utenti VALUES (?, ?, 1)';  // Tipo_utente = 1 [PERSONALE]
            bcrypt.hash(utente.Password, 10).then((hash) => {   // Hashing pwd con sale auto-gen
                this.db.run(sql, [utente.Email, hash], function(err) {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(this.lastID);                   // SPIEGAZIONE [???]
                    }
                });
            });
        });
    }

    // Creazione di un membro del personale nella tabella Clienti
    createPersonale(personale){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Personale VALUES (?, ?, ?, ?)';
            this.db.run(sql, [personale.Email, personale.Nome, personale.Cognome, personale.Telefono], function(err) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(this.lastID);                       // SPIEGAZIONE [???]
                }
            });
        });
    }

    // TODO - DA RIVEDERE
    // Ottengo utente (cliente o personale) in base alla email
    getUtenteByEmail(email){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Utenti WHERE Email = ?';
            this.db.get(sql, [email], (err, row) => {
                if(err){
                    reject(err);
                }
                else if(row === undefined){
                    resolve({error: 'Utente non trovato'});     // SPIEGAZIONE [???]
                }
                else{
                    const utente = {email: row.Email};  // [QUI MANCA ';' da LUI!]         // const user = {cf: row.cf, user: row.user} => Io non ho l'username[COME FACCIO???]
                    resolve(utente);
                }
            });
        });
    }

    // TODO - DA RIVEDERE
    // Ottengo utente (cliente o personale) in base a email e pwd
    getUtente(em, password){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Utenti WHERE Email = ?';
            this.db.get(sql, [em], (err, row) => {
                if(err){
                    reject(err);
                }
                else if(row === undefined){
                    console.log("DEBUG - Utente non trovato.")
                    resolve({error: 'Utente non trovato'});                               // SPIEGAZIONE [???]
                }
                else{
                    const utente = {email: row.Email, tipo_utente: row.Tipo_utente};      // const user = {cf: row.cf, user: row.user} => Io non ho l'username[COME FACCIO???]
                    console.log('DEBUG - Email Utente: ', email);
                    let check = false;
                    console.log('DEBUG - Password Utente nella row del DB: ', row.Password);
                    if(bcrypt.compareSync(password, row.Password)){                       // Controlla se la password è quella hashata nel DB (true)
                        check = true;                                                                 
                    }
                    resolve({utente, check});
                }
            });
        });
    }

}

module.exports = RoadToSushiServer; // 

/*
const dipendente = require('./listadip_dipendente');
const servizio = require('./servizi_servizio');
const cliservizio = require('./myserCli_servizio');
const dipservizio = require('./myserDip_servizio');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

class BacchettaMagicaServer{

    constructor(){
        this.DBSOURCE = './db.db';
        this.db =  new sqlite.Database(this.DBSOURCE, (err) => {
            if (err) {
                //non si riesce ad aprire il db
                console.err(err.message);
                throw err;
            }
            else{
                console.log('Il Database BacchettaMagica è stato aperto con successo');
            }
        });
    }


    //OK
    //ottengo la lista di TUTTI i dipendenti 
    getListaDip(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT c,n FROM dipendenti"; 
            this.db.all(sql, [], (err, rows) =>{
                if (err)
                    reject(err);
                else {
                    if (rows === undefined)
                        resolve({error: 'Nessun dipendente trovato.'});
                    else{
                        let dipendenti = rows.map((row) => {return new dipendente(row.c,row.n)});
                        resolve(dipendenti);
                        //console.log("dip: ",dipendenti); 
                    }
                }
            });                        
        });
    }


    //OK
    //ottengo la lista dei dipendenti filtrati secondo una chiave
    getListaDip_filter(chiave){
        return new Promise((resolve, reject) => {
            //qui ho usato `${}` al posto che i parametri query [ ... ] 
            //più avanti ho utilizzato anche l'altra forma con "this.db.all(sql, [...], (err, rows) =>{
            const x = chiave.split(' ');
            const sql = `SELECT c,n FROM dipendenti WHERE (n LIKE "%${chiave}%" OR c LIKE "%${chiave}%") OR (n LIKE "%${x[0]}%" AND c LIKE "%${x[1]}%") OR (n LIKE "%${x[1]}%" AND c LIKE "%${x[0]}%")`; //o il nome o il cognome (o entrambi) contengono la chiave di ricerca
            this.db.all(sql, [], (err, rows) =>{
                if (err)
                    reject(err);
                else {
                    if (rows === undefined)
                        resolve({error: 'Nessun dipendente trovato.'});
                    else{
                        let dipendenti = rows.map((row) => {return new dipendente(row.c,row.n)});
                        resolve(dipendenti);
                    }
                }
            });                        
        });
    }





    //ottengo la lista di TUTTI i servizi pronti ad essere accettati dai dipendenti, quindi CFdip is null
    getListaSer(){
        return new Promise((resolve, reject) => {
            
                const sql = "SELECT * FROM servizi WHERE CFdip is NULL";
                this.db.all(sql, [], (err, rows) =>{
                    //console.log(rows);
                    if (err)
                        reject(err);
                    else {
                        if (rows === undefined)
                            resolve({error: 'Nessun servizio trovato.'});
                        else{
                            (async () =>{ 
                                let servizi = [];
                                for(let row of rows){
                                    //console.log(row);
                                    let x = await this.createSerDip(row);
                                    //console.log(x);
                                    servizi.push(x);
                                }
                               // console.log(servizi);
                                resolve(servizi);
                            })();
                        } 
                    }
                });                     
        });
    }


    getListaSerPend(){
        return new Promise((resolve, reject) => {
            
                const sql = "SELECT * FROM servizi WHERE CFcli=? CFdip is NULL";
                let CFcli = row.CFcli;
                this.db.all(sql, [CFcli], (err, rows) =>{
                    //console.log(rows);
                    if (err)
                        reject(err);
                    else {
                        if (rows === undefined)
                            resolve({error: 'Nessun servizio trovato.'});
                        else{
                            (async () =>{ 
                                let servizi = [];
                                for(let row of rows){
                                    //console.log(row);
                                    let x = await this.createSerCliPend(row);
                                    //console.log(x);
                                    servizi.push(x);
                                }
                                //console.log(servizi);
                                resolve(servizi);
                            })();
                        } 
                    }
                });                     
        });
    }
  
    async createSerCliPend(row) {
        const nCli = await this.getCliName(row);
        const cCli = await this.getCliSName(row);
        //E qui costruisco la servizio
        const CFcli = row.CFcli;
        const id = row.id;
        //console.log(id);
        const data = row.data;
        const sede = row.sede;
        const ora = row.ora;
        const tipo = row.tipo;
        const stato = row.stato;
        const ser =  new pend(id,nCli,cCli,CFcli,data,sede,ora,tipo);
        //console.log(ser);
        return ser;
    }

    //OK
    getDipName(row){
        return new Promise((resolve, reject) => {
            const sql = "SELECT n FROM dipendenti WHERE CF=?";
            let CFdip = row.CFdip;
            this.db.get(sql,[CFdip],(err, riga) =>{
                if (err)
                    reject(err);
                if(!riga) resolve("Dipendente non trovato");
                resolve(riga.n); 
            });
        });
    }
   
    //da -1 a 0 quindi da richiesta pendente ad averlo associato a un dipendente
    updateSer(id, cli){
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE servizi SET stato=0, CFdip = ? WHERE id = ?';
            //console.log(id,cli); // --> per mio debugging
            this.db.run(sql,  [cli, id], 
            function (err) {
                if(err){
                    reject(err);
                } else { 
                    if (this.changes === 0)
                        resolve({error: 'Servizio richiesto non trovato.'});
                    else {
                        resolve();
                    }
                }
            })
        });
    }

    //da 0 a 1 vuol dire che il servizio è stato effettuato
    updateSer1(id, cli){
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE servizi SET stato=1, CFdip = ? WHERE id = ?';
            //console.log(id,cli); // --> per mio debugging
            this.db.run(sql,  [cli, id], 
            function (err) {
                if(err){
                    reject(err);
                } else { 
                    if (this.changes === 0)
                        resolve({error: 'Servizio richiesto non trovato.'});
                    else {
                        resolve();
                    }
                }
            })
        });
    }

    //ottengo la lista di TUTTI i servizi DI UN DETERMINATO CLIENTE
    getCliSer(CFcli){
        return new Promise((resolve, reject) => {
                const sql = "SELECT * FROM servizi WHERE CFcli = ? AND CFdip is not null";
                this.db.all(sql, [CFcli], (err, rows) =>{
                //console.log("getcliser", err, rows);
                    if (err)
                        reject(err);
                    else {
                        if (rows === undefined)
                            resolve({error: 'Nessun servizio trovato per questo utente.'});
                        else{
                            (async () =>{ 
                                let servizi = [];
                                for(let row of rows){
                                    //console.log("Cliente",row);
                                    let x = await this.createSerCli(row);
                                   // console.log("Cliente creato: ", x);
                                    servizi.push(x);
                                }
                                //console.log(servizi);
                                resolve(servizi);
                            })();
                        }
                    }
                });                     
        });
    }

    

    async createSerCli(row) {
        const nDip = await this.getDipName(row);
        //console.log("nome", nDip);
        const cDip = await this.getDipSName(row);
        //console.log("Nome e cognome del dip",nDip,cDip);
        //E qui costruisco la servizio
        const id = row.id;
        //console.log(id);
        const data = row.data;
        const sede = row.sede;
        const ora = row.ora;
       // const tipo = row.tipo;
        const stato = row.stato;
        const tipo = row.tipo;
        //id,dottore,spec,data,sede,ora,stato
        const ser =  new cliservizio(id,nDip,cDip,data,sede,ora,tipo,stato);
        //console.log(ser);
        return ser;
    }


    //disdetta di una servizio (tramite il suo id)
    disdiciSer(id){
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM servizi WHERE id=?';
            this.db.run(sql,  [id], 
            function (err) {
                if(err){
                    reject(err);
                } else { 
                    if (this.changes === 0)
                        resolve({error: 'Servizio (da disdire) richiesto non trovato.'});
                    else {
                        resolve();
                    }
                }
            })
        });
    }



    //ottengo la lista di TUTTI i servizi DI UN DETERMINATO DIPENDENTE
    getDipSer(cfDip){
        return new Promise((resolve, reject) => {
                const sql = "SELECT * FROM servizi WHERE cfDip = ?";
                this.db.all(sql, [cfDip], (err, rows) =>{
                    if (err)
                        reject(err);
                    else {
                        if (rows === undefined)
                            resolve({error: 'Nessun servizio trovato per questo dipendente.'});
                        else{
                            (async () =>{ 
                                let servizi = [];
                                for(let row of rows){
                                    console.log(row);
                                    let x = await this.createSerDip(row);
                                    servizi.push(x);
                                }
                            //console.log(servizi);
                                resolve(servizi);
                            })();
                        }
                    }
                });                     
        });
    }


    
    async createSerDip(row) {
        const nCli = await this.getCliName(row);
        const cCli = await this.getCliSName(row);
        //E qui costruisco la servizio
        const cfCli = row.CFcli;
        const id = row.id;
        //console.log(id);
        const data = row.data;
        const sede = row.sede;
        const ora = row.ora;
        const tipo = row.tipo;
        const stato = row.stato;
        const ser =  new dipservizio(id,nCli,cCli,cfCli,data,sede,ora,tipo,stato);
        //console.log(ser);
        return ser;
    }







    //OK

    getCliName(row){
        return new Promise((resolve, reject) => {
            const sql = "SELECT n FROM clienti WHERE CF=?";
            let CFcli = row.CFcli;
            this.db.get(sql,[CFcli],(err, riga) =>{
                if (err)
                    reject(err);
                resolve(riga.n);
            });
        });
    }

    //OK
    getCliSName(row){
        return new Promise((resolve, reject) => {
            const sql = "SELECT c FROM clienti WHERE CF=?";
            let CFcli = row.CFcli;
            this.db.get(sql,[CFcli],(err, riga) =>{
                if (err)
                    reject(err);
                resolve(riga.c);
            });
        });
    }

    //OK
    getDipSName(row){
        return new Promise((resolve, reject) => {
            const sql = "SELECT c FROM dipendenti WHERE CF=?";
            let CFdip = row.CFdip;
            this.db.get(sql,[CFdip],(err, riga) =>{
                if (err)
                    reject(err);
                resolve(riga.c);
            });
        });
    }

    //richiesta effettuata dai clienti
    insertServizio(servizio) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO servizi (CFcli,data,sede,ora,tipo,stato) VALUES (?, ?, ?, ?, ?, -1)';
            this.db.run(sql, [servizio.cf, servizio.dv, servizio.ind, servizio.ora, servizio.tipo], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve(this.lastID);
              }
            });
        });
    }

 

    // QUI PARTONO LE FUNZIONI PER REGISTRAZIONE/LOGIN DI UTENTI
    //OK
    createCli(user) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO utenti VALUES (?, ?, ?, ?, 0)';
          bcrypt.hash(user.password, 10).then((hash => { //hash della password
            this.db.run(sql, [user.cf, user.user, hash, user.email], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve(this.lastID);
              }
            });
          }));
        });
    }
    //OK
    createCliMore(user) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO clienti VALUES (?, ?, ?, ?, ?, ?)';
            this.db.run(sql, [user.cf, user.cognome, user.nome, user.dn, user.tel, user.ind], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve(this.lastID);
              }
            });
        });
    }

    //OK
    createDip(user) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO utenti VALUES (?, ?, ?, ?, 1)';
          bcrypt.hash(user.password, 10).then((hash => { //hash della password
            this.db.run(sql, [user.cf, user.user, hash, user.email], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve(this.lastID);
              }
            });
          }));
        });
    }
    //OK
    createDipMore(user) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO dipendenti VALUES (?, ?, ?, ?, ?, ?)';
            this.db.run(sql, [user.cf, user.cognome, user.nome, user.dn, user.tel, user.ind], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve(this.lastID);
              }
            });
        });
    }


    //OK
    getUserById(cf) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM utenti WHERE CF = ?';
            this.db.get(sql, [cf], (err, row) => {
                if (err) 
                    reject(err);
                else if (row === undefined){
                    resolve({error: 'Utente non trovato.'});
                }else {
                    const user = {cf: row.cf, user: row.user}
                    resolve(user);
                }
            });
        });
    };
    //OK
    getUser(username, password) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM utenti WHERE user = ?';
            this.db.get(sql, [username], (err, row) => {
                if (err) 
                    reject(err);
                else if (row === undefined) {
                    console.log("primo errore");
                    resolve({error: 'Utente non trovato.'});
                 } else {
                  const user = {cf: row.CF, user: row.user, tipouser: row.tipouser};
                  console.log("utente qui: ",user)
                  let check = false;
                  console.log("row pass: ",row.pass)
                  if(bcrypt.compareSync(password, row.pass))
                    check = true;
                  resolve({user, check});
                }
            });
        });
    };
    


}

module.exports = BacchettaMagicaServer;
*/