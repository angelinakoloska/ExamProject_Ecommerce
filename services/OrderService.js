class CartService {
    constructor(db) {
        this.client = db.sequelize;
        this.Cart = db.Cart;
        this.CartItem = db.CartItem;
        this.Order = db.Order;
        this.OrderItem = db.OrderItem;
    }
  
    async getCartByUserId(userId) {
        return this.Cart.findOne({
            where: { userId: userId, isDeleted: false },
            include: [this.CartItem]
        });
    }
  
    async createCart(userId) {
        return this.Cart.create({ userId: userId, isDeleted: false });
    }
  
    async addItemToCart(cartId, productId, quantity, price, productName) {
        const cartItem = await this.CartItem.findOne({ where: { cartId: cartId, productId: productId } });
        if (cartItem) {
            return cartItem.update({ quantity: cartItem.quantity + quantity });
        } else {
            return this.CartItem.create({ cartId: cartId, productId: productId, quantity, unitPrice: price, productName });
        }
    }
  
    async removeItemFromCart(cartId, productId) {
        return this.CartItem.destroy({ where: { cartId: cartId, productId: productId } });
    }
  
    async checkoutCart(userId) {
        const cart = await this.getCartByUserId(userId);
        if (!cart || cart.CartItems.length === 0) {
            throw new Error('Cart is empty or not found');
        }
  
        // Create Order
        const order = await this.Order.create({
            userId: userId,
            status: 'In Progress',
            orderNumber: Math.random().toString(36).substr(2, 8).toUpperCase()
        });
  
        // Create Order Items
        const orderItems = cart.CartItems.map(item => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            productName: item.productName
        }));
  
        await this.OrderItem.bulkCreate(orderItems);
  
        // Mark cart as deleted
        cart.isDeleted = true;
        await cart.save();
  
        return order;
    }
  }
  
  module.exports = CartService;
  