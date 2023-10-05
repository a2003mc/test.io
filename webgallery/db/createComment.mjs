import path from 'path';
import { fileURLToPath } from 'url';
import Datastore from 'nedb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const commentDb = new Datastore({ filename: path.join(__dirname, '/commentDb.db'), autoload: true });

export const CommentModel = {
    create: function(user, callback) {
        commentDb.insert(user, function(err, newUser) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, newUser);
        }
      });
    },
  
    findAll: function(callback) {
        commentDb.find({}, function(err, users) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, users);
        }
      });
    },
  

    findByUsername: function(username, callback) {
        commentDb.findOne({ userName: username }, function(err, user) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, user);
        }
      });
    },
  

    findById: function(id, callback) {
        commentDb.findOne({ _id: id }, function(err, user) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, user);
        }
      });
    },
  
    // 更新用户信息
    update: function(id, updatedUser, callback) {
        commentDb.update({ _id: id }, { $set: updatedUser }, {}, function(err, numReplaced) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, numReplaced);
        }
      });
    },
  
    // 删除用户
    remove: function(id, callback) {
        commentDb.remove({ _id: id }, {}, function(err, numRemoved) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, numRemoved);
        }
      });
}
}