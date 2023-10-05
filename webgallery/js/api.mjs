import { ImageModel } from "../db/createImage.mjs";
import { CommentModel } from "../db/createComment.mjs";
import multer from "multer";
/*  ******* Data types *******
    image objects must have at least the following attributes:
        - (String) _id 
        - (String) title
        - (String) author
        - (Date) date

    comment objects must have the following attributes
        - (String) _id
        - (String) imageId
        - (String) author
        - (String) content
        - (Date) date

****************************** */


export function addImage(title, author, file, callback) {
    const image = {
        _id: generateUniqueId(),
        title,
        author,
        date: new Date(),
        file, // 图像文件的路径或其他信息
    };

    ImageModel.create(image, (err, newImage) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, newImage);
        }
    });
}



export function getImages(req,res){
    ImageModel.findAll((err, images) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch images' });
        } else {
          return res.json({ images });
        }
    });
}

export function getComments(req,res){
    CommentModel.findAll((err, comments) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch comments' });
        } else {
          return res.json({ comments });
        }
    });
}




export function addComment(imageId, author, content, callback) {
    const comment = {
        _id: generateUniqueId(),
        imageId,
        author,
        content,
        date: new Date(),
    };

    CommentModel.create(comment, (err, newComment) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, newComment);
        }
    });
}





function generateUniqueId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}
