<template>
  <div>
    <h3>Editar Aluno</h3>
    <form @submit.prevent="updateRegister">
      <div class="form-group">
        <label for="edit-nome">Nome:</label>
        <input v-model="editedRegister.nome" id="edit-nome" type="text" required />
      </div>

      <div class="form-group">
        <label for="edit-dataDeNascimento">Data de Nascimento:</label>
        <input v-model="editedRegister.dataDeNascimento" id="edit-dataDeNascimento" type="date" required />
      </div>

      <div class="form-group">
        <label for="edit-nomeDaMae">Nome da Mãe:</label>
        <input v-model="editedRegister.nomeDaMae" id="edit-nomeDaMae" type="text" required />
      </div>

      <div class="form-group">
        <label for="edit-periodoDeIngresso">Período de Ingresso:</label>
        <select v-model="editedRegister.periodoDeIngresso" id="edit-periodoDeIngresso" name="edit-periodoDeIngresso">
          <option value="2023.1">2023.1</option>
          <option value="2023.2">2023.2</option>
          <option value="2024.1">2024.1</option>
          <option value="2024.2">2024.2</option>
        </select>
      </div>

      <div class="button-group">
        <button class="btn btn-primary" type="submit">Salvar</button>
        <router-link class="btn btn-secondary" :to="{ name: 'list-registers' }">Cancelar</router-link>
      </div>
    </form>

    <div v-if="confirmacao" class="alert-success">
      Dados atualizados com sucesso!
    </div>
  </div>
</template>

<script>
import estudantesAPI from '../../requests/estudantes';

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
      const formattedDate = new Date(date).toISOString().split('T')[0];
      return formattedDate;
    },
    updateRegister() {
      const formData = {
        id: this.editedRegister.id,
        nome: this.editedRegister.nome,
        dataDeNascimento: this.editedRegister.dataDeNascimento,
        nomeDaMae: this.editedRegister.nomeDaMae,
        periodoDeIngresso: this.editedRegister.periodoDeIngresso,
      };

      estudantesAPI.update(this.editedRegister.id, formData)
        .then(() => {
          console.log('Dados atualizados com sucesso!');
          this.confirmacao = true;
          setTimeout(() => {
            this.confirmacao = false;
          }, 3000);
          this.$router.push({ name: 'list-registers' });
        })
        .catch(error => {
          console.error('Erro ao enviar os dados atualizados para o back-end.', error.message);
        });
    },
    loadData() {
      const registerId = this.$route.params.id;

      estudantesAPI.getById(registerId)
        .then(response => {
          this.editedRegister = response.data;
          this.editedRegister.dataDeNascimento = this.formatDate(this.editedRegister.dataDeNascimento);
        })
        .catch(error => {
          console.error('Erro ao obter os dados do back-end.', error.message);
        });
    },
  },
  created() {
    this.loadData();
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

.button-group {
  margin-top: 10px;
}

button.btn-save {
  background-color: blue;
  color: #fff;
  border: none;
  margin-right: 10px;
}

.button-group .btn-cancel {
  background-color: red;
  color: #fff;
  border: none;
}
.button-group button {
  margin-right: 10px; 
}
.alert-success {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #28a745;
  border-radius: 4px;
  color: #28a745;
  background-color: #d4edda;
}
</style>
