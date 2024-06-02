import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./filmes.css"
import { toast } from "react-toastify";

function Filmes() {
  const { id } = useParams();
  const navigation = useNavigate();

  const [ filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "687890cb2d16b864f88d539e05fecc22",
          language: "pt-BR",
        }
      })
      /* sempre ver o que se pode tratar o erro esse aqui esta tratando para o usuario não acessar 
      o id de filme errado;
      */
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=> {
        navigation("/", { replace: true });
        return;
      })
    }
    loadFilme();
    /* aqui e desmontado o component*/
    return () => {

    }
  }, [navigation, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];
    /* some verifica se existe um item salvo na sua lista para não ter duplicidade */
    const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id);

    if(hasFilme){
      toast.warn("Esse filme já está na sua lista!")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")
  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>
          Carregando Detalhes...
        </h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filmes;