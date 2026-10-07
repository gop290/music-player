import React from "react";
import MusicPlayer from "../component/MusicPlayer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllSongs from "../component/AllSongs";
import { Playlists } from "../component/Playlists";
import { MusicProvider } from "../context/MusicContext";
import Navbar from "../component/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <MusicProvider>
          <div className="app">
            <Navbar />
            <main className="app-main">
              <main className="player-section">
                <MusicPlayer />
              </main>
              <main className="content-section">
                <Routes>
                  <Route path="/" element={<AllSongs />} />
                  <Route path="/playlists" element={<Playlists />} />
                </Routes>
              </main>
            </main>
          </div>
        </MusicProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
