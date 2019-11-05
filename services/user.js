const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const url = 'mongodb://kth:12345@webapi-shard-00-00-emxfh.mongodb.net:27017,webapi-shard-00-01-emxfh.mongodb.net:27017,webapi-shard-00-02-emxfh.mongodb.net:27017/test?ssl=true&replicaSet=webapi-shard-0&authSource=admin&retryWrites=true&w=majority';

class UserService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async checkUsername() {
        const db = await MongoClient.connect(url);
        try {
            const verify = jwt.verify(this.req.headers['token'], 'doctor')
            const userCollection = db.collection("users");
            const { username } = this.req.body
            console.log(username)
            const currUser = await userCollection.findOne({ _id: ObjectId(verify.user_id)});
            console.log(currUser, verify.user_id)
            const result = await userCollection.findOne({ username });
            if (!result  || result.username === currUser.username) {
                return this.res.json({
                    isSuccess: true,
                })
            }
            return this.res.json({
                isSuccess: false,
                mess: "Tên đăng nhập này đã tồn tại !"
            })
        } catch(err) {
            console.log(err)
            return this.res.status(503).json({
                isSuccess: false,
                mess: "Lỗi kết nối !"
            })
        } finally {
            db.close()
        }
    }

    async register() {
        const db = await MongoClient.connect(url);
        try {
            const userCollection = db.collection("users")
            const user = this.req.body;
            const result = await userCollection.findOne({ username: user.username })
            if (result != null) {
                this.res.status(200).json({
                    isSuccess: false,
                    mess: "Tên người dùng đã tồn tại",
                })
            } else {
                await userCollection.insert(this.req.body)
                this.res.status(200).json({
                    isSuccess: true,
                });
            }
        } catch (error) {
            this.res.status(500).json({
                isSuccess: false,
                error: error,
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
        const db = await MongoClient.connect(url);
        var result = undefined;
        try {
            const userCollection = db.collection("users")
            result = await userCollection.findOne({ _id: new ObjectId(id) })
        } catch (error) {
            result = undefined
            console.log(error)
        } finally {
            db.close()
        }
        return result;
    }

    async edit() {
        try {
            const verify = jwt.verify(this.req.headers['token'], 'doctor')
            const data = this.req.body;
            const keys = Object.keys(data);

            const db = await MongoClient.connect(url);
            const userCollection = db.collection("users")
            console.log(verify.user_id, data)
            if (keys.length == 1) {
                if (keys[0] != 'avatar') {
                    await userCollection.update({ _id: ObjectId(verify.user_id) }, {"$set": data})
                } else {
                    console.log("name", data.avatar)
                }
            } else if (keys.length == 2) {
                const currUser = await userCollection.findOne({_id: ObjectId(verify.user_id)})
                if (data.old_password !== currUser.password) {
                    this.res.json({
                        isSuccess: false,
                        mess: "Mật khẩu cũ không đúng !"
                    })
                } else {
                    await userCollection.update({_id: ObjectId(verify.user_id)}, { "$set":{ password:data.password } })
                }
            }
            db.close()
            this.res.json({
                isSuccess: true,
            })
        } catch (err) {
            console.log(err)
            this.res.status(503).json({
                isSuccess: false
            })
        }
    }
}

module.exports = UserService;