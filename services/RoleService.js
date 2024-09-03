class RoleService {
    constructor(db) {
        this.client = db.sequelize;
        this.Role = db.Role;
    }
    async generateRole(roleData) {
        const role = await this.Role.create(roleData);
        return role;
    }
    async fetchAllRoles() {
        const roles = await this.Role.findAll();
        return roles;
    }
    async fetchRoleByName(name) {
        const roleName = await this.Role.findOne({where: {name}});
        return roleName;
    }
    async fetchRoleById(id) {
        const roleId = await this.Role.findByPk(id);
        return roleId;
    }
    async modifyRole(id, data) {
        const modifiedRole = await this.Role.update(data, {whwere: {id}});
        return modifiedRole;
    }
    async deleteRole(id) {
        const deletedRole = await this.Role.destroy({where: {id}});
        return deletedRole;
    }
}
module.exports = RoleService;
// class RoleService {
//     constructor(db) {
//       this.client = db.sequelize;
//       this.Role = db.Role;
//     }
  
//     async create(data) {
//       return this.Role.create(data);
//     }
  
//     async getAll() {
//       return this.Role.findAll();
//     }
  
//     async getOneByName(name) {
//       return this.Role.findOne({ where: { name } });
//     }
  
//     async getById(id) {
//       return this.Role.findByPk(id);
//     }
  
//     async update(id, data) {
//       return this.Role.update(data, { where: { id } });
//     }
  
//     async delete(id) {
//       return this.Role.destroy({ where: { id } });
//     }
//   }
  
  module.exports = RoleService;
  