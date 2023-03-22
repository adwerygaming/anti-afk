if (process.platform != "win32") {
  console.log(`Hmm.. Looks Like You\'re Running This Script On Non Windows Computer.\nUhh, Sorry. This Script Isn\'t Made For Non Windows Yet.\n\nIf You Like To Help Me Make The Non Windows Version, You Can Make a Fork And Modify. Thanks!\n\n- adwerygaming (DevanAditiya)`)
  process.exit(1)
}

const robot = require("robotjs");
const readline = require('readline');
const { GlobalKeyboardListener } = require('node-global-key-listener');
const keyListener = new GlobalKeyboardListener();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
// TODO: Figure out Why It Dosen't Listen After User Sumbit Options.
keyListener.addListener(function (e, down) {
  console.log(e.name)
  if (e.state == "DOWN" && e.name == "M" && (down["LEFT CTRL"] || down["RIGHT CTRL"])) {
    console.log('\nGoodbye!!\n');
    process.exit()
  }
});
*/

console.log("  /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$        /$$$$$$  /$$$$$$$$ /$$   /$$")
console.log(" /$$__  $$| $$$ | $$|__  $$__/|_  $$_/       /$$__  $$| $$_____/| $$  /$$/")
console.log("| $$  \\ $$| $$$$| $$   | $$     | $$        | $$  \\ $$| $$      | $$ /$$/ ")
console.log("| $$$$$$$$| $$ $$ $$   | $$     | $$ /$$$$$$| $$$$$$$$| $$$$$   | $$$$$/  ")
console.log("| $$__  $$| $$  $$$$   | $$     | $$|______/| $$__  $$| $$__/   | $$  $$  ")
console.log("| $$  | $$| $$\\  $$$   | $$     | $$        | $$  | $$| $$      | $$\\  $$ ")
console.log("| $$  | $$| $$ \\  $$   | $$    /$$$$$$      | $$  | $$| $$      | $$ \\  $$")
console.log("|__/  |__/|__/  \\__/   |__/   |______/      |__/  |__/|__/      |__/  \\__/")
console.log("")
console.log("Get More Done with Less Effort: Use This Script to Move Your Mouse Cursor Randomly.\n")
console.log("1. Infitity Mode - Moves Your Mouse Until You Stop (CTRL+C)")
console.log("2. Infitity Delayed Mode - Moves Your Mouse Until You Stop But With Delay")
console.log("3. Count Mode - Moves Your Mouse Until Counter Reached Target (Delay)")
console.log("4. Timer Mode - Moves Your Mouse Until Specified Minutes\n")

const screenSize = robot.getScreenSize();
if (screenSize.width && screenSize.height) {
  console.log(`Your Screen Size: ${screenSize.width}x${screenSize.height}`);
} else {
  console.log('Wait, You Don\'t Have a Screen Plugged? how.');
  process.exit(1)
}

// Get current mouse position
const mousePos = robot.getMousePos();

// Check if mouse cursor is visible on the screen
if (mousePos.x === -1 && mousePos.y === -1) {
  console.log("Hmm. Your Cursor Is Not Visible. Try Moving Around And Run This Script Again.");
} else {
  console.log(`Mouse cursor is currently at position x: ${mousePos.x}, y: ${mousePos.y}`);
}

console.log("")

// Define the original position of the mouse
const origin = robot.getMousePos();
const srcnSize = robot.getScreenSize()

// Define the range of movement in pixels
const moveRange = 756;
const moveRangeMax = 700;

// Define the interval in milliseconds
let interval = 300;
let count = 0
let counter_till = 0
let counter_temp_others = null

