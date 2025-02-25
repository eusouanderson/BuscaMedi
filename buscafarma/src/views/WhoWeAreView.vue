<template>
  <div class="who-we-are">
    <h1>Quem Somos</h1>
    <p>Somos uma equipe apaixonada por tecnologia e inovação, sempre buscando oferecer as melhores soluções para nossos clientes.</p>
  </div>
</template>

<script>
export default {
  name: "WhoWeAreView",
};
</script>

<style scoped>
/* Faz com que a página ocupe toda a tela */
.who-we-are {
  width: 100vw;  /* 100% da largura da tela */
  height: 100vh; /* 100% da altura da tela */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza verticalmente */
  align-items: center; /* Centraliza horizontalmente */
  background-color: #f1f1f1;
  text-align: center;
}

h1 {
  color: #333;
  font-size: 32px;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-size: 18px;
  max-width: 600px; 
  padding: 0 20px;
}
</style>
