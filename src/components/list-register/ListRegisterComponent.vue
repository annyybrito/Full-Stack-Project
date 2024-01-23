<template>
  <div class="row justify-content-center">
    <h3 class="col-8 mt-3 align-self-start">Alunos Cadastrados</h3>
    <div class="col-4 mb-3 mt-2 align-self-start text-right">
      <label for="searchName" class="sr-only"></label>
      <input type="text" v-model="searchName" @input="filterByName" class="form-control border-dark" id="searchName"
        placeholder="Pesquisar Nome" />
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
        <tr v-for="register in sortedRegisters" :key="register.id">
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

    <div class="modal" id="confirmDeleteModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Confirmar Exclusão</h5>
            
          </div>
          <div class="modal-body">
            Tem certeza que deseja excluir este cadastro?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelDelete">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteConfirmed">Excluir</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import estudantesAPI from '../../requests/estudantes';

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
      sortedRegisters: [],
    };
  },
  methods: {
    loadData() {
      estudantesAPI.getAll()
        .then(response => {
          this.sortedRegisters = response.data;
        })
        .catch(error => {
          console.error('Erro ao obter os dados do back-end.', error.message);
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

      const originalIndex = this.registers.findIndex(reg => reg.id === this.editedRegister.id);

      estudantesAPI.update(this.editedRegister.id, formData)
        .then(() => {
          console.log('Dados atualizados com sucesso!');
          this.loadData();
          this.closeEditModal();

          if (originalIndex !== -1) {
            this.registers.splice(originalIndex, 1);
            this.registers.unshift(this.editedRegister);
          }
        })
        .catch(error => {
          console.error('Erro ao enviar os dados atualizados para o back-end.', error.message);
        });
    },

    confirmDelete(id) {
      this.deleteCandidateId = id;
      document.getElementById('confirmDeleteModal').classList.add('show');
      document.getElementById('confirmDeleteModal').style.display = 'block';
    },
    cancelDelete() {
      document.getElementById('confirmDeleteModal').classList.remove('show');
      document.getElementById('confirmDeleteModal').style.display = 'none';
    },
    deleteConfirmed() {
      const id = this.deleteCandidateId;
      document.getElementById('confirmDeleteModal').classList.remove('show');
      document.getElementById('confirmDeleteModal').style.display = 'none';

      estudantesAPI.delete(id)
        .then(() => {
          console.log('Estudante excluído com sucesso!');
          this.loadData();
        })
        .catch(error => {
          console.error('Erro ao excluir o estudante do back-end.', error.message);
        });
    },
    filterByName() {
      const searchTerm = this.searchName.toLowerCase().trim();
      if (searchTerm === '') {
        this.loadData();
      } else {
        this.sortedRegisters = this.sortedRegisters.filter((sortedRegisters) =>
          sortedRegisters.nome.toLowerCase().includes(searchTerm)
        );
      }
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>
