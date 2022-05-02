import React, { useState } from 'react';
import './App.css'
import bg_Desktop_Light from './components/bg-desktop-light.jpg'
import bg_Desktop_Dark from './components/bg-desktop-dark.jpg'
import TodoUi from './components/UI/TodoUi';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {
  const [Light,setLight] = useState(true)
  const Dark_Light = () => {
    setLight(prev => !prev)
    document.querySelector('.main').style.backgroundColor = !Light ? 'white' :'hsl(235, 21%, 11%)'
  }
  return (
    <DndProvider backend={HTML5Backend}>

    <div className='main'>
        <TodoUi onLight={Dark_Light}/>
      <img src={Light ? bg_Desktop_Light : bg_Desktop_Dark} alt='' />
    </div>
    </DndProvider>

  );
}

export default App;
