<template>
  <div class="rules">
    <div class="sortir">
      <router-link to="/">
        <svg
          class="bouton_maison"
          width="36"
          height="35"
          viewBox="0 0 36 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.2004 14L31.9498 18.375L28.2004 14ZM28.2004 22.75L31.9498 18.375L28.2004 22.75Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M29.7 18.375H18M7.19995 6.125H23.4M7.19995 30.625H23.4M23.4 6.125V13.125M23.4 23.625V30.625M7.19995 6.125V30.625"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </router-link>
    </div>
    <div class="container">
      <span>
        <h1>Règles du jeu</h1>
      </span>
      <h2>Déroulement d’une partie</h2>
      <h3>Nombre de cartes : 55 cartes</h3>
      <ul class="cards">
        <li class="text_card">6x Diamants</li>
        <img class="card" src="../assets/Ruby_card.png" alt="" />
        <li class="text_card">6x Or</li>
        <img class="card" src="../assets/Gold_card.png" alt="" />
        <li class="text_card">6x Argent</li>
        <img class="card" src="../assets/Silver_card.png" alt="" />
        <li class="text_card">8x Tissus</li>
        <img class="card" src="../assets/Carpet_card.png" alt="" />
        <li class="text_card">8x Epices</li>
        <img class="card" src="../assets/Spices_card.png" alt="" />
        <li class="text_card">10x Cuir</li>
        <img class="card" src="../assets/Leather_card.png" alt="" />
        <li class="text_card">11x Chameaux</li>
        <img class="card" src="../assets/Camel_card.png" alt="" />
      </ul>

      <h3>Nombre de jeton: 60 jetons</h3>
      <ul>
        <li>38 jetons marchandises</li>
        <ul class="jetons">
          <li class="text_jeton">
            5 jetons Diamants <br />
            ( valeurs = 7, 7, 7, 5, 5 )
          </li>
          <img class="jeton" src="../assets/Ruby_coin-7.png" alt="" />
          <li class="text_jeton">
            5 jetons Or <br />
            ( valeurs = 6, 6, 5, 5, 5 )
          </li>
          <img class="jeton" src="../assets/Gold_coin-6.png" alt="" />
          <li class="text_jeton">
            5 jetons Argent <br />
            ( valeur = 5, 5, 5, 5, 5 )
          </li>
          <img class="jeton" src="../assets/Silver_coin.png" alt="" />
          <li class="text_jeton">
            7 jetons Tissus <br />
            ( valeur = 5, 3, 3, 2, 2, 1, 1 )
          </li>
          <img class="jeton" src="../assets/Carpet_coin-3.png" alt="" />
          <li class="text_jeton">
            7 jetons Epices <br />
            ( valeur = 5, 3, 3, 2, 2, 1, 1 )
          </li>
          <img class="jeton" src="../assets/Spice_coin-3.png" alt="" />
          <li class="text_jeton">
            9 jetons Cuir <br />
            ( valeur = 4, 3, 2, 1, 1, 1, 1, 1, 1 )
          </li>
          <img class="jeton" src="../assets/Leather_coin-2.png" alt="" />
        </ul>

        <li>19 jetons bonus</li>
        <ul class="jetons_bonus">
          <li class="text_bonus">
            7 jetons bonus 3 cartes vendues <br />
            ( valeur = 3 , 3 , 2 , 2 , 2 , 1 , 1)
          </li>
          <img class="jeton_bonus" src="../assets/3_cards_coin.png" alt="" />
          <li class="text_bonus">
            6 jetons bonus 4 cartes vendues <br />
            ( valeur = 6 , 6 , 5 , 5 , 4 , 4)
          </li>
          <img class="jeton_bonus" src="../assets/4_cards_coin.png" alt="" />
          <li class="text_bonus">
            5 jetons bonus 5 cartes vendues <br />
            ( valeur = 10 , 10 , 9 , 8 , 8)
          </li>
          <img class="jeton_bonus" src="../assets/5_cards_coin.png" alt="" />
          <li class="text_bonus">1 jeton chameau (valeur = 5)</li>
          <img class="jeton_bonus" src="../assets/Camel_coin.png" alt="" />
        </ul>
        <div class="excellence">
          <li class="text_excellence">3 sceaux d’Excellence</li>
          <img
            class="jeton_excellence"
            src="../assets/Merchant-coin.png"
            alt=""
          />
        </div>
      </ul>

      <h2>Au lancement de la partie</h2>
      <img class="board" src="../assets/board.png" alt="" />
      <ul>
        <li class="regles">
          On pose 3 cartes chameau face visible, entre les deux joueurs, c’est la
          zone de marché.
        </li>
        <li class="regles">
          On mélange les cartes restantes puis on distribue 5 cartes à chaque
          joueur, les cartes restantes sont posées face cachée et constituent une
          pioche.
        </li>
        <li class="regles">
          On complète le marché avec les deux cartes du dessus de la pioche puis
          on complète le marché à chaque que c'est nécessaire de telle manière que
          le marché soit toujours constitué de 5 cartes.
        </li>
        <li class="regles">
          Chaque joueur regarde ses cartes, sort les cartes chameaux de sa main et
          les pose devant lui en une seule pile : cette zone est son enclos.
        </li>
        <li class="regles">
          On classe les jetons marchandises par types puis on les étales de
          manière croissante de sorte que les plus grandes valeurs soient
          récupérés en premiers.
        </li>
        <li class="regles">
          On trie les jetons bonus par type puis on les mélanges entre eux et on
          les poses sur le côté avec le jeton chameau et les 3 sceaux
          d'Excellences.
        </li>
      </ul>

      <div>La manche peut alors débuter.</div>
      <br />
      <div>
        Pour la première manche, le joueur qui jouera le premier est déterminé au
        hasard.
      </div>

      <h2>Tour de jeu</h2>

      <div>Pendant son tour de jeu, on a le choix entre deux actions :</div>
      <ul>
        <li>
          <strong>Prendre des cartes</strong> : On peut prendre des cartes situé
          dans le marché, on a 3 options:
          <ul>
            <li class="regles">
              <u>Prendre tous les chameaux</u>: On prend tous les chameaux du
              marché et on les pose dans son enclos.
            </li>
            <li class="regles">
              <u>Prendre une seule marchandise</u>: On prend une carte du marché
              qu’on ajoute à sa main.
            </li>
            Dans les deux premiers cas, on complète le marché avec les cartes du
            dessus de la pioche.
            <br />
            <li class="regles">
              <u>Prendre plusieurs marchandises</u>: Aussi appelé troc, on prend
              les cartes qui nous intéressent (elles peuvent être de type
              différents), puis on complète le marché avec des cartes de notre
              main ou des chameaux de notre enclos (une combinaison des deux est
              possible).
            </li>
            <h3><u>Attention</u>:</h3>
            <ul>
              <li class="regles">
                On ne peut prendre que des marchandises ou des chameaux, pas les
                deux en même temps
              </li>
              <li class="regles">
                On ne peut pas prendre puis déposé une carte du même type lors
                d’un troc
              </li>
              <li class="regles">
                On ne peut pas faire un troc pour une seul carte
              </li>
              <li class="regles">
                À la fin de son tour un joueur ne peut pas avoir plus de 7 cartes
                dans sa main
              </li>
            </ul>
          </ul>
        </li>
      </ul>

      <ul>
        <li class="regles">
          <strong>Vendre des cartes</strong> : La vente se fait en 3 étapes:
          <ul>
            <li class="regles">
              On vend autant de marchandise du même type que l'on souhaite en les
              posant face ouverte sur la défausse. <br />
              <u>Attention</u> : on ne peut vendre qu’un seul type de marchandise
              par tour et pour les 3 marchandises les plus chères (Diamants, Or et
              Argent), on doit obligatoirement vendre au minimum 2 cartes, même
              lorsqu’il ne reste plus qu’un seul jeton.
            </li>
            <li>
              On prend le même nombre de jetons du type de carte vendue que le
              nombre de carte défaussés.
            </li>
            <li class="regles">
              Selon le nombre de cartes vendues, on récupère éventuellement un
              jeton bonus:
              <ul>
                <li>
                  Si 3 cartes vendues, on récupère un jeton bonus 3 carte vendues
                </li>
                <li>
                  Si 4 cartes vendues, on récupère un jeton bonus 4 carte vendues
                </li>
                <li>
                  Si 5 cartes vendues, on récupère un jeton bonus 5 carte vendues
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <div>
        Une fois votre action terminé, c'est au tour de votre adversaire de jouer.
      </div>

      <h2>Fin d’une manche</h2>

      <div>Une manche se termine dans deux cas :</div>
      <ul>
        <li class="regles">
          Soit quand 3 types de jetons de marchandises sont épuisés
        </li>
        <li class="regles">
          Soit quand la pioche est épuisée et qu’il manque des cartes pour
          compléter le marché
        </li>
      </ul>
      <div>
        On peut alors déterminer le gagnant en fonction du nombre de roupies que
        le joueur possède ( la valeur de chaque jeton correspond à sa valeur en
        roupie).
      </div>
      <div class="regles">
        Le joueur ayant le plus de chameau dans son enclos gagne le jeton chameau
      d’une valeur de 5 roupies. En cas d'égalité, aucun des joueurs ne remporte le jeton.
      </div>
      <div class="regles">
        Le joueur ayant le plus de roupies est déclaré vainqueur. Si il y a
        égalité, alors le joueur possédant le nombre le plus élevé de jeton bonus
        est déclaré vainqueur. Si il y a encore égalité, alors le joueur possédant
        le plus de jetons marchandise est déclaré vainqueur. Si il y a encore
        égalité, alors le joueur possédant le jeton chameau est déclaré vainqueur.
      </div>
      <br />
      <div>Le joueur remportant la manche gagne un jeton sceau d’Excellence.</div>
      <br />
      <div>
        Si aucun des joueurs ne possède deux sceaux d’Excellence, alors on
        recommence une manche et le joueur ayant perdu la manche précédente
        commence la nouvelle manche en premier.
      </div>
      <h2>Fin de partie</h2>
      <div>
        Le premier joueur possédant deux sceaux d’Excellence remporte la partie.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReglesDujeu",
};
</script>

