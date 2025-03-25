const Cart = require("../models/cart")

class CartManager {

    getCart = async () => {      return await this.leerJSON()    }

    getCartById = async (id) => {
        const carts = await this.leerJSON()
        return carts.find(carrito => carrito._id.toString() === id) || null;
    }

    addCart = async (data) => {

        const newCart = {
            title: data.title,
            products: []
        };

        const result = await Cart.create(newCart)
        return result;
    }

    async addProductsToCart(cartId, prodId) {
        const cart = await Cart.findById(cartId);
        if (!cart) {     return { error: `Carrito con ID ${cartId} no encontrado` };     }
        
        cart.products.push({ product: prodId });

        await cart.save();

        return cart;
    }
    
    deleteAllProductsbyId = async (id) => {

        const result = await Cart.updateOne(
            { _id: id.id },
            { $set: { products: [] } }
        );
        
        return result;
    };

    deleteProductsbyId = async (idCart, idProduct) => {

        const updatedCart = await Cart.findByIdAndUpdate(
            idCart,
            { $pull: { products: { product: idProduct } } },
            { new: true } // Retorna el documento actualizado
          );
          if (!updatedCart) {
            throw new Error("Carrito no encontrado");
          }
        
        return updatedCart;
    };

    updateAllProductsbyId = async (id, data) => {

        const result = await Cart.updateOne(
            { _id: id.id },
            { $set: { products: data.products } }
        );
        
        return result;
    };

    updateProductsbyId = async (id, data) => {

        const result = await Cart.updateOne(
            { _id: id.id },
            { $set: { products: [] } }
        );
        
        return result;
    };

    async leerJSON() {
        try {
            const data = await Cart.find().populate("products.product");
            return data;
        } catch (error) {
            console.error('Error al leer o procesar el archivo JSON:', error);
            return [];
        }
    }
}

const cartManager = new CartManager('server/bd/carts.json')

module.exports = {
    getCart: async () => await cartManager.getCart(),
    getCartById: async (id) => await cartManager.getCartById(id),
    addCart: async (data) => await cartManager.addCart(data),
    addProductsToCart: async (idCart, idProduct) => await cartManager.addProductsToCart(idCart, idProduct),
    deleteAllProductsbyId: async (id) => await cartManager.deleteAllProductsbyId(id),
    deleteProductbyId: async (idCart, idProduct) => await cartManager.deleteProductbyId(idCart, idProduct),
    updateAllProductsbyId: async (id, data) => await cartManager.updateAllProductsbyId(id, data),
    updateProductsbyId: async (id, data) => await cartManager.updateProductsbyId(id, data),
};