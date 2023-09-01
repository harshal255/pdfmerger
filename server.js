const express = require('express');
const path = require('path');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { mergePdfs } = require('./merge');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    //to display index.html on this route
    res.sendFile(path.join(__dirname, "templates/index.html"));
})
app.use(express.static('public'));

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files) // display selected files on server console
    let d = await mergePdfs("1.pdf", "2.pdf")
    // await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    // res.redirect(`http://localhost:${port}/mergedFiles/${d}.pdf`)
    res.send({ data: req.files }); //to redirect files json data
    // req.files is array of `pdfs` files
    // req.body will contain the text fields, if there were any
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port} : http://localhost:${port}`)
})