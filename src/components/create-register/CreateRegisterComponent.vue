<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>Cadastro</h3>
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
              <select v-model="periodoDeIngresso" id="periodoDeIngresso" class="form-control" name="periodoDeIngresso" required>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import estudantesAPI from '../../requests/estudantes';

export default {
  setup() {
    const router = useRouter();
    const nome = ref("");
    const dataDeNascimento = ref("");
    const nomeDaMae = ref("");
    const periodoDeIngresso = ref("2023.1");

    const redirectToRegisterList = () => {
      router.push({ name: 'list-registers' });
    };

    const formatDate = (date) => {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      return formattedDate;
    };

    const saveRegister = async () => {
      const formData = {
        nome: nome.value,
        dataDeNascimento: formatDate(dataDeNascimento.value),
        nomeDaMae: nomeDaMae.value,
        periodoDeIngresso: periodoDeIngresso.value,
      };

      try {
        await estudantesAPI.create(formData);

        console.log('Dados enviados com sucesso!');
        clearForm();
        redirectToRegisterList();
      } catch (error) {
        console.error(`Erro ao enviar os dados para o back-end. Status: ${error.response.status}`);
      }
    };

    const clearForm = () => {
      nome.value = "";
      dataDeNascimento.value = "";
      nomeDaMae.value = "";
      periodoDeIngresso.value = "2023.1";
    };

    return {
      nome,
      dataDeNascimento,
      nomeDaMae,
      periodoDeIngresso,
      redirectToRegisterList,
      saveRegister,
      clearForm,
    };
  },
};
</script>
