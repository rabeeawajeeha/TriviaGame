var triviaQuestions = [{
	question: "1. What fruit must one tickle in order to gain access to the kitchens?",
	answerList: ["Grape", "Orange", "Banana", "Pear"],
	answer: 3
},{
	question: "2. How many broomsticks are flown in a full game of Quidditch?",
	answerList: ["Two hundred and sixty seven", "Fifteen", "Sixteen", "Fourteen"],
	answer: 1
},{
	question: "3. When Was Harry Born?",
	answerList: ["31st July 1899", "31st July 1980", "31st July 1981", "30th July 1881"],
	answer: 1
},{
	question: "4. Who Enchants Ron With A Love Potion, Meaning For Harry To Drink It?",
	answerList: ["Ginny Weasley", "Lavender Brown", "Parvati Patil", "Romilda Vane"],
	answer: 3
},{
	question: "5. Which Quote Did Harry NOT say?",
	answerList: ["There's no need to call me sir, Professor", "Wow, I wonder what that would be like, having a hard life?", "Twitchy little ferret, aren't you, Malfoy?", "You wish."],
	answer: 2
},{
	question: "6. Which House Was Cho Chang In?",
	answerList: ["Huffepuff", "Ravenclaw", "Gryffindor", "Slytherin"],
	answer: 1
},{
	question: "7. What Is The Symbol Of Ravenclaw House?",
	answerList: ["A Raven", "An Eagle", "A Hawk", "A Canary"],
	answer: 0
},{
	question: "8. What color is Lily Potter's hair?",
	answerList: [" Dark Brown", "Blonde", "Red", "Pink"],
	answer: 2
},{
	question: "9. What form did Hermione's boggart take?",
	answerList: ["A bloodstained, bandaged mummy", "Voldemort killing her family", "Professor McGonagall telling her she'd failed her exams", "A giant cobra"],
	answer: 2
},{
	question: "10. What is the title of the first chapter of 'The Chamber of Secrets'?",
	answerList: ["The Worst Birthday", "Dobby's Warning", "The Burrow", "Owl Post"],
	answer: 1
},{
	question: "11. What are the ingredients needed to make the Polyjuice Potion?",
	answerList: ["Lacewing flies, Leeches, Powdered Unicorn horn, Knotgrass, Fluxweed, Shredded Boomslang skin, and a bit of the person you want to turn into",
	 "APowdered Bicorn horn, Knotgrass, Fluxweed, Shredded Boomslang skin, a Bezoar, and a hair of the person you're changing into", 
	 "Lacewing flies, Leeches, Powdered Bicorn horn, Knotgrass, Fluxweed, Shredded Boomslang skin, and a bit of the person you want to turn into", 
	 "Lacewing flies, Powdered Unicorn horn, Knotgrass, Flaxweed, Shredded Boomslang skin, and a bit of the person you want to turn into"],
	answer: 2
},{
	question: "12. What was Madam Marsh travelling to via the Knight Bus in 1993?",
	answerList: ["THogsmeade", "Abergavenny", "Diagon Alley", "Godric's Hollow"],
	answer: 1
},{
	question: "13. What year did James Potter die?",
	answerList: ["1987", "1985", "1981", "1980"],
	answer: 2
},{
	question: "14. Where did Fred Weasley die?",
	answerList: ["In the Room of Requirement", "In the Great Hall", "In the courtyard", "Outside the Room of Requirement"],
	answer: 3
},{
	question: "15. What is the name of Hepzibah Smith's House-elf?",
	answerList: ["Winky", "Krum", "Hooky", "Hokey"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}