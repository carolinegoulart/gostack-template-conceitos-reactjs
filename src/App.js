import React, { useState, useEffect } from 'react';
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // vamos aprender depois a usar async await com useEffect
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // envia requisição post com os dados, e salva em response
    // atualiza repositories
    const response = await api.post('/repositories', {
      title: "Repositório teste"
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const url = "/repositories/" + id;
    api.delete(url);
    const repositoriesUpdate = repositories.filter(repository => repository.id != id);
    setRepositories(repositoriesUpdate);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => 
            <li key={repository.id}>{repository.title} 
            <button onClick={() => handleRemoveRepository("123")}>Remover</button></li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