<style>
/*.rules ul {
  padding-left: 0;
  list-style: none;
}*/

.container {
  padding: 1rem;
  left: 5%;
  right: 5%;
  position: absolute;
  background-color: white;
  color: black;
  top: 20%;
  border-radius: 1rem 1rem 0rem 0rem;
}
h1 {
  text-align: center;
}
h2 {
  text-align: center;
  text-decoration: underline;
}
body {
  background-color: #408070;
}
.card {
  justify-self: self-end;
  width: 40%;
  margin-bottom: 0.5rem;
}
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 2rem;
  gap: .5rem;
}
.text_card {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
.jeton {
  width: 35%;
  margin: 0.5rem;
  justify-self: self-end;
}
.jetons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 2rem;
  gap: .5rem;
}
.text_jeton {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
.jeton_bonus {
  width: 35%;
  margin: 0.5rem;
  justify-self: self-end;
}
.jetons_bonus {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 2rem;
  gap: .5rem;
}
.text_bonus {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
.excellence{
  display: flex;
}
.jeton_excellence{
  width: 8%;
  margin: 0 0 0 4.5rem;
}
.text_excellence{
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
.board{
  width: 100%;
}

@media (min-width: 640px) { 
  .container {
    padding: 1rem 5rem 3rem 5rem;
    left: 10%;
    right: 10%;
  }

  .card {
    justify-self: self-start;
  }

  .cards {
    grid-template-columns: repeat(4, 1fr);
  }

  .jeton {
    justify-self: self-start;
  }

  .jetons {
    grid-template-columns: repeat(4, 1fr);
  }

  .jeton_bonus {
    justify-self: self-start;
  }

  .jetons_bonus {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>