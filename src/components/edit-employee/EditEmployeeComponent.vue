<template>
    <div>
      <h3>Editar Aluno</h3>
      <form @submit.prevent="updateEmployee">
        <label for="edit-nome">Nome:</label>
        <input v-model="editedEmployee.nome" id="edit-nome" type="text" required />
  
        <label for="edit-dataDeNascimento">Data de Nascimento:</label>
        <input v-model="editedEmployee.dataDeNascimento" id="edit-dataDeNascimento" type="date" required />
  
        <label for="edit-nomeDaMae">Nome da Mãe:</label>
        <input v-model="editedEmployee.nomeDaMae" id="edit-nomeDaMae" type="text" required />
  
        <label for="edit-periodoDeIngresso">Período de Ingresso:</label>
        <select v-model="editedEmployee.periodoDeIngresso" id="edit-periodoDeIngresso" name="edit-periodoDeIngresso">
          <option value="2023.1">2023.1</option>
          <option value="2023.2">2023.2</option>
          <option value="2024.1">2024.1</option>
          <option value="2024.2">2024.2</option>
        </select>
  
        <button type="submit">Salvar</button>
        <router-link :to="{ name: 'list-employees' }">Cancelar</router-link>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editedEmployee: {
          id: null,
          nome: "",
          dataDeNascimento: "",
          nomeDaMae: "",
          periodoDeIngresso: "2023.1",
        },
      };
    },
    methods: {
      updateEmployee() {
        const formData = {
          id: this.editedEmployee.id,
          nome: this.editedEmployee.nome,
          dataDeNascimento: this.editedEmployee.dataDeNascimento,
          nomeDaMae: this.editedEmployee.nomeDaMae,
          periodoDeIngresso: this.editedEmployee.periodoDeIngresso,
        };
  
        fetch(`https://localhost:7275/api/estudantes/${this.editedEmployee.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao enviar os dados atualizados para o back-end.');
            }
            console.log('Dados atualizados com sucesso!');
            this.$router.push({ name: 'list-employees' });
          })
          .catch(error => {
            console.error(error.message);
          });
      },
    },
    created() {
      // Obter o ID do aluno da rota
      const employeeId = this.$route.params.id;
  
      // Obter os detalhes do aluno do backend usando o ID
      fetch(`https://localhost:7275/api/estudantes/${employeeId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao obter os dados do back-end.');
          }
          return response.json();
        })
        .then(data => {
          // Atualizar os dados do aluno no estado
          this.editedEmployee = data;
        })
        .catch(error => {
          console.error(error.message);
        });
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente, se necessário */
  </style>
  