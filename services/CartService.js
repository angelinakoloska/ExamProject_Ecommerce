// class CartService {
//   constructor(db) {
//     this.client = db.sequelize;
//     this.Cart = db.Cart;
//     this.CartItem = db.CartItem;
//     this.Order = db.Order;
//     this.OrderItem = db.OrderItem;
//     this.User 
//   }

//   async getCartByUserId(userId) {
//     try {
//       return await this.Cart.findOne({
//         where: { userId: userId, isDeleted: false },
//         include: [this.CartItem]
//       });
//     } catch (error) {
//       console.error('Error fetching cart by user id:', error);
//       throw error;
//     }
//   }

//   async generateCart(userId) {
//     try {
//       return await this.Cart.create({ userId: userId, isDeleted: false });
//     } catch (error) {
//       console.error('Error generating cart:', error);
//       throw error;
//     }
//   }

//   async insertItemToCart(cartId, productId, quantity, price) {
//     try {
//       const cartItem = await this.CartItem.findOne({ where: { cartId: cartId, productId: productId } });
//       if (cartItem) {
//         return await cartItem.update({ quantity: cartItem.quantity + quantity });
//       } else {
//         return await this.CartItem.create({ cartId: cartId, productId: productId, quantity: quantity, unitPrice: price });
//       }
//     } catch (err) {
//       console.error('Error inserting item to cart:', err);
//       throw err;
//     }
//   }

//   async deleteItemFromCart(cartId, productId) {
//     try {
//       return await this.CartItem.destroy({ where: { cartId: cartId, productId: productId } });
//     } catch (err) {
//       console.error('Error removing item from cart:', err);
//       throw err;
//     }
//   }

//   async checkoutCart(userId) {
//     try {
//       const cart = await this.getCartByUserId(userId);
//       if (!cart) {
//         throw new Error('Cart not found');
//       }

//       const order = await this.Order.create({
//         userId: userId,
//         status: 'In Progress'
//       });

//       for (const item of cart.CartItems) {
//         await this.OrderItem.create({
//           orderId: order.id,
//           productId: item.productId,
//           quantity: item.quantity,
//           unitPrice: item.unitPrice
//         });
//       }

//       await cart.update({ isDeleted: true });

//       return order;
//     } catch (err) {
//       console.error('Error checking out cart:', err);
//       throw err;
//     }
//   }
// }

// module.exports = CartService;
class CartService {
    constructor(db) {
        this.client = db.sequelize;
        this.Cart = db.Cart;
        this.CartItem = db.CartItem;
        this.Order = db.Order;
        this.OrderItem = db.OrderItem;
        this.User = db.User;
        this.Membership = db.Membership;
    }
      async fetchCartByUserId(userId) {
        try {
          return await this.Cart.findOne({
            where: { userId: userId, isDeleted: false },
            include: [this.CartItem]
          });
        } catch (error) {
          console.error('Error fetching cart by user id:', error);
          throw error;
        }
      }
      async renewUserMembership(userId, purchase) {
        const user = a
      }
  
      async checkoutCart(userId) {
      try {
        const cart = await this.getCartByUserId(userId);
        if (!cart) {
          throw new Error('Cart not found');
        }
  
        const order = await this.Order.create({
          userId: userId,
          status: 'In Progress'
        });
  
        for (const item of cart.CartItems) {
          await this.OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          });
        }
  
        await cart.update({ isDeleted: true });
  
        return order;
      } catch (err) {
        console.error('Error checking out cart:', err);
        throw err;
      }
    }
  
    
  }
  module.exports = CartService;