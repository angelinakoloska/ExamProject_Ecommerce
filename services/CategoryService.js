class CategoryyService {
    constructor(db) {
        this.client = db.sequelize;
        this.Category = db.Category;
    }

    async fetchAllCategories() {
        return this.Category.findAll({
            where: { 
            }
        }).catch( err => {
            return (err)
        })
    }
    async fetchCategoryById(id){
        const categoryId = this.Category.findByPk(id);
        return categoryId;
    }
    async generateCategory(categoryData){
        const category = this.Category.create(categoryData)
        return category;
    }
    async modifyCategory(id, data){
        const modifiedCategory = this.Category.update(data, {where: {id}});
        return modifiedCategory;
    }
    async deleteCategory(id) {
        const deletedCategory = this.Category.destroy({where: {id}});
        return deletedCategory;
    }
}
module.exports = CategoryyService;