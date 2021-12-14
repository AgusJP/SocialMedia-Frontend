import React, { useState, useRef, useCallback } from 'react';
import { useUpload } from '../../hooks/useUpload.js';
import { FormContainer, ImagePreview, MessagePreview, Description, Button } from './styles.js';

const Upload = () => {
  const inputFile = useRef(null);
  const inputDescription = useRef(null);

  const { error, loading, uploadPost, resetValues } = useUpload();

  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  //Disabled a true de primeras para controlar que no se pueda dar al botón sin rellenar los datos
  const [disabled, setDisabled] = useState(true);

  const handleUpload = useCallback((e) => {
    e.preventDefault();
    const dataImage = {
      file: inputFile.current.files[0],
      description
    };

    setDisabled(true);
    uploadPost(dataImage);
    
  },[description, uploadPost])

  const handleInputFile = useCallback((file) => {
    resetValues()
    
    if(file.target.files[0]){
      //Se crea una URL virtual para mostrar la imagen
      setImage(URL.createObjectURL(file.target.files[0]));
      setDisabled(false); 
    }else {
      setImage('');
    }

    inputDescription.current.focus();
  },[resetValues])

  const handleDescription = useCallback((e) => {
    setDescription(e.target.value);
  },[])

  return (
    <FormContainer onSubmit={handleUpload} encType="multipart/form-data">

      {image ? (
        <ImagePreview 
          src={image}
          title="image preview"
          onClick={() => inputFile.current.click()}
        />

      ): (
        <MessagePreview onClick={() => inputFile.current.click()}>
          Seleccione su fotografía
        </MessagePreview>
      )}

      <input
        ref={inputFile}
        type="file"
        onChange={handleInputFile}
        accept="image/*"
        style={{display: 'none'}}
      />

      <Description 
        placeholder="Descripción..."
        value={description}
        onChange={handleDescription}
        ref={inputDescription}
      ></Description>

      <Button type="submit" disabled={disabled} error={error}>
        {loading ? "Cargando..." : error ? "La imagen supera el tamaño permitido." : "Publicar"}
      </Button>
    </FormContainer>
  )
}

export default React.memo(Upload);