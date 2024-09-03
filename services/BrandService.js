class BrandService {
    constructor(db) {
        this.client = db.sequelize;
        this.Brand = db.Brand;
    }

    async fetchAllBrands() {
        const brands = this.Brand.findAll();
        return brands;
    }
    async fetchBrandById(id){
        const brandId = this.Brand.findByPk(id);
        return brandId;
    }
    async generateBrand(brandData){
        const brand = this.Brand.create(brandData)
        return brand;
    }
    async modifyBrand(id, data){
        const modifiedBrand = this.Brand.update(data, {where: {id}});
        return modifiedBrand;
    }
    async deleteBrand(id) {
        const deletedBrand = this.Brand.destroy({where: {id}});
        return deletedBrand;
    }
}
module.exports = BrandService;