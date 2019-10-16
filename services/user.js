const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/websdk';

class UserService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    getUser() {
        let seft = this
        return seft.res.status(200).json({ 'a': 'b' })
    }

    insert(user, db, callback) {
        db.collection('users').insertOne(user, function () {
            callback
        })
    }
    register() {
        let self = this;
        var user = this.req.body
        try {
            MongoClient.connect(url, function (err, db) {
                if (err)
                    console.log(err)

                self.insert(user, db, function () {
                    if (err)
                        console.log(err)
                    db.close()
                })

                self.res.status(200).json({
                    status: 200
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
        try {
            return new Promise((resolve, reject) => {
                MongoClient.connect(url, function (err, db) {
                    if (err)
                        console.log(err)
                    db.collection('users').findOne({ username: username, password: password }, function (err, result) {
                        if (err)
                            console.log(err)
                        resolve(result);
                    })
                });
            })

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
                db.collection('users').findOne({ _id: id }, function (err, result) {
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