<template>
  <div class="row justify-content-center">
    <h3>Alunos Cadastrados</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data de Nascimento</th>
          <th>Nome da Mãe</th>
          <th>Período de Ingresso</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="register in registers" :key="register.id">
          <td>{{ register.nome }}</td>
          <td>{{ register.dataDeNascimento.split('T')[0] }}</td>
          <td>{{ register.nomeDaMae }}</td>
          <td>{{ register.periodoDeIngresso }}</td>
          <td>
            <router-link :to="{ name: 'edit-register', params: { id: register.id } }" class="btn btn-primary"
              style="margin-right: 10px;">
              <i class='bx bxs-edit'></i> Editar
            </router-link>
            <button @click="deleteRegister(register.id)" class="btn btn-danger" style="margin-right: 10px;">
              <i class='bx bxs-trash'></i> Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showEditModal" class="modal-container">
      <div class="modal">
        <button class="btnFecharModal" @click="closeEditModal">Fechar</button>

        <label for="m-nome">Nome:</label>
        <input v-model="editedRegister.nome" id="m-nome" type="text" required />

        <label for="m-dataDeNascimento">Data de Nascimento:</label>
        <input v-model="editedRegister.dataDeNascimento" id="m-dataDeNascimento" type="date" required />

        <label for="m-nomedamae">Nome da Mãe:</label>
        <input v-model="editedRegister.nomeDaMae" id="m-nomedamae" type="text" required />

        <label for="periodoDeIngresso">Período Ingresso:</label>
        <select v-model="editedRegister.periodoDeIngresso" id="periodoDeIngresso" name="periodoDeIngresso">
          <option value="2023.1">2023.1</option>
          <option value="2023.2">2023.2</option>
          <option value="2024.1">2024.1</option>
          <option value="2024.2">2024.2</option>
        </select>

        <button @click="updateRegister" id="btnSalvar">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registers: [],
      showEditModal: false,
      editedRegister: {
        id: null,
        nome: "",
        dataDeNascimento: "",
        nomeDaMae: "",
        periodoDeIngresso: "2023.1",
      },
    };
  },
  methods: {
    loadData() {
      fetch("https://localhost:7275/api/estudantes")
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao obter os dados do back-end.');
          }
          return response.json();
        })
        .then(data => {
          this.registers = data;
        })
        .catch(error => {
          console.error(error.message);
        });
    },
    openEditModal(register) {
      this.editedRegister = { ...register };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editedRegister = {
        id: null,
        nome: "",
        dataDeNascimento: "",
        nomeDaMae: "",
        periodoDeIngresso: "2023.1",
      };
    },
    updateRegister() {
      const formData = {
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
          this.loadData();
          this.closeEditModal();
        })
        .catch(error => {
          console.error(error.message);
        });
    },
    deleteRegister(id) {
      const confirmDelete = confirm('Tem certeza que deseja excluir este cadastro?');

      if (confirmDelete) {
        fetch(`https://localhost:7275/api/estudantes/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao excluir o estudante do back-end.');
            }
            this.loadData();
          })
          .catch(error => {
            console.error(error.message);
          });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
