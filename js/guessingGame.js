// var game = function () {
    var guesses = [];
	var playersGuess="";

	$(document).ready(function() {
		$("#guess").focus();
		$("#guess").keyup(function(event){
		    if(event.keyCode == 13){
		        $("#submit").click();
		    }
		});
	});

	/* **** Guessing Game Functions **** */

	// Generate the Winning Number

	function generateWinningNumber(){
		return Math.floor(Math.random()*100 + 1);
	}

	var winningNumber = generateWinningNumber();

	function guessCount(){
		if (guesses.indexOf(playersGuess)===-1){
		    guesses.push(playersGuess);
		    if (guesses.length === 4){
				$('#remaining').text("You have 1 guess left");
			} else {
				$('#remaining').text("You have "+(5-guesses.length)+" guesses left");
			}
	    } else {
			$('#status').text("You already guessed that number. Try again!");
		}	
	}

	// Fetch the Players Guess

	function playersGuessSubmission(){
		playersGuess=parseInt($('#guess').val());
		if (isNaN(playersGuess) || playersGuess < 1 || playersGuess > 100 ) {
		    $('.alert-danger').css("display", "block");
		    $('#guess').val('');
		    return false;
		} else {
			$('.alert-danger').css("display", "none");
			if (guesses.length < 4){
			    $('#guess').val('');
			    $("#guess").focus();
			    guessCount();
			    checkGuess();
			} else {
				$('#remaining').text("You lost. Please restart the game.");
				$('#lost').css("display", "block");
				$('#guess').val('');
				cleanUp();	
			}
		}
	}

	function cleanUp(){
		$('#status').text("");
		$('#guess').hide();
		$('#hint').hide();
		$('#submit').hide();
		$('#hintText').hide();
		$('#restart').addClass('btn-danger');
	}

	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(){
		if (playersGuess < winningNumber+5 && playersGuess > winningNumber-5){
			if (playersGuess < winningNumber){
				$('#status').text("Very Hot! Try a higher number!");
			} else{
				$('#status').text("Very Hot! Try a lower number!");
			}
		} else if (playersGuess < winningNumber+10 && playersGuess > winningNumber-10){
			if (playersGuess < winningNumber){
				$('#status').text("You are warm! Try a higher number!");
			} else{
				$('#status').text("You are warm! Try a lower number!");
			}
		} else {
			if (playersGuess < winningNumber){
				$('#status').text("You are cold! Try a higher number!");
			} else{
				$('#status').text("You are cold! Try a lower number!");
			}
		}
	}

	// Check if the Player's Guess is the winning number 

	function checkGuess(){
	    if (playersGuess === winningNumber){
			$('#remaining').text("You Win! Congratulations!");
			$('#win').css("display", "block");
			$('#hintText').text("It took you "+guesses.length+" guesses");
			cleanUp();
		} else {
			lowerOrHigher();
		}	
	}

	// Create a provide hint button that provides additional clues to the "Player"

	function provideHint(){
		var hintTopRange = winningNumber + Math.floor(Math.random()*20 + 1);
		if (hintTopRange > 100){
			hintTopRange = 100;
		}
		var hintLowRange = hintTopRange-40;
		if (hintLowRange < 1){
			hintLowRange = 1;
			hintTopRange = 41;
		}
		$('#hintText').text("The number is between "+hintLowRange+" and "+hintTopRange);
		$('#hint').remove();
	}

	// Allow the "Player" to Play Again

	function playAgain(){
		location.reload();
	}

// }();