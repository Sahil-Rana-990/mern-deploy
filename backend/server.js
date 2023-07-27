const express=require('express');
const cors=require('cors');
const multer=require('multer');
const app=express();
const fs=require('fs');

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:"http://localhost:3000/"
}))
app.use('/uploads',express.static('uploads'))

// multer
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
})
const upload=multer({storage})

app.post("/api/image",upload.single("image"),(req,res)=>{
    console.log(req.file)
    res.send({FileName:req.file.filename})
})
app.get('/uploads/:imgName',(req,res)=>{
    const imageName=req.params.imgName;
    const readStream=fs.createReadStream(`uploads/${imageName}`);
    readStream.pipe(res)
})

app.listen(4000,()=>{
    console.log("PORT :- 4000")
})