async function moveMouse(args, delay, others) {
  args = args.toLowerCase()
  if (!delay) delay = 0
  interval = delay || interval

  if (args == "infinity") {
    count++
    // Generate random movement
    const moveX = Math.floor(Math.random() * srcnSize.width)
    const moveY = Math.floor(Math.random() * srcnSize.height)
  
    // Calculate the new position
    const newX = moveX;
    const newY = moveY;
  
    // Move the mouse cursor to the new position
    await robot.moveMouseSmooth(newX, newY, 1);
  
    console.log(`[INF ${count}] Moved to: x ${newX}, y ${newY}`)
  
    await moveMouse("infinity")
  } else if (args == "infinity_timed") {
    count++
    // Generate random movement
    const moveX = Math.floor(Math.random() * srcnSize.width)
    const moveY = Math.floor(Math.random() * srcnSize.height)
  
    // Calculate the new position
    const newX = moveX;
    const newY = moveY;
  
    // Move the mouse cursor to the new position
    await robot.moveMouseSmooth(newX, newY, 1);
  
    let delay = interval
    console.log(`[INF-TMD ${count}] Moved to: x ${newX}, y ${newY}  - [${delay}ms] `)
  
    // Wait for a short time
    robot.setMouseDelay(delay);
  
    await moveMouse("infinity_timed")
  } else if (args == "count") {
    count++
    counter_till++
    if (counter_temp_others == null) counter_temp_others = others
    // Generate random movement
    const moveX = Math.floor(Math.random() * srcnSize.width)
    const moveY = Math.floor(Math.random() * srcnSize.height)
  
    // Calculate the new position
    const newX = moveX;
    const newY = moveY;
  
    // Move the mouse cursor to the new position
    await robot.moveMouseSmooth(newX, newY, 1);
  
    let delay = interval
    console.log(`[COUNT ${count} / ${counter_temp_others}] Moved to: x ${newX}, y ${newY}`)
  
    // Wait for a short time
    robot.setMouseDelay(delay);

    if (counter_temp_others == counter_till) {
      console.log("done!")
      process.exit(1)
    }
    await moveMouse("count")
  } else if (args == "timer") {
    const durationInMs = parseInt(others) * 60 * 1000;
    const startTime = Date.now();

    const timeEstimateEnds = new Date(startTime + durationInMs).toLocaleTimeString();

    while (Date.now() < startTime + durationInMs) {
      count++
      // Generate random movement
      const moveX = Math.floor(Math.random() * srcnSize.width)
      const moveY = Math.floor(Math.random() * srcnSize.height)

      // Calculate the new position
      const newX = moveX;
      const newY = moveY;

      // Move the mouse cursor to the new position
      await robot.moveMouseSmooth(newX, newY, 1);

      // Calculate remaining time estimate
      const remainingTimeInMs = startTime + durationInMs - Date.now();
      const remainingMinutes = Math.floor(remainingTimeInMs / 60000);
      const remainingSeconds = Math.floor((remainingTimeInMs % 60000) / 1000);
      const timeEstimateEnds = remainingMinutes > 0 ? `${remainingMinutes}m ${remainingSeconds}s left` : `${remainingSeconds}s left`;


      console.log(`[TIMER ${count} - ${timeEstimateEnds}] Moved to: x ${newX}, y ${newY}`);

      // Wait for a short time
      robot.setMouseDelay(interval);
    }

    console.log(`Time's up!`);
    process.exit(1);

  };
}

rl.question('Please select an option (1-4): ', (answer) => {
  if (answer === '1') {
    console.log('You selected: INFINITY MODE');

    console.log(`Starting In 3s...`)
    setTimeout(() => {
      console.clear()
      moveMouse("infinity")
      rl.close();
    }, 3000);

  } else if (answer === '2') {
    rl.close();
    const rl_asking_for_delay = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('You selected: INFINITY DELAYED MODE');
    rl_asking_for_delay.question('Input Delay For Each Movement (ms): ', (id) => {
      console.log(`Starting In 3s...`)
      setTimeout(() => {
        console.clear()
        moveMouse("infinity_timed", id)
        rl_asking_for_delay.close();
      }, 3000);

    })
  } else if (answer === '3') {
    rl.close();
    const rl_asking_for_delay = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('You selected: COUNT MODE');
    rl_asking_for_delay.question('How Many Times? (number): ', (id) => {
      if (!id) {
        console.log(`No Input Delected. That Means Infinity Mode.`)
        console.log(`Starting In 3s...`)
        setTimeout(() => {
          console.clear()
          moveMouse("infinity", 500, id)
          rl_asking_for_delay.close();
        }, 3000);
        return
      }

      setTimeout(() => {
        console.clear()
        moveMouse("count", 500, id)
        rl_asking_for_delay.close();
      }, 3000);
    })
  } else if (answer === '4') {
    rl.close();
    const rl_asking_for_delay = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('You selected: TIMER MODE');
    rl_asking_for_delay.question('Input Minutes. (MM, for example: 20 (for 20 Minutes)): ', (id) => {
      if (!id) {
        console.log(`No Input Delected. That Means Infinity Mode.`)
        console.log(`Starting In 3s...`)
        setTimeout(() => {
          console.clear()
          moveMouse("infinity", 500, id)
          rl_asking_for_delay.close();
        }, 3000);
        return
      }

      console.log(`Starting In 3s...`)
      setTimeout(() => {
        console.clear()
        moveMouse("timer", 500, id)
        rl_asking_for_delay.close();
      }, 3000);
    })
  } else if (answer == "idk") {
    console.log(`adwerygaming (DevanAditiya): It\'s Ok.`);
    rl.close();
    process.exit(1)
  } else if (answer == "mouse") {
    console.log(`adwerygaming (DevanAditiya): Yes, Mouse.`);
    rl.close();
    process.exit(1)
  } else if (answer == "test") {
    console.log(`adwerygaming (DevanAditiya): Sorry, But Test Mode is Not Here Right Now.`);
    rl.close();
    process.exit(1)
  } else {
    console.log('Invalid option selected');
    rl.close();
    process.exit(1)
  }
});

// hi mom