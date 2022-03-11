import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios';

function ImageUpload(props) {
    const dropHandler  = (files) => {
        let formData = new FormData();
        let config = {header: {'content-type': 'multipart/form-data'}}
        formData.append('file', files[0])
        axios.post('http://localhost:5000/api/product/image', formData, config)
            .then(res => {
                if(res.data.success) {
                    console.log(res.data);
                }else{
                    alert('파일 업로드에 실패했습니다.')
                }
            })
    }
  
    return (
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
    )
}

export default ImageUpload;