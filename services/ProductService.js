class ProductService {
    constructor(db) {
        this.client = db.sequelize;
        this.Product = db.Product;
    }

    async createProduct(productData) {
        const product = this.Product.create(productData);
        return product;
    }
    async fetchAllProducts() {
        const productQuery = 
        `
            SELECT p.productId, p.name, p.description, p.unitprice, p.discount, p.date_added, p.imgurl, p.quantity, p.isdeleted, p.createdAt, p.updatedAt,
            c.name AS category, b.name AS brand
            FROM Products AS p
            JOIN Categories AS c ON p.CategoryId = c.id
            JOIN Brands AS b on p.BrandId = b.id
            WHERE p.isdeleted = false
        `;
        return this.client.query(productQuery, {type: this.client.QueryTypes.SELECT});
    }
    async fetchProductById(id) {
        const productId = this.Product.findByPk(id);
        return productId;
    }
    async modifyProduct(id, data){
        const modifyProduct = this.Product.update(data, { where: { productId: id } });
        return modifyProduct;
    }
    async deleteProduct(id){
        const deletedPrduct = this.Product.destroy({ where:{ productId: id } });
        return deletedPrduct;
    }
}
module.exports = ProductService;


