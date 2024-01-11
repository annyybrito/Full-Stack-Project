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
            <router-link :to="{ name: 'edit-register', params: { id: register.id } }" class="btn btn-primary" style="margin-right: 10px;">
              <i class='bx bxs-edit'></i> Editar
            </router-link>
            <button @click="confirmDelete(register.id)" class="btn btn-danger" style="margin-right: 10px;">
              <i class='bx bxs-trash'></i> Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de confirmação -->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar Exclusão</h5>
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
    <!-- Fim do modal de confirmação -->

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
    confirmDelete(id) {
      this.deleteCandidateId = id;
      document.getElementById('confirmDeleteModal').classList.add('show');
      document.getElementById('confirmDeleteModal').style.display = 'block';
    },
    cancelDelete() {
      // Lógica para cancelar a exclusão aqui, se necessário.
      // Por exemplo, limpar a variável deleteCandidateId.

      // Fechar o modal
      document.getElementById('confirmDeleteModal').classList.remove('show');
      document.getElementById('confirmDeleteModal').style.display = 'none';
    },
    deleteConfirmed() {
      const id = this.deleteCandidateId;
      document.getElementById('confirmDeleteModal').classList.remove('show');
      document.getElementById('confirmDeleteModal').style.display = 'none';

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
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
