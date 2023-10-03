class AuthController {
  static async isAuthenticated(req, res) {
    if(req.user) {
      return res.status(200).send({message: "Authenticated"});
    } else {
      return res.status(401).send({message: "Unauthenticated"});
    }
  }
}

module.exports = AuthController;
