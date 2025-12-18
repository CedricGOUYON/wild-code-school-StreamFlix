import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { Movie } from "../../types";
import "./StreamPage.css";

// --- TABLEAU DE FILMS EN DUR ---
const INITIAL_MOVIES = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    image: "https://fr.web.img6.acsta.net/c_310_420/medias/nmedia/18/72/34/14/19476654.jpg",
    toWatchLater: false,
  },
  {
    id: 2,
    title: "Interstellar",
    year: 2014,
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    toWatchLater: true,
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    image: "https://fr.web.img6.acsta.net/c_310_420/medias/nmedia/18/63/97/89/18949761.jpg",
    toWatchLater: false,
  },
  {
    id: 4,
    title: "Spider-Man: No Way Home",
    year: 2021,
    image: "https://fr.web.img2.acsta.net/c_310_420/pictures/21/11/16/10/01/4860598.jpg",
    toWatchLater: true,
  },
  {
    id: 5,
    title: "The Matrix",
    year: 1999,
    image: "https://fr.web.img4.acsta.net/c_310_420/medias/04/34/49/043449_af.jpg",
    toWatchLater: false,
  },
  {
    id: 6,
    title: "Pulp Fiction",
    year: 1994,
    image: "https://fr.web.img2.acsta.net/c_310_420/medias/nmedia/18/36/02/52/18846059.jpg",
    toWatchLater: false,
  },
  {
    id: 7,
    title: "Gladiator",
    year: 2000,
    image: "https://fr.web.img5.acsta.net/c_310_420/medias/nmedia/18/68/64/41/19254510.jpg",
    toWatchLater: true,
  },
  {
    id: 8,
    title: "Avatar: The Way of Water",
    year: 2022,
    image: "https://fr.web.img2.acsta.net/c_310_420/pictures/22/11/02/14/49/4565071.jpg",
    toWatchLater: false,
  },
  {
    id: 9,
    title: "The Wolf of Wall Street",
    year: 2013,
    image: "https://fr.web.img5.acsta.net/c_310_420/pictures/210/604/21060483_20131125114549726.jpg",
    toWatchLater: true,
  },
  {
    id: 10,
    title: "Blade Runner 2049",
    year: 2017,
    image: "https://fr.web.img2.acsta.net/c_310_420/pictures/17/08/24/15/18/597734.jpg",
    toWatchLater: false,
  },
  {
    id: 11,
    title: "Parasite",
    year: 2019,
    image: "https://fr.web.img5.acsta.net/c_310_420/pictures/20/02/12/13/58/3992754.jpg",
    toWatchLater: true,
  },
  {
    id: 12,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    image: "https://fr.web.img5.acsta.net/c_310_420/medias/nmedia/00/02/16/27/69218096_af.jpg",
    toWatchLater: false,
  },
  {
    id: 13,
    title: "Fight Club",
    year: 1999,
    image: "https://fr.web.img6.acsta.net/c_310_420/pictures/19/04/08/14/11/0688770.jpg",
    toWatchLater: false,
  },
  {
    id: 14,
    title: "The Godfather",
    year: 1972,
    image: "https://fr.web.img5.acsta.net/c_310_420/medias/nmedia/18/91/50/53/20148879.jpg",
    toWatchLater: true,
  },
  {
    id: 15,
    title: "Back to the Future",
    year: 1985,
    image: "https://fr.web.img6.acsta.net/c_310_420/pictures/22/07/22/15/00/2862661.jpg",
    toWatchLater: false,
  },
];

export default function MoviePage() {
  // On utilise le tableau initial comme point de départ
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [toWatchLater, setToWatchLater] = useState(false);
  const navigate = useNavigate();

  // Plus besoin de fetch sur le serveur !
  const fetchMovies = useCallback(async () => {
    console.log("Mode démo : Chargement des films statiques réussi");
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Ajouter un film (uniquement dans la mémoire du navigateur)
  const handleAdd = () => {
    if (!title || !year) {
      toast.error("Veuillez remplir au moins le titre et l'année");
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title: title.trim(),
      year: parseInt(year.trim()),
      image: image.trim() || "https://via.placeholder.com/150",
      toWatchLater,
    };

    setMovies([newMovie, ...movies]); // Ajoute le nouveau film en haut de la liste
    setTitle("");
    setYear("");
    setImage("");
    setToWatchLater(false);
    toast.success("Film ajouté !");
  };

  // Supprimer un film
  const handleDelete = (id: number) => {
    setMovies(movies.filter((m) => m.id !== id));
    toast.success("Film supprimé");
  };

  const handleEdit = (movie: Movie) => {
    setEditId(movie.id);
    setTitle(movie.title);
    setYear(movie.year.toString());
    setImage(movie.image);
    setToWatchLater(movie.toWatchLater ?? false);
  };

  // Modifier un film
  const handleUpdate = () => {
    setMovies(movies.map((m) => (m.id === editId ? { ...m, title, year: parseInt(year), image, toWatchLater } : m)));
    setEditId(null);
    setTitle("");
    setYear("");
    setImage("");
    setToWatchLater(false);
    toast.success("Film modifié !");
  };

  const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="movie-page">
      <h1>Ma bibliothèque StreamFlix</h1>
      <button type="button" onClick={handleGoBack} className="btn-back">
        ← Accueil
      </button>

      <div className="sticky-bar">
        <div className="search">
          <input type="text" placeholder="Rechercher un film..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="form">
          <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="number" placeholder="Année" value={year} onChange={(e) => setYear(e.target.value)} />
          <input type="text" placeholder="URL image" value={image} onChange={(e) => setImage(e.target.value)} />
          <label>
            <input type="checkbox" className="checkbox-custom" checked={toWatchLater} onChange={(e) => setToWatchLater(e.target.checked)} />À voir plus tard
          </label>

          {editId ? (
            <button type="button" onClick={handleUpdate}>
              Modifier le film
            </button>
          ) : (
            <button type="button" onClick={handleAdd}>
              Ajouter le film
            </button>
          )}
          <p className="selection hide-on-mobile">Voici une sélection, personnalisez votre bibliothèque !</p>
        </div>
      </div>

      <div className="movies">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.image ? <img src={movie.image} alt={movie.title} width="100" /> : <div>Pas d’image</div>}
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <p className={movie.toWatchLater ? "to-watch-later" : "watched"}>{movie.toWatchLater ? "À voir plus tard" : "Déjà vu"}</p>
            <div className="card-buttons">
              <button type="button" onClick={() => handleEdit(movie)}>
                Modifier
              </button>
              <button type="button" onClick={() => handleDelete(movie.id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
