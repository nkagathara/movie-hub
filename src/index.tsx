import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./screens/HomePage";
import { MovieDetail } from "./screens/MovieDetail";
import { MovieList } from "./screens/MovieList";
import { TVShowsList } from "./screens/TVShowsList";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/tvshows" element={<TVShowsList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
