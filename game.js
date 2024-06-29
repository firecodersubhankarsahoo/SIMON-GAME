// Function to start the game
function startGame() {
    $("#level-title").text("Level 1");
    changeBackground(); // Change background when the game starts
    nextSequence();
  }
  
  // Detect if the game has started
  let isStarted = false;
  
  // Function to handle starting the game
  function handleStart() {
    if (!isStarted) {
      startGame();
      isStarted = true;
    }
  }
  
  // Event listener for keypress
  $(document).keypress(function () {
    handleStart();
  });
  
  // Event listener for start button click
  $(document).ready(function () {
    $("#start-button").click(function () {
      handleStart();
    });
  });
  
  // Rest of your existing game logic below...
  var colourArr = ["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];
  var level = 0;
  
  // Array of background classes
  var backgroundClasses = ["i1", "i2", "i3", "i4", "i5", "i6", "i7","i8", "i9", "i10", "i11", "i12", "i13"];
  
  function nextSequence() {
      userClickedPattern = [];
      level++;
      $("h1").text("Level " + level);
      var n = Math.floor(Math.random() * 4);
      var randomChosenColour = colourArr[n];
      gamePattern.push(randomChosenColour);
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
  }
  
  $(".btn").click(function() {
      var userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
  });
  
  function checkAnswer(currentLevel) {
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          if (userClickedPattern.length === gamePattern.length) {
              setTimeout(function() {
                  nextSequence();
              }, 1000);
          }
      } else {
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function() {
              $("body").removeClass("game-over");
          }, 200);
          $("h1").text("Game Over, Press Any  Key on your keyboard to Restart");
          startOver();
      }
  }
  
  function startOver() {
      level = 0;
      gamePattern = [];
      isStarted = false;
      changeBackground(); // Change background when the game is over
  }
  
  function playSound(name) {
      var sound = new Audio("sounds/" + name + ".mp3");
      sound.play();
  }
  
  function animatePress(currentColour) {
      $("#" + currentColour).addClass("pressed");
      setTimeout(function() {
          $("#" + currentColour).removeClass("pressed");
      }, 100);
  }
  
  function changeBackground() {
      // Remove all background classes
      for (var i = 0; i < backgroundClasses.length; i++) {
          $("body").removeClass(backgroundClasses[i]);
      }
      
      // Select a random background class
      var randomIndex = Math.floor(Math.random() * backgroundClasses.length);
      
      // Add the random background class
      $("body").addClass(backgroundClasses[randomIndex]);
  }
  