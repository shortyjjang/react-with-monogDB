import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios';
import {PRODUCT_SERVER} from '../Config'

function ImageUpload(props) {
    const [uploadedImages, setImage] = useState([])
    const dropHandler  = (files) => {
        let formData = new FormData();
        let config = {header: {'content-type': 'multipart/form-data'}}
        formData.append('file', files[0])
        axios.post(`${PRODUCT_SERVER}/image`, formData, config)
            .then(res => {
                if(res.data.success) {
                    setImage([...uploadedImages, res.data.filePath])
                    props.updateImages([...uploadedImages, res.data.filePath])
                }else{
                    alert('파일 업로드에 실패했습니다.')
                }
            })
    }
    const deleteImage = (file) => {
      const currentImage = uploadedImages.indexOf(file)
      let newImages = [...uploadedImages];
      newImages.splice(currentImage,1)
      setImage(newImages);
      props.updateImages(newImages)
    }
  
    return (
      <>
        <Dropzone onDrop={dropHandler}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <div>
          {uploadedImages.map((it) => <img src={`http://localhost:5000/${it}`} onClick={deleteImage} key={it} alt="" />)}
        </div>
      </>
    )
}

export default ImageUpload;