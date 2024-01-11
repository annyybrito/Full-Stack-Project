<template>
  <div class="row justify-content-center">
  <h3 class="col-8 mt-3 align-self-start">Alunos Cadastrados</h3>
  <div class="form-group col-4 mb-3 mt-2 align-self-start">
    <label for="searchName" class="sr-only"></label>
    <input type="text" v-model="searchName" @input="filterByName" class="form-control border-dark" id="searchName" placeholder="Pesquisar nome" />
  </div>

    <table class="table col-12">
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
            <button @click="confirmDelete(register.id)" class="btn btn-danger" style="margin-right: 10px;">
              <i class='bx bxs-trash'></i> Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar Exclusão</h5>
          </div>
          <div class="modal-body">
            Tem certeza que deseja excluir este cadastro?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelDelete">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteConfirmed">Excluir</button>
          </div>
        </div>
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
      deleteCandidateId: null,
      searchName: "", 
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
          return response.json(); 
        })
        .then(updatedData => {
          const currentIndex = this.registers.findIndex(student => student.id === updatedData.id);

          if (currentIndex !== -1) {
            this.$set(this.registers, currentIndex, updatedData);
          }
        })
        .then(() => {
          this.closeEditModal();
        })
        .catch(error => {
          console.error(error.message);
        });
    },
    confirmDelete(id) {
      this.deleteCandidateId = id;
      document.getElementById('confirmDeleteModal').classList.add('show');
      document.body.classList.add('modal-open');
    },
    cancelDelete() {
      this.deleteCandidateId = null;
      document.getElementById('confirmDeleteModal').classList.remove('show');
      document.body.classList.remove('modal-open');
    },
    deleteConfirmed() {
      if (this.deleteCandidateId) {
        console.log(`Excluir registro com ID: ${this.deleteCandidateId}`);
        this.registers = this.registers.filter(register => register.id !== this.deleteCandidateId);
        this.deleteCandidateId = null;
        document.getElementById('confirmDeleteModal').classList.remove('show');
        document.body.classList.remove('modal-open');
      }
    },
    filterByName() {
      if (!this.searchName) {
        this.loadData();
      } else {
        const filteredRegisters = this.registers.filter(register =>
          register.nome.toLowerCase().includes(this.searchName.toLowerCase())
        );
        this.registers = filteredRegisters;
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
