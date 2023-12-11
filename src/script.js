
document.addEventListener('DOMContentLoaded', function () {
  const openModalButton = document.getElementById('new');
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  const saveButton = document.getElementById('btnSalvar');
  const tbody = document.querySelector('tbody');

  openModalButton.addEventListener('click', openModal);
  saveButton.addEventListener('click', saveData);

  let isEditing = false;

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
      id: document.getElementById('estudanteId').value,
      nome: document.getElementById('m-nome').value,
      dataDeNascimento: document.getElementById('m-dataDeNascimento').value,
      nomedamae: document.getElementById('m-nomedamae').value,
      periodoDeIngresso: document.getElementById('periodoDeIngresso').value,
    };

    if (formData.nome && formData.dataDeNascimento && formData.nomedamae && formData.periodoDeIngresso) {
      if (isEditing) {
        updateDataOnBackend(formData);
      } else {
        sendDataToBackend(formData);
      }
      
      isEditing = false;
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
      body: JSON.stringify(data),
    })

      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados para o back-end.');
        }
        console.log('Dados enviados com sucesso!');
        appendRow(data.id);
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  
  getDataFromBackend ()
  function getDataFromBackend() {
    fetch('https://localhost:7275/api/estudantes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

      .then(async response => {
        
        if (!response.ok) {
          throw new Error('Erro ao receber dados do back-end.');
        }
        appendRow(await response.json());
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  function updateDataOnBackend(data) {
    fetch(`https://localhost:7275/api/estudantes/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados atualizados para o back-end.');
        }
        console.log('Dados atualizados com sucesso!');
        getDataFromBackend();
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  window.editRow = function (button, id) {
    const row = button.closest('tr');
    const cells = row.getElementsByTagName('td');
    document.getElementById('m-nome').value = cells[0].innerText;
    document.getElementById('m-dataDeNascimento').value = cells[1].innerText;
    document.getElementById('m-nomedamae').value = cells[2].innerText;
    document.getElementById('periodoDeIngresso').value = cells[3].innerText;
    document.getElementById('estudanteId').value = id;
    isEditing = true;
    openModal();
  };

  window.deleteRow = function (button, id) {
    const row = button.closest('tr');
    const cells = row.getElementsByTagName('td');
    const idToDelete = cells[4].innerText;
    console.log(id);

    fetch('https://localhost:7275/api/estudantes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao obter a lista de estudantes');
        }
        return response.json();
      })
      .then(estudantes => {
        deleteEstudante(idToDelete, estudantes);
      })
      .catch(error => {
        console.error('Erro ao obter a lista de estudantes:', error.message);
      });
  };

  window.deleteEstudante = function (estudantesID) {
    fetch(`https://localhost:7275/api/estudantes/${estudantesID}`, {
      method: 'DELETE',
    })
      .then(async response => {
        if (!response.ok) {
          console.error('Erro ao excluir o estudante do back-end:', response.status, response.statusText);
          throw new Error('Erro ao excluir o estudante do back-end.');
        }
         getDataFromBackend();
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  function appendRow(estudantes) { 
    tbody.innerHTML = '';
    estudantes.forEach(estudante => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${estudante.nome}</td>
        <td>${estudante.dataDeNascimento.split('T')[0]}</td>
        <td>${estudante.nomeDaMae}</td>
        <td>${estudante.periodoDeIngresso}</td>
        <td class="acao"><button onclick="editRow(this,${estudante.id} )"><i class='bx bxs-edit'></i></button></td>
        <td class="acao"><button onclick="deleteEstudante(${estudante.id})"><i class='bx bxs-trash'></i></button></td>
      `;
      tbody.appendChild(newRow);
    })
    
  }
});
