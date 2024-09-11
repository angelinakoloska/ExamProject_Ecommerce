class UserService {
    constructor(db) {
      this.client = db.sequelize;
      this.User = db.User;
    }
    async generateUser(userData) {
        const user = await this.User.create(userData);
        return user;
    }
    //getOneByEmail
    async fetchUserByEmail(email) {
        const userByEmail = await this.User.findOne({where: {email}})
        return userByEmail;
    }

    async fetchUserByUsername(username) {
        const userByUsername = await this.User.findOne({where: {username}});
        return userByUsername;
    }
    async fetchAllUsers() {
        const users = await this.User.findAll();
        return users;
    }
    async modifyUser(id, data) {
        const modifyUser = await this.User.update(data, {where: { id}})
      return modifyUser;
    }
    async deleteUser(id){
        const deleteUser = await this.User.destroy({where: {id}})
        return deleteUser; 
    }
    async fetchUserById(id) {
      const userId = await this.User.findByPk(id, {
        include: ['Membership', 'Role', 'Carts', 'Orders']
      });
      if(!userId) {
        return null;
      }
      return JSON.parse(JSON.stringify(userId))
    }
  }
  module.exports = UserService;
// class UserService {
//   constructor(db) {
//     this.client = db.sequelize;
//     this.User = db.User;
//   }

//   async createUser(data) {
//     return this.User.create(data);
//   }

//   async getOneByEmail(email) {
//     return this.User.findOne({ where: { email } });
//   }

//   async getOneByUsername(username) {
//     return this.User.findOne({ where: { username } });
//   }

//   async getAll() {
//     return this.User.findAll();
//   }

//   async update(id, data) {
//     return this.User.update(data, { where: { id } });
//   }

//   async delete(id) {
//     return this.User.destroy({ where: { id } });
//   }
// }
// module.exports = UserService;
