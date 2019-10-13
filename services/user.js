const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/websdk';

class UserService {
    getUser() {
        let seft = this
        return seft.res.status(200).json({ 'a': 'b' })
    }
    login() {
    
    }
    register() {
        let self = this;
        let userItem = this.req.body.userItem;
    
        try {
            MongoClient.connect(url, function (err, db) {
                assert.equal(null, err);
                self.insert(userItem, db, function () {
                    db.close()
                    return self.res.status(200).json({
                        status: 0
                    })
                })
            });
        }
        catch (error) {
            return self.res.status(500).json({
                status: 1,
                error: error
            })
        }
    }

    static async findOne(username, password) {
        let seft = this;
        try {
            MongoClient.connect(url, function (err, db) {
                if (err)
                    console.log(err)
                db.collection('users').findOne({ username: username, password: password }, function (err, result) {
                    if (err)
                        console.log(err)
                    return result;
                })
            });
        }
        catch (error) {
            return null;
        }
    }

    static async findOneById(id) {
        let seft = this;
        try {
            MongoClient.connect(url, function (err, db) {
                assert.equal(null, err);
                db.collection('users').findOne({ _id : id }, function (err, result) {
                    assert.equal(err, null);
                    return result;
                })
            });
        }
        catch (error) {
            return null;
        }
    }

}

module.exports = UserService;