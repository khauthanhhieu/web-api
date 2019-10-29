const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/websdk';

class UserService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async register() {
        const db = await MongoClient.connect(url);
        try {
            const userCollection = db.collection("users")
            const user = this.req.body;
            const result = await userCollection.findOne({username: user.username})
            if (result != null) {
                this.res.status(200).json({mess: "Tên người dùng đã tồn tại"})
            } else {
                await userCollection.insert(this.req.body)
                this.res.status(200).json({status:200});
            }
        } catch(error) {
            this.res.status(500).json({
                error: error
            })
        } finally {
            db.close()
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