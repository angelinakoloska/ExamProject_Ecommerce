class MembershipService {
    constructor(db) {
        this.db = db.sequelize;
        this.Membership = db.Membership;
    }
    async generateMembership(membershipData) {
        const membership = await this.Membership.create(membershipData);
        return  membership
    }
    async fetchAllMemberships() {
        const memberships = await this.Membership.findAll();
        return memberships;
    }
    async fetchMembershipByName(name) {
        const mebershipName = await this.Membership.findOne({where: { name}});
        return mebershipName;
    }
    async fetchMemberShipById(id) {
        const membershipId = await this.Membership.findByPk(id);
        return membershipId;
    }
    async modifyMembership(id, membershipData) {
        const modifyMembership = await this.Membership.update(membershipData, {where: {id}});
        return modifyMembership;
    }
    async deleteMembership(id) {
        const deleteMembership = await this.Membership.destroy({where: {id}});
        return deleteMembership;
    }
}
module.exports = MembershipService;
// // services/MembershipService.js
// class MembershipService {
//     constructor(db) {
//       this.client = db.sequelize;
//       this.Membership = db.Membership;
//     }
  
//     async create(data) {
//       return this.Membership.create(data);
//     }
  
//     async getAll() {
//       return this.Membership.findAll();
//     }
  
//     async getOneByName(name) {
//       return this.Membership.findOne({ where: { name } });
//     }

//     async getById(id) {
//           return this.Membership.findByPk(id);
//         }
      
//         async update(id, data) {
//           return this.Membership.update(data, { where: { id } });
//         }
      
//         async delete(id) {
//           return this.Membership.destroy({ where: { id } });
//         }
//   }
  
// module.exports = MembershipService;


// class MembershipService {
//   constructor(db) {
//     this.Membership = db.Membership;
//   }

//   async create(data) {
//     return this.Membership.create(data);
//   }

//   async getAll() {
//     return this.Membership.findAll();
//   }

//   async getById(id) {
//     return this.Membership.findByPk(id);
//   }

//   async update(id, data) {
//     return this.Membership.update(data, { where: { id } });
//   }

//   async delete(id) {
//     return this.Membership.destroy({ where: { id } });
//   }
// }

// module.exports = MembershipService;
