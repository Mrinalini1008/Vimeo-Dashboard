const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

const Pool = mysql.createPool({
    connectionLimit : '20',
    host: '162.214.80.49',
    user: 'qjzcohmy_sip',
    password: 'Speedlabs@123',
    database: 'qjzcohmy_vimeoanalytics' 
});

app.get('/user_details', (req,res) => {
    Pool.getConnection((err,connection)=>{
        if(err){
            throw(err)
        }
        console.log('Connected as id ' + connection.threadId);
        connection.query('SELECT * from user_detail', (err,rows)=>{
            if(!err){
                res.send(rows);
            }
            else{
                console.log(err);
            }
        })
    })
});

app.get('/:email',(req,res) =>{
    Pool.getConnection((err,connection)=>{
        if(err){
            throw(err)
        }
        console.log('Connected as id ' + connection.threadId);
        connection.query('SELECT * from user_detail WHERE email = ?',[req.params.email], (err,rows)=>{
            if(!err){
                if(rows.length === 0){
                    res.send({'0' : 'No user found'})
                }
                else{
                    res.send(rows);
                }    
            }
            else{
                console.log(err);
            }
        })
    })
})

app.post('/log',(req,res) =>{
    res.set('Access-Control-Allow-Origin', '*');
    Pool.getConnection((err,connection)=>{
        if(err){
            throw(err)
        }
        console.log('Connected as id ' + connection.threadId);

        const pr = req.body;

        connection.query('INSERT INTO action_table (user_id, action) VALUES (?,?)', [pr.user_id, pr.action] , (err,result)=>{
            if(!err){
                res.send({'req added with id' : result.id}) 
            }
            else{
                console.log(err);
            }
        })
        console.log(req.body);
    })
})

app.listen(8080, () => console.log('Listening on port 8080..'));