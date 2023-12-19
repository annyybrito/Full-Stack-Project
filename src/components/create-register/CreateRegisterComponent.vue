<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Cadastro de Alunos</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveRegister">
          <div class="form-group mb-3">
            <label for="m-nome"><strong>Nome:</strong></label>
            <div class="col-sm-5">
              <input v-model="nome" type="text" id="m-nome" class="form-control" required placeholder="Digite seu nome" />
            </div>
          </div>

          <div class="form-group mb-3">
            <label for="m-dataDeNascimento"><strong>Data de Nascimento:</strong></label>
            <div class="col-sm-5">
              <input v-model="dataDeNascimento" type="date" id="m-dataDeNascimento" class="form-control" required />
            </div>
          </div>

          <div class="form-group mb-3">
            <label for="m-nomeDaMae"><strong>Nome da Mãe:</strong></label>
            <div class="col-sm-5">
              <input v-model="nomeDaMae" type="text" id="m-nomeDaMae" class="form-control" required />
            </div>
          </div>

          <div class="form-group mb-3">
            <label for="periodoDeIngresso"><strong>Período de Ingresso:</strong></label>
            <div class="col-sm-5">
              <select v-model="periodoDeIngresso" id="periodoDeIngresso" class="form-control" name="periodoDeIngresso"
                required>
                <option value="2023.1">2023.1</option>
                <option value="2023.2">2023.2</option>
                <option value="2024.1">2024.1</option>
                <option value="2024.2">2024.2</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <button class="btn btn-primary" type="submit"> + Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const redirectToRegisterList = () => {
      router.push({ name: 'list-registers' });
    };

    return {
      redirectToRegisterList,
    };
  },
  data() {
    return {
      nome: "",
      dataDeNascimento: "",
      nomeDaMae: "",
      periodoDeIngresso: "2023.1",
    };
  },
  methods: {
    formatDate(date) {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      return formattedDate;
    },
    saveRegister() {
      const formData = {
        nome: this.nome,
        dataDeNascimento: this.formatDate(this.dataDeNascimento),
        nomeDaMae: this.nomeDaMae,
        periodoDeIngresso: this.periodoDeIngresso,
      };

      fetch("https://localhost:7275/api/estudantes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro ao enviar os dados para o back-end. Status: ${response.status}`);
          }
          console.log('Dados enviados com sucesso!');
          this.$emit('update-list');
          this.clearForm();
          this.redirectToRegisterList();
        })
        .catch(error => {
          console.error(error.message);
        });
    },
    clearForm() {
      this.nome = "";
      this.dataDeNascimento = "";
      this.nomeDaMae = "";
      this.periodoDeIngresso = "2023.1";
    },
  },
};
</script>
