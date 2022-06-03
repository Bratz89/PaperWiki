import React from 'react';
import TopBar from './comp/TopBar.js';
import PageView from './comp/PageView';
import './comp/DocumentPage.css'
function App() {

  return (
    <div className='example' style={{ display: "flex", flexDirection: "row", minHeight: "100%", minWidth: "100%" }}>

      <TopBar></TopBar>
      <div style={{ height: "100%", width: 70 }}></div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ width: "100%", height: 40 }}></div>
        <PageView></PageView>

      </div >
    </div>
  )
}

export default App;
