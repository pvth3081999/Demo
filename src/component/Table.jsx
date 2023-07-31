import React, { useState } from 'react';
import DialogCreate from './DialogCreate';
import "./Table.css"

const Table = () => {
  const [ isOpenModel, setIsOpenModel] = useState(false)
  const handleOpenModel = () => {
    setIsOpenModel(!isOpenModel)
  }
  const data = {
    title: [
      {nameTitle: "Original Image", id:1},
      {nameTitle: "Drawn Image", id:2},
    ],
    content: [
      {imageOld: "Original Image 1", id: 1, imageNew: "Drawn image 1"},
      {imageOld: "Original Image 2", id: 2, imageNew: "Drawn image 2"},
    ]
  }
  return (
    <div >
      <div className='add-image'>
      <button className='buton-add-image' onClick={handleOpenModel}>Create image</button>
      </div>
      {
        isOpenModel && <DialogCreate onClose={handleOpenModel}/>
      }
      
      <table className='table-component' border={1}>
        <thead>
          <tr>
          {
            data.title.map((item)=> {
              return (
                <th key={item.id}>{item.nameTitle}</th>
              )
            })
          }
          </tr>
        </thead>
        <tbody>
            {
              data.content.map((item) => {
                return (
                  <tr key={item.id}>
                    <td >{item.imageOld}</td>
                    <td >{item.imageNew}</td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  );
};

export default Table;