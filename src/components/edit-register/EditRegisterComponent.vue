<template>
  <div>
    <h3>Editar Aluno</h3>
    <form @submit.prevent="updateRegister">      
      <label for="edit-nome">Nome:</label>
      <input v-model="editedRegister.nome" id="edit-nome" type="text" required />

      <label for="edit-dataDeNascimento">Data de Nascimento:</label>
      <input v-model="editedRegister.dataDeNascimento" id="edit-dataDeNascimento" type="date" required />

      <label for="edit-nomeDaMae">Nome da Mãe:</label>
      <input v-model="editedRegister.nomeDaMae" id="edit-nomeDaMae" type="text" required />

      <label for="edit-periodoDeIngresso">Período de Ingresso:</label>
      <select v-model="editedRegister.periodoDeIngresso" id="edit-periodoDeIngresso" name="edit-periodoDeIngresso">
        <option value="2023.1">2023.1</option>
        <option value="2023.2">2023.2</option>
        <option value="2024.1">2024.1</option>
        <option value="2024.2">2024.2</option>
      </select>

      <div class="button-group">
        <button class="btn btn-save" type="submit">Salvar</button>
        <router-link class="btn btn-cancel" :to="{ name: 'list-registers' }">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedRegister: {
        id: null,
        nome: "",
        dataDeNascimento: "",
        nomeDaMae: "",
        periodoDeIngresso: "2023.1",
      },
      confirmacao: false,
    };
  },
  methods: {
    formatDate(date) {
      return date;
    },
    updateRegister() {
      const formData = {
        id: this.editedRegister.id,
        nome: this.editedRegister.nome,
        dataDeNascimento: this.editedRegister.dataDeNascimento,
        nomeDaMae: this.editedRegister.nomeDaMae,
        periodoDeIngresso: this.editedRegister.periodoDeIngresso,
      };

      fetch(`https://localhost:7275/api/estudantes/${this.editedRegister.id}`, {
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
          this.confirmacao = true;
          setTimeout(() => {
            this.confirmacao = false;
          }, 3000);
          this.$router.push({ name: 'list-registers' });
        })
        .catch(error => {
          console.error(error.message);
        });
    },
  },
  created() {
    const registerId = this.$route.params.id;

    fetch(`https://localhost:7275/api/estudantes/${registerId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao obter os dados do back-end.');
        }
        return response.json();
      })
      .then(data => {
        this.editedRegister = data;
        this.editedRegister.dataDeNascimento = this.formatDate(this.editedRegister.dataDeNascimento);
      })
      .catch(error => {
        console.error(error.message);
      });
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 350px;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

#m-nome,
#m-dataDeNascimento,
#m-nomeDaMae,
#periodoDeIngresso {
  @apply form-control;
}

#edit-nome,
#edit-dataDeNascimento,
#edit-nomeDaMae,
#edit-periodoDeIngresso {
  @apply form-control;
}

.button-group {
  margin-top: 10px;
}

button.btn-save {
  background-color: blue;
  color: #fff;
  border: none;
  margin-right: 10px;
}

/* Aplique a cor vermelha diretamente ao router-link para o botão Cancelar */
.button-group .btn-cancel {
  background-color: red;
  color: #fff;
  border: none;
}

/* Adiciona estilos para a mensagem de confirmação */
.alert-success {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #28a745;
  border-radius: 4px;
  color: #28a745;
  background-color: #d4edda;
}
</style>
