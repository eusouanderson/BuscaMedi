<!-- src/components/Cart.vue -->
<template>
  <div v-if="cart.length > 0" class="cart">
    <h3 class="text-xl font-semibold text-center text-blue-800">Carrinho</h3>
    <ul>
      <li v-for="item in cart" :key="item._id">
        <p>{{ item.name }} - {{ item.price }}</p>
      </li>
    </ul>
    <button @click="clearCart" class="clear-cart-btn">Limpar Carrinho</button>
  </div>
  <div v-else class="cart-empty">
    <p>Seu carrinho está vazio.</p>
  </div>
</template>

<script>
export default {
  name: 'CartComponent',
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  emits: ['clearCart'],
  methods: {
    clearCart() {
      this.$emit('clearCart');
    },
  },
};
</script>

<style scoped>
.cart {
  margin-top: 20px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.clear-cart-btn {
  background-color: #ff4d4d;
  color: white;
  padding: 10px 14px;
  border-radius: 4px;
  margin-top: 10px;
}

.cart-empty {
  text-align: center;
  margin-top: 20px;
}
</style>
