<template>
    <div class="Footer">
        <footer class="bg-blue-800 text-white shadow-lg py-6 mt-auto">
        <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <!-- Logo e Nome -->
            <div class="flex items-center space-x-3 mb-4 md:mb-0">
            <img src="https://via.placeholder.com/50" alt="Logo" class="w-14 h-14 rounded-full shadow-md border-4 border-white transform transition-transform hover:scale-110"/>
            <span class="text-2xl font-semibold tracking-wider">Farmacia+</span>
            </div>
            <!-- Navegação -->
            <nav class="space-x-6 flex mb-4 md:mb-0">
            <a href="#" class="hover:text-gray-300 transition-colors">Home</a>
            <a href="#" class="hover:text-gray-300 transition-colors">Sobre</a>
            <a href="#" class="hover:text-gray-300 transition-colors">Serviços</a>
            <a href="#" class="hover:text-gray-300 transition-colors">Contato</a>
            </nav>

            <!-- Ícone para redes sociais -->
            <div class="flex space-x-4">
            <a href="#" class="hover:text-gray-300 transition-colors"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="hover:text-gray-300 transition-colors"><i class="fab fa-twitter"></i></a>
            <a href="#" class="hover:text-gray-300 transition-colors"><i class="fab fa-instagram"></i></a>
            </div>
        </div>

        <div class="text-center mt-6 text-sm text-gray-300">
            <p>&copy; 2025 Farmacia+. Todos os direitos reservados.</p>
        </div>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>
