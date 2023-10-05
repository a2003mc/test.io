
import express from 'express'
import multer from 'multer';

import path from 'path';
import { fileURLToPath } from 'url';
import { addImage, deleteComment, deleteImage, getComments, getImages } from './js/api.mjs';
import { addComment } from './js/api.mjs';
import { ImageModel, imageDb } from './db/createImage.mjs';
import { commentDb } from './db/createComment.mjs';

import { createServer } from "http";
import { rmSync } from "fs";


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (path.join(__dirname, '/static/uploads')), // 上传文件存储目录
    filename: (req, file, callback) => {
      const extname = path.extname(file.originalname);
      callback(null, Date.now() + extname); // 生成唯一文件名
    },
});
  

const upload = multer({ storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, '/static')));

app.post('/addImage', upload.single('image'), (req, res) => {
    const { filename,path } = req.file;
    // const imageUrl = `./uploads/${filename}`;
    const imageUrl = `http://localhost:${port}/uploads/${filename}`;
    const { author, title } = req.body;
    addImage(title, author, imageUrl, (err, newImage) => {
      if (err) {
        res.status(500).json({ error: 'Failed to add image' });
      } else {
        res.redirect('/');
      }
    });
});


app.post('/addComment', (req, res) => {
    console.log('addcomment rout');
    const { imageId, author, content } = req.body;
    addComment(imageId, author, content, (err, newComment) => {
      if (err) {
        res.status(500).json({ error: 'Failed to add comment' });
      } else {
        res.status(200).json({ message: 'Comment added successfully', comment: newComment });
      }
    });
});



app.delete('/deleteImage/:imageId', (req, res) => {
    const imageId = req.params.imageId;
  
    imageDb.remove({ _id: imageId }, {}, function (err, numRemoved) {
        if(err){
            res.status(500).json({ error: 'Failed to delte image' });
        }else{
            res.status(200).json({ message: 'deleted image successfully'});
        }
    });
    }
)


app.delete('/deleteComment/:commentId',(req, res) => {
    const commentId = req.params.commentId;
  
    commentDb.remove({ _id: commentId }, {}, function (err, numRemoved) {
        if(err){
            res.status(500).json({ error: 'Failed to delte comment' });
        }else{
            res.status(200).json({ message: 'deleted comment successfully'});
        }
    });
    }
)
app.get('/getImages', getImages);
app.get('/getComments', getComments);


app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
