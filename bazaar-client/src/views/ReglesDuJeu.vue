<template>
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

  <span>
    <h1>Règles du jeu</h1>
  </span>
  <h2>Déroulement d’une partie</h2>
  <h3>Nombre de cartes : 55 cartes</h3>
  <ul>
    <li>6x Diamants</li>
    <li>6x Or</li>
    <li>6x Argent</li>
    <li>8x Tissus</li>
    <li>8x Epices</li>
    <li>10x Cuir</li>
    <li>11x Chameau</li>
  </ul>

  <h3>Nombre de jeton: 60 jetons</h3>
  <ul>
    <li>38 jetons marchandises</li>
    <ul>
      <li>5 jetons Diamants ( valeurs = 7 , 7 , 7 , 5 , 5)</li>
      <li>5 jetons Or ( valeurs = 6 , 6 , 5 , 5 , 5)</li>
      <li>5 jetons Argent ( valeur = 5 , 5 , 5 , 5 , 5)</li>
      <li>7 jetons Tissus ( valeur = 5 , 3 , 3 , 2 , 2 , 1 , 1)</li>
      <li>7 jetons Epices ( valeur = 5 , 3 , 3 , 2 , 2 , 1 , 1)</li>
      <li>9 jetons Cuir ( valeur = 4 , 3 , 2 , 1 , 1 , 1 , 1 , 1 , 1)</li>
    </ul>
    <li>1 jeton chameau (valeur = 5)</li>
    <li>18 jetons bonus</li>
    <ul>
      <li>
        7 jetons bonus 3 cartes vendues ( valeur = 3 , 3 , 2 , 2 , 2 , 1 , 1)
      </li>
      <li>6 jetons bonus 4 cartes vendues ( valeur = 6 , 6 , 5 , 5 , 4 , 4)</li>
      <li>5 jetons bonus 5 cartes vendues ( valeur = 10 , 10 , 9 , 8 , 8)</li>
    </ul>
    <li>3 sceaux d’Excellence</li>
  </ul>

  <h2>Au lancement de la partie</h2>
  <ul>
    <li>
      On pose 3 cartes chameau face visible, entre les deux joueurs, c’est la
      zone de marché
    </li>
    <li>On mélange les cartes restantes</li>
    <li>On distribue 5 cartes à chaque joueur</li>
    <li>
      Les cartes restantes sont posées face cachée et constituent une pioche
    </li>
    <li>
      On complète le marché avec les deux cartes du dessus de la pioche; Le
      marché doit toujours être constitué de 5 cartes.
    </li>
    <li>
      Chaque joueur regarde ses cartes, sort les cartes chameaux de sa main et
      les pose devant lui en une seule pile : cette zone est son enclos.
    </li>
    <li>
      On classe les jetons marchandises par types puis on les étales en cascade
      (afin que tous le monde puisse voir les valeurs des jetons) de manière
      croissante de sorte que les plus grandes valeurs soient récupérés en
      premiers.
    </li>
    <li>
      On trie les jetons bonus par type puis on les mélanges entre eux et on les
      poses en 3 piles
    </li>
    <li>Le jeton chameau est posé à côté des jetons bonus</li>
    <li>
      Les 3 sceaux d’excellences sont posés sur le côté, chaque joueur
      remportant une manche récupère un jeton, le 1er joueur ayant 2 jeton gagne
      la partie.
    </li>
  </ul>

  <div>Le jeu peut débuter.</div>
  <br />
  <div>Le joueur qui jouera le premier est déterminé au hasard.</div>

  <h2>Tour de jeu</h2>

  <div>
    Pendant son tour de jeu, on a le choix entre une des deux actions (pas les
    deux en même temps):
  </div>
  <ul>
    <li>
      Prendre des cartes : On peut prendre des cartes situé dans le marché, on a
      3 options:
      <ul>
        <li>
          Prendre plusieurs marchandises ( = troc) : On prend les cartes qui
          nous intéresses (elles peuvent être de type différents), puis on
          complète le marché avec des cartes de notre main ou des chameaux de
          notre enclos ( ou les deux),
        </li>
        <li>
          Prendre une seule marchandise : On prend la carte du marché qu’on
          rajoute dans sa main puis on complète avec la première carte de la
          pioche,
        </li>
        <li>
          Prendre tous les chameaux : On prend tous les chameaux du marché et on
          les pose dans son enclos puis on complète le marché avec les cartes du
          dessus de la pioche.
        </li>
      </ul>
    </li>
    <h3>Attention:</h3>
    <ul>
      <li>
        on ne peut prendre que des marchandises ou des chameaux, pas les deux en
        même temps
      </li>
      <li>
        on ne peut pas prendre puis déposé une carte du même type lors d’un troc
      </li>
      <li>on ne peut pas faire un troc pour une carte ( minimum 2)</li>
      <li>
        à la fin de son tour un joueur ne peut pas avoir plus de 7 cartes dans
        sa main
      </li>
    </ul>
  </ul>

  <ul>
    <li>
      Vendre des cartes : la vente se fait en 3 étapes:
      <ul>
        <li>
          vendez autant de marchandises du même type que souhaité en les posant
          face ouverte sur la défausse, ( attention on ne peut vendre qu’un seul
          type de marchandise par tour de jeu)
          <ul>
            <li>
              Pour les 3 marchandises les plus chères ( Diamants, Or et Argent),
              on doit vendre obligatoirement au minimum 2 cartes, même lorsqu’il
              ne reste plus qu’un seul jeton
            </li>
          </ul>
        </li>
        <li>
          Prenez le même nombre de jetons du même type que le nombre de carte
          défaussés (en commençant par le haut de la rangé, c'est à dire les
          jetons de plus grandes valeurs)
        </li>
        <li>
          En plus selon le nombre de carte vendues, on récupère éventuellement
          un jeton bonus:
          <ul>
            <li>Si 3 cartes vendues, on récupère un jeton 3 carte vendues</li>
            <li>Si 4 cartes vendues, on récupère un jeton 4 carte vendues</li>
            <li>Si 5 cartes vendues, on récupère un jeton 5 carte vendues</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

  <div>Puis c’est au tour de votre adversaire de jouer.</div>

  <h2>Fin d’une manche</h2>

  <div>Une manche se termine dans deux cas :</div>
  <ul>
    <li>Soit quand 3 types de jetons de marchandises sont épuisés</li>
    <li>
      Soit quand la pioche est épuisée et qu’il manque des cartes pour compléter
      le marché
    </li>
  </ul>
  <div>
    On peut alors déterminer le gagnant en fonction du nombre de roupies que le
    joueur possède ( la valeur de chaque jeton correspond à sa valeur en
    roupie).
  </div>
  <ul>
    <li>
      Le joueur ayant le plus de chameau dans son enclos gagne le jeton chameau
      d’une valeur de 5 roupies.
    </li>
  </ul>
  <div>
    Le joueur ayant le plus de roupies est déclaré vainqueur. Si il y a égalité,
    alors le joueur possédant le nombre le plus élevé de jeton bonus est déclaré
    vainqueur. Si il y a encore égalité, alors le joueur possédant le plus de
    jetons marchandise est déclaré vainqueur. Si il y a encore égalité, alors le
    joueur possédant le jeton chameau est déclaré vainqueur.
  </div>
  <br />
  <div>Le joueur remportant la manche gagne un jeton sceau d’Excellence.</div>
  <br />
  <div>
    Si aucun des joueurs ne possède deux sceaux d’Excellence, alors on
    recommence une manche et le joueur ayant perdu la manche précédente
    commence.
  </div>
  <h2>Fin de partie</h2>
  <div>
    Le premier joueur possédant deux sceaux d’Excellence remporte la partie.
  </div>
</template>

<script>
export default {
  name: "ReglesDujeu",
};
</script>

<style>
h1 {
  text-align: center;
  font-family: sans-serif;
}
h2 {
  text-align: center;
  text-decoration: underline;
  font-family: sans-serif;
}
h3 {
  font-family: sans-serif;
}
div {
  font-family: sans-serif;
}
ul {
  font-family: sans-serif;
}
li {
  font-family: sans-serif;
}
body {
  background-color: #408070;
}
</style>