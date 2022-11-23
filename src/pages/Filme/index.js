import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './filme-info.css';

import api from '../../services/api'

const Filme = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"915035f356ca8a8a45f1cb8e8fd2ff75",
                    language: "pt-BR"
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
              navigate("/",{ replace: true});
              return;
            })
        }

        loadFilme();
        
        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
          }
        }, [navigate, id])

        function salvarFilme(){
          const minhaLista = localStorage.getItem("@primeFlix");

          let filmesSalvos = JSON.parse(minhaLista) || [];

          const hasFilmes = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

          if (hasFilmes) {
            toast.warn("já possui esse filme");
            return;
          }

          filmesSalvos.push(filme);
          localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
          toast.success("salvo com sucesso")
        }
      
        if(loading){
          return(
            <div className="filme-info">
              <h1>Carregando detalhes...</h1>
            </div>
          )
        }
        
        return(
          <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avalição: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
              <button onClick={salvarFilme}>Salvar</button>
              <button>
                <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
                  Trailer
                </a>
              </button>
            </div>
          </div>
        )
}

export default Filme;