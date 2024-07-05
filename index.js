import express from "express";
import bodyparser from "body-parser";
import axios from "axios";
import path from "path";
import fs, { readFileSync } from "fs";
const app = express();
const port = 3000;
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var filearray = [];
var updatedata = [];
let index = 0;
var lines= 0;
app.get('/', (req, res) => {
    console.log('GET request received for /');
    res.sendFile(path.join(__dirname, 'home.html'));
}).post('/create', (req, res) => {
    const bodydata = req.body;
    const username = bodydata.username;
    const userid = bodydata.userid;
    const useremail = bodydata.useremail;
    const userage = bodydata.userage;
    const usermarks = bodydata.usermarks;
    const usercompany = bodydata.usercompany;
    const userwork = bodydata.userwork;
    const usercar = bodydata.usercar;
    const usergender = bodydata.usergender;

    let filedata = fs.readFileSync('./userdata.txt','utf-8');
    filearray =  filedata.split('\n');

for(let i=0;i<filearray.length;i++){

    if(useremail===filearray[i]){
        break;
   res.send('plz choose another emial this has been taken ');
    }
}


    fs.appendFileSync('./userdata.txt', `${username}(^${userid}(^${useremail}(^${userage}(^${usermarks}(^${usercompany}(^${usercar}(^${usergender}(^${userwork}\n`);


    return res.send('done on post');

})
app.get('/update',(req, res) => {
    res.sendFile(path.join(__dirname, 'update.html'));
})

const checkemail =(req,res,next)=>{
  const data = req.body.email;
  const filedata = fs.readFileSync('./userdata.txt','utf-8');
  filearray  = filedata.split('(^');
  console.log(filearray);

  const bigarray =  filedata.split('\n');
  console.log(bigarray);
  const length = bigarray.length-2;
  const smallarary =  bigarray[length];
  const fianlindex  = smallarary.split('(^');
  const col = fianlindex.length-1;
  console.log(filearray);

let ismatch = false;

  for(let i=0;i<filearray.length;i++){
    
    if(i+=col){
        lines++;
        console.log(lines);
    }
    if(data === filearray[i]){        
        console.log(filearray[i]);
        ismatch=true;
        break;
      }
  }
  if(ismatch===true){
    next();
  }
  else{
  return res.send('the data is not matching');
  }
}
app.post('/update',checkemail,(req,res)=>{
    res.sendFile(path.join(__dirname, 'updatecomplete.html'));
})
app.post('/updatecomplete',(req,res)=>{
    const data = req.body;


    if (!data.username || !data.userid || !data.useremail || !data.userage || !data.usermarks ||
        !data.usercompany || !data.usercar || !data.usergender || !data.userwork) {
        return res.status(400).send('Please fill all the required fields');
    }

    const updatedata = [data.username, data.userid, data.useremail, data.userage,
    data.usermarks, data.usercompany, data.usercar, data.usergender, data.userwork];

    const filedata = fs.readFileSync('./userdata.txt', 'utf-8');
    let filearray = filedata.split('\n');


    filearray[lines] = updatedata.join('(^');

    const updatedFileData = filearray.join('\n');


    fs.writeFileSync('./userdata.txt', updatedFileData, 'utf-8');


    console.log('Data is updated in your file');
    console.log(filearray);

    res.json(filearray);
})

app.get('/getall', (req, res) => {

    const fileContent = fs.readFileSync('./userdata.txt', 'utf-8');
    filearray = fileContent.split('\n');
    res.json(filearray);
})
app.get('/finduser', (req, res) => {
    res.sendFile(path.join(__dirname, 'finduser.html'));
    console.log('get is called for finduser');

})
app.post('/finduser', (req, res) => {
    const email = req.body.email;
    console.log('post is called for finduser');
    if (!email) {
        res.send('plz fill the required feilds');
    }
    let user = [];
    let useremail = '';
    const fileContent = fs.readFileSync('./userdata.txt', 'utf-8');
    filearray = fileContent.split('(^');
    for (let i = 0; i < filearray.length; i++) {
        if (email === filearray[i]) {
            console.log('this is data : ');
            console.log(filearray[i]);
            useremail = filearray[i] + ' founded ';
            return res.send(useremail);
            break;
        }
    }
    return res.send('not founded');



})

app.get('/delete', (req, res) => {
    res.sendFile(path.join(__dirname, 'delete.html'));
})
app.post('/delete', (req, res) => {
    const line = req.body.line;

    if (!line) {
        res.send('plz fill the required feilds');
    }
    const getdatafromfile = fs.readFileSync('./userdata.txt', 'utf-8');

    const index = Number(line);
    const linenumber = index - 1;
    filearray = getdatafromfile.split('\n');
    for (let i = 0; i < filearray.length; i++) {
        if (i === linenumber) {
            filearray.splice(i, 1);
            break;
        }
    }
    console.log(filearray);


    const updateddata = filearray.join('\n');

    fs.writeFileSync('./userdata.txt', updateddata, 'utf-8');

    return res.json(filearray);
})
app.get('/view', (req, res) => {

    const fileContent = fs.readFileSync('./userdata.txt', 'utf-8');

    let userarray = [];
    userarray = fileContent.split('\n');

    const arrlength = userarray.length - 2;


    const lastarr = userarray[arrlength];
    const finalarr = lastarr.split('(^');


    const obj = {
        name: finalarr[0],
        id: finalarr[1],
        email: finalarr[2],
        age: finalarr[3],
        marks: finalarr[4],
        company: finalarr[5],
        car: finalarr[6],
        gender: finalarr[7],
        work: finalarr[8],
    }

    res.json({ obj });


}).listen(port, () => {
    console.log('app is listening on port no:3000');
})

