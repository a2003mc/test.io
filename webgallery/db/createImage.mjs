import path from 'path';
import { fileURLToPath } from 'url';
import Datastore from 'nedb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const imageDb = new Datastore({ filename: path.join(__dirname, '/imageDb.db'), autoload: true });

export const ImageModel = {
    create: function(user, callback) {
    imageDb.insert(user, function(err, newUser) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, newUser);
        }
      });
    },
  
    findAll: function(callback) {
    imageDb.find({}, function(err, users) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, users);
        }
      });
    },
  

    findByUsername: function(username, callback) {
        imageDb.findOne({ userName: username }, function(err, user) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, user);
        }
      });
    },
  

    findById: function(id, callback) {
        imageDb.findOne({ _id: id }, function(err, user) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, user);
        }
      });
    },
  
    // 更新用户信息
    update: function(id, updatedUser, callback) {
        imageDb.update({ _id: id }, { $set: updatedUser }, {}, function(err, numReplaced) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, numReplaced);
        }
      });
    },
  
    // 删除用户
   

    remove: function(id, callback) {
      imageDb.remove({ _id: id }, { multi: true }, function(err, numRemoved) {
          if (err) {
              callback(err, null);
          } else {
              callback(null, numRemoved);
          }
      });
  }

}