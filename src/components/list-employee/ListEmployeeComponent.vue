<template>
  <div class="row justify-content-center">
    <h3>Seus Cadastros</h3>
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
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.nome }}</td>
          <td>{{ employee.dataDeNascimento.split('T')[0] }}</td>
          <td>{{ employee.nomeDaMae }}</td>
          <td>{{ employee.periodoDeIngresso }}</td>
          <td>
            <button @click="openEditModal(employee)"><i class='bx bxs-edit'></i> Editar</button>
            <button @click="deleteEmployee(employee.id)"><i class='bx bxs-trash'></i> Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de Edição -->
    <div v-if="showEditModal" class="modal fade show" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Aluno</h5>
            <button type="button" class="btn-close" @click="closeEditModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateEmployee">
              <div class="mb-3">
                <label for="edit-nome" class="form-label"><strong>Nome:</strong></label>
                <input v-model="editedEmployee.nome" type="text" class="form-control" id="edit-nome" required />
              </div>
              <div class="mb-3">
                <label for="edit-dataDeNascimento" class="form-label"><strong>Data de Nascimento:</strong></label>
                <input v-model="editedEmployee.dataDeNascimento" type="date" class="form-control" id="edit-dataDeNascimento" required />
              </div>
              <div class="mb-3">
                <label for="edit-nomeDaMae" class="form-label"><strong>Nome da Mãe:</strong></label>
                <input v-model="editedEmployee.nomeDaMae" type="text" class="form-control" id="edit-nomeDaMae" required />
              </div>
              <div class="mb-3">
                <label for="edit-periodoDeIngresso" class="form-label"><strong>Período de Ingresso:</strong></label>
                <select v-model="editedEmployee.periodoDeIngresso" class="form-control" id="edit-periodoDeIngresso" required>
                  <option value="2023.1">2023.1</option>
                  <option value="2023.2">2023.2</option>
                  <option value="2024.1">2024.1</option>
                  <option value="2024.2">2024.2</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
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
      employees: [],
      showEditModal: false,
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
    loadData() {
      fetch("https://localhost:7275/api/estudantes")
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao obter os dados do back-end.');
          }
          return response.json();
        })
        .then(data => {
          this.employees = data;
        })
        .catch(error => {
          console.error(error.message);
        });
    },
    openEditModal(employee) {
      this.editedEmployee = { ...employee };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editedEmployee = {
        id: null,
        nome: "",
        dataDeNascimento: "",
        nomeDaMae: "",
        periodoDeIngresso: "2023.1",
      };
    },
    updateEmployee() {
      const formData = {
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
          this.loadData();
          this.closeEditModal();
        })
        .catch(error => {
          console.error(error.message);
        });
    },
    deleteEmployee(id) {
      const confirmDelete = confirm('Tem certeza que deseja excluir este cadastro?');

      if (confirmDelete) {
        fetch(`https://localhost:7275/api/estudantes/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao excluir o estudante do back-end.');
            }
            this.loadData(); // Atualizar a lista de estudantes após a exclusão
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
