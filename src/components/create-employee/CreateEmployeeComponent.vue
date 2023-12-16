<template>
    <div class="container">
     <div class="card">
        <div class="card-header">
            <h3>Cadastro de Alunos</h3>
        </div>
        <div class="card-body">
         <form v-on:submit.prevent="">
            <div class="form-group">
                <label class="m-nome"><strong>Nome:</strong></label>
                <input type="text" id="m-nome" class="form-control" required placeholder="Digite seu nome"/>
            </div>

            <div class="form-group">
                <label class="m-dataDeNascimento"><strong>Data de Nascimento:</strong></label>
                <input type="date" id="m-dateDeNascimento" class="form-control" required/>
            </div>

            <div class="form-group">
                <label class="m-nomeDaMae"><strong>Nome da Mãe:</strong></label>
                <input type="text" id="m-nomeDaMae" class="form-control" required />
            </div>


            <div class="form-group">
                <label class="m-periodoDeIngresso"><strong>Período de Ingresso:</strong></label>
            <select id="periodoDeIngresso" class="form-control" name="periodoDeIngresso">
                <option value="2023.1">2023.1</option>
                <option value="2023.2">2023.2</option>
                <option value="2024.1">2024.1</option>
                <option value="2024.2">2024.2</option>
          </select>
            </div>

            <div class="form-group">
                <button class="btn btn-primary" type="submit">+Adicionar</button>
            </div>
         </form>
        </div>
     </div>
     
    </div>

</template>

<script>
export default {
   

    data() {
        return {

        };
    },
};

</script>