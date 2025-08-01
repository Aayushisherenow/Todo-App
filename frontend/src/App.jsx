import { useState } from 'react'

import './App.css'
// import Input from './components/input'
// import Button from './components/button'

function App() {

  return (
    <>
      <div className='container mx-auto p-4 bg-purple-300 display-flex flex-col items-center justify-center min-h-screen'>

         <div className="bg-gray-700 min-w-full ">
            <h1 className="text-4xl font-bold justify-center text-center text-white p-4">
              Todo app
            </h1>
      </div>

      <div className="bg-gray-200 w-auto h-auto mx-10 mt-20">
        <input type="text" placeholder="Add a new task" className="p-2 m-4 border rounded w-3/4" />
        <button className="bg-green-500 text-white p-2 rounded m-4">
          Add
          </button>
          <button className="bg-blue-500 text-white p-2 rounded m-4">
          Edit
          </button>
          <button className="bg-red-500 text-white p-2 rounded m-4">
          Delete
        </button>
      </div>

      </div>
     
            
    </>
  )

}


export default App
