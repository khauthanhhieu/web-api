class UserService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    getUser() {
        let seft = this
        return seft.res.status(200).json({'a' : 'b'})
    }
}

module.exports = UserService;