var timerId = null;

function iniciaJogo() {
    var url = window.location.search;

    // A função replace substitui partes inúteis por partes de código úteis!
    var nivel_jogo = url.replace("?", "");

    var tempo_segundos = 0;

    if (nivel_jogo == 1) {
        tempo_segundos = 120;
    }

    if (nivel_jogo == 2) {
        tempo_segundos = 60;
    }

    if (nivel_jogo == 3) {
        tempo_segundos = 30;
    }

    var qtde_baloes = 88;
    cria_baloes(qtde_baloes);

    document.getElementById('cronometro').innerHTML = tempo_segundos;
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1);
}

function cria_baloes(qtde_baloes) {
    for (var i = 1; i <= qtde_baloes; i++) {
        var balao = document.createElement("img");
        balao.src = 'imagens/icone_zumbi_inteiro.png';
        balao.style.margin = '5px';
        balao.style.width = '42px';
        balao.id = 'b' + i;
        balao.onclick = function () {estourar(this); morte_zumbie.play(); fundo_new.play()}
 
        // Adiciona um elemento filho.
        document.getElementById('cenario').appendChild(balao);
    }
}

function contagem_tempo(segundos) {
    segundos = segundos - 1;

    if (segundos == -1) {
        // Pare o jogo.
        clearTimeout(timerId);

        game_over();

        document.location.reload(true);

        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo(" + segundos + ")" , 1000)
}

function game_over() {
    alert("Fim de jogo. Você não conseguiu estourar todos os balões!");
}

function estourar(e) {
    var id_balao = e.id;

    document.getElementById(id_balao).src = 'imagens/icone_zumbi_estourado.png';
    document.getElementById(id_balao).setAttribute("onclick", "");

    pontuacao(-1);

    function pontuacao(acao) {
        var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
        var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
    
        baloes_inteiros = parseInt(baloes_inteiros);
        baloes_estourados = parseInt(baloes_estourados);

        baloes_inteiros = baloes_inteiros + acao;
        baloes_estourados = baloes_estourados - acao;

        document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
        document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

        situacaoJogo(baloes_inteiros);
    }

   

    function situacaoJogo(baloes_inteiros) {
        if (baloes_inteiros == 0) {
            alert("Parabéns, você ganhou o jogo!");
            pararJogo();
        }
    }

    function pararJogo() {
        music_fim_jogo.play();
        clearTimeout(timerId);
        reload;
    }
}

// Código do efeito sonoro:
    var morte_zumbie = new Audio;
    morte_zumbie.playbackRate = 0,1;
    morte_zumbie.src = 'souds/mort_mobs.mp3';
 


    var music_fim_jogo = new Audio;
    music_fim_jogo.src = 'souds/soundtrack.mp3'


    fundo_new = new Audio;
    fundo_new.src = 'souds/soundtrack.mp3';
    fundo_new.loop = true;

  

