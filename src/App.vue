<template>
  <div>
    <nav class="navbar bg-primary" data-bs-theme="dark">
      <div class="container d-flex justify-content-between align-items-center">
       
        <a class="navbar-brand" href="/">
          <img src="../src/assets/inspirali-logo.png" alt="Logo Inspirali" style="height: 40px;">
        </a>
        <a class="navbar-brand ml-43">Cadastro de Alunos Inspirali</a>
        <ul class="navbar-nav" style="margin-left:650px; gap:;">
          <li class="nav-item">
            <router-link class="nav-link" to="/" style="color: white;">Cadastrar Alunos</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/list-employees" style="color:white; margin-left: 15px;">Alunos Cadastrados</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mt-5">
       <router-view/>
    </div>
  </div>
</template>