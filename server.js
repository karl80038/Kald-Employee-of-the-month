const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const empRouter = require('./routes/employeeRouter');
const fs = require('fs');
const app = express();

app.set('view engine', ejs);
if (!fs.existsSync(path.join(__dirname, 'data'))){
    console.log("The directory named 'data' is not present, creating a new one...");
    fs.mkdirSync(path.join(__dirname, 'data'));
    console.log("Done.")
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.use(empRouter);

app.use((req, res)=>{
    res.render('404.ejs', {pageTitle: "Page Not Found", path: ''});
    
    //res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'));
});

// app.listen(3000, ()=>{
//     console.log('Server is running on Port 5000');
// });
app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started");
})