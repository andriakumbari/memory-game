import React, { useState } from 'react'
import '/src/App.css'
import GamePage from './GamePage';


const App = () => {

  const[ NumIconSetC , setNumIconSetC] = useState(null);
  const[ GridC , setGridC] = useState(null);
  const[ Redirect, setRedirect] = useState('StartMenu')
  const[ StartLoad, setStartLoad] = useState("disabled")

  const NumIconColChange = (NumIcID) => {
    setNumIconSetC(NumIcID);
  }

  const GridColChange = (GridID) => {
    setGridC(GridID)
  }

  const startMenuSelect = GridC !== null && NumIconSetC !== null
  




  return (
    <div>
      {Redirect === "StartMenu" ? (
      <div className='StartScreenDiv'>
        <p className='StartScreenTitle'>memory</p>
        <div className='StartScreenSettings'>
          <p className='SelectTheme'>Select Theme</p>
          <div className='NumbersIcons'>
            <div className={NumIconSetC === "numIcENum" ? "Numbers" : "NumbersNP"}
            onClick={() => setNumIconSetC("numIcENum")}>
              Numbers
            </div>
            <div className={NumIconSetC === "numIcEIc" ? "Icons" : "IconsNP"}
            onClick={() => setNumIconSetC("numIcEIc")}>
              Icons
            </div>
          </div>
          <div className='GridSelect'>
          <p className='GridSelectP'>Grid Size</p>
          <div className={GridC === "gridE6x6" ? "grid6x6" : "grid6x6NP"}
          onClick={() => setGridC("gridE6x6")}>6X6</div>
          </div>
          <div className={GridC === "gridE4x4" ? "grid4x4" : "grid4x4NP"}
          onClick={() => setGridC("gridE4x4")}>4X4</div>
          <div className={startMenuSelect ? "StartGame" : "StartGameNP"}
          onClick={() => setRedirect("GamePage")}>Start Game</div>
        </div>
      </div>
    ) : (
      <GamePage GridC={GridC} setGridC={setGridC}/>
    )}
    </div>  
  )
}

export default App
