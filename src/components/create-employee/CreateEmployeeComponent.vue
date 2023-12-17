<template>
    <div class="container">
     <div class="card">
        <div class="card-header">
            <h3>Cadastro de Alunos</h3>
        </div>
        <div class="card-body">
         <form v-on:submit.prevent="">
            <div class="form-group mb-3">
                <label class="m-nome"><strong>Nome:</strong></label>
                <div class="col-sm-5">
                <input type="text" id="m-nome" class="form-control" required placeholder="Digite seu nome"/>
                </div>
            </div>

            <div class="form-group mb-3">
                <label class="m-dataDeNascimento mb-2"><strong>Data de Nascimento:</strong></label>
                <div class="col-sm-5">
                <input type="date" id="m-dateDeNascimento" class="form-control" required/>
            </div>
            </div>

            <div class="form-group mb-3">
                <label class="m-nomeDaMae mb-2"><strong>Nome da Mãe:</strong></label>
                <div class="col-sm-5">
                <input type="text" id="m-nomeDaMae" class="form-control" required />
            </div>
            </div>

            <div class="form-group mb-3">
                <label class="m-periodoDeIngresso mb-2"><strong>Período de Ingresso:</strong></label>
                <div class="col-sm-5">
            <select id="periodoDeIngresso" class="form-control" name="periodoDeIngresso">
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
export default {
    data() {
        return {

        };
    },
};

</script>