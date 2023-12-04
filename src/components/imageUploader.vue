<template>
    <div>
      <h1>Cargar Imagen</h1>
      <form @submit.prevent="handleSubmit">
        <label for="imagen">Selecciona una imagen:</label>
        <input type="file" ref="fileInput" accept=".jpg, .jpeg, .png" @change="handleFileChange" required>
        <br>
        <button type="submit">Cargar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Importa axios aquí
  
  export default {
    data() {
      return {
        selectedFile: null,
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      handleSubmit() {
        const formData = new FormData();
        formData.append('imagen', this.selectedFile);
  
        axios.post('http://localhost:3001/cargar-imagen', formData) // Usa axios directamente aquí
          .then(response => {
            console.log(response.data);
            // Puedes realizar acciones adicionales después de cargar la imagen
          })
          .catch(error => {
            console.error('Error al cargar la imagen:', error);
          });
      },
    },
  };
  </script>

<style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    font-size: 16px;
    margin-bottom: 10px;
    display: block;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }

  button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #45a049;
  }
</style>