/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_BASE_URL: "https://api.themoviedb.org/3/";
    readonly VITE_TMDB_ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDRkYmJiYjFmNzc1MzVmN2EzYTljMzM5MGZhOWY0YyIsIm5iZiI6MTY2NzgwMjM1Ni40NCwic3ViIjoiNjM2OGE0ZjRkMjA3ZjMwMDg3NDg5MzkzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.y3S4BXMPCnB-Z-QWQYp9xskU_grJzF2wqu99ezROUaU";
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }