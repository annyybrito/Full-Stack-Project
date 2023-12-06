document.addEventListener('DOMContentLoaded', function () {
  const openModalButton = document.getElementById('new');
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  const saveButton = document.getElementById('btnSalvar');
  const tbody = document.querySelector('tbody');

  openModalButton.addEventListener('click', openModal);
  saveButton.addEventListener('click', saveData);

  function openModal() {
    modalContainer.classList.add('active');
  }

  function closeModal() {
    modalContainer.classList.remove('active');
    clearForm();
  }

  function clearForm() {
    const form = modal.querySelector('form');
    form.reset();
  }

  function saveData(event) {
    event.preventDefault();
    const formData = {
      nome: document.getElementById('m-nome').value,
      dataDeNascimento: document.getElementById('m-dataDeNascimento').value,
      nomedamae: document.getElementById('m-nomedamae').value,
      periodoDeIngresso: document.getElementById('periodoDeIngresso').value,
    };


    if (formData.nome && formData.dataDeNascimento && formData.nomedamae && formData.periodoDeIngresso) {
      // Criação de uma nova linha na tabela
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${formData.nome}</td>
        <td>${formData.dataDeNascimento}</td>
        <td>${formData.nomedamae}</td>
        <td>${formData.periodoDeIngresso}</td>
        <td class="acao"><button onclick="editRow(this)"><i class='bx bxs-edit'></i></button></td>
        <td class="acao"><button onclick="deleteRow(this)"><i class='bx bxs-trash'></i></button></td>
      `;

      // Adiciona a nova linha à tabela
      tbody.appendChild(newRow);

      sendDataToBackend(formData);

      closeModal();
    } else {
      alert('Preencha todos os campos antes de salvar.');
    }
  }

  function sendDataToBackend(data) {
     fetch('https://localhost:7275/api/estudantes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados para o back-end.');
        }
        console.log('Dados enviados com sucesso!');
      })
      .catch(error => {
        console.error(error.message);
      }); 
  }

  window.editRow = function (button) {
    const row = button.closest('tr');
    const cells = row.getElementsByTagName('td');
    document.getElementById('m-nome').value = cells[0].innerText;
    document.getElementById('m-dataDeNascimento').value = cells[1].innerText;
    document.getElementById('m-nomedamae').value = cells[2].innerText;
    document.getElementById('periodoDeIngresso').value = cells[3].innerText;

    // Remove a linha editada da tabela
    tbody.removeChild(row);

    // Abre o modal para edição
    openModal();
  };

  window.deleteRow = function (button) {
    const row = button.closest('tr');
    tbody.removeChild(row);
  };
});
