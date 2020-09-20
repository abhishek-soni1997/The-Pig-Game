/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScores, activePlayer, gamePlaying, lastScore, winningScore;

init();

function init(){

    winningScore = prompt('Set a winning score ?');

    if( !(winningScore == undefined) ){
        gamePlaying = true;
    
    }else{
        gamePlaying = false;
    }
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector(".dice").style.display = 'none';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


// document.querySelector('#current-' + activePlayer).textContent = dice;
//OR
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//get the value of element in HTML
// var x = document.querySelector('#score-' + activePlayer).textContent;
// console.log(x);


document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){



        //1.Get a Random number 
        var dice = Math.floor(Math.random()*6) + 1;
        console.log(dice);

        //2. Display result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Update round score if the rolled number is not 1.
        if( dice === 1){
            changePlayer();
        }else{
            // Check if the player gets 2 6 in a row, then player looses its entire score.
            if( lastScore === 6 && dice === 6 ){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                lastScore = 0
                changePlayer();     
            }else{
                lastScore = dice;
                roundScores += dice;
                document.getElementById('current-' + activePlayer).textContent = roundScores;
            }
        }
        
    }
});


function changePlayer(){
    roundScores = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScores;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    document.querySelector(".dice").style.display = 'none';   
}


document.querySelector('.btn-hold').addEventListener('click', function(){

    if( gamePlaying ){

        //Add current score to global score
        scores[activePlayer] += roundScores;
        
        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player is won
        if( scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER !';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }else{
            //change player
            changePlayer();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);