<template>
  <div class="health-and-well-being">
    <h1>Saúde e Bem-Estar</h1>
    <p>
      Os medicamentos desempenham um papel fundamental na manutenção da saúde e no tratamento de diversas doenças. 
      Eles ajudam a aliviar sintomas, prevenir complicações e garantir uma melhor qualidade de vida para as pessoas. 
      Quando usados corretamente, sob orientação médica, os medicamentos permitem o controle de condições crônicas, 
      a recuperação de infecções e a melhoria geral do bem-estar. Além disso, o avanço da ciência farmacêutica tem 
      possibilitado o desenvolvimento de novos tratamentos cada vez mais eficazes e seguros, proporcionando esperança 
      e mais longevidade para milhões de pessoas ao redor do mundo.
    </p>
  </div>
</template>

<script>
export default {
  name: "HealthAndWellBeingView",
};
</script>

<style scoped>
/* Faz a página ocupar toda a tela e mantém o conteúdo centralizado */
.health-and-well-being {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  text-align: center;
  padding: 20px;
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
  line-height: 1.5;
}
</style>
