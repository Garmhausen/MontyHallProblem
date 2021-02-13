// This simulation will run for this many iterations in a multiple of three
// keeping results for three different scenarios:
// the player switches after Monty reveals a goat,
// the player keeps their first choice after he reveals a goat,
// the player randomly switches or keeps their choice.
const simulationIterations = 1000000;

// utility to just get a random door
function pickADoor() {
  return Math.floor(Math.random() * 3 + 1) // get a random integer: 1, 2, or 3
}

// loop to randomly determine a third door 
// (sometimes can be one of two if the player picked the winning door intially)
function determineAThirdDoor(firstDoor, secondDoor) {
  const allDoors = [1, 2, 3];
  return allDoors.find((possibleDoor) => possibleDoor !== firstDoor && possibleDoor !== secondDoor);
}

// run a single round of the game
function round(willSwitchGuess) {
  // pick a door for the car...
  const winningDoor = pickADoor();

  // player chooses a door
  const firstChoice = pickADoor();

  // a door is revealed
  const revealedDoor = determineAThirdDoor(winningDoor, firstChoice);

  // determine final answer
  const finalAnswer = willSwitchGuess ? determineAThirdDoor(firstChoice, revealedDoor) : firstChoice;

  return {
    won: finalAnswer === winningDoor,
    switched: willSwitchGuess,
    firstChoice,
    revealedDoor,
    finalAnswer,
    winningDoor,
  };
}

function runSimulation(iterations) {
  const results = {
    switched: [],
    wonSwitched: 0,
    wonSwitchedPercentage: 0,
    stayed: [],
    wonStayed: 0,
    wonStayedPercentage: 0,
    random: [],
    wonRandom: 0,
    wonRandomPercentage: 0,
  };

  // run for keeping the players first choice
  for (let i = 0; i < iterations; i++) {
    const result = round(false);
    if (result.won) results.wonStayed++;
    results.stayed.push(result);
  }
  results.wonStayedPercentage = (results.wonStayed / iterations).toFixed(2);

  // run for switching the players first choice
  for (let i = 0; i < iterations; i++) {
    const result = round(true);
    if (result.won) results.wonSwitched++;
    results.switched.push(result);
  }
  results.wonSwitchedPercentage = (results.wonSwitched / iterations).toFixed(2);

  // run for randomly switching or not
  for (let i = 0; i < iterations; i++) {
    const result = round(Math.random() < 0.5);
    if (result.won) results.wonRandom++;
    result.iteration = i + 1;
    results.random.push(result);
  }
  results.wonRandomPercentage = (results.wonRandom / iterations).toFixed(2);

  console.log('Percentage won when always switching:', results.wonSwitchedPercentage);
  console.log('Percentage won when never switching:', results.wonStayedPercentage);
  console.log('Percentage won when randomly switching:', results.wonRandomPercentage);
  // console.log('Full Results in detail', results);
}

// run this thing!
runSimulation(simulationIterations);