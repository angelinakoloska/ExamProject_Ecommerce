class CartItemService {
    constructor(db) {
        this.client = db.sequelize;
        this.CartItem = db.CartItem;
    }

    async generateCartItem(cartItemData) {
        const cartItem = await this.CartItem.create(cartItemData);
        return cartItem;
    }
    async fetchAllCartItems() {
        const cartItems = this.CartItem.findAll()
        return cartItems
    }
    async fetchCartItemById(id) {
        const cartItemId = this.CartItem.findByPk(id);
        return cartItemId;
    }
    async modifyCartItem(id, data) {
        const modifyCartItem = this.CartItem.update(data, {where: {id}});
        return modifyCartItem
    }
    async deleteCartItem(id) {
        const deleteCartItem = this.CartItem.destroy({where: {id}});
        return deleteCartItem
    }

}
module.exports = CartItemService;