<template>
  <div>
    <nav class="navbar bg-primary" data-bs-theme="dark">
      <div class="container">
        <a class="navbar-brand order-md-last">Cadastro de Alunos Inspirali</a>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Cadastro de Informações</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/list-employees">Seus Cadastros</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mt-5">
       <router-view/>
    </div>
  </div>
</template>