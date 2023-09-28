const animals = [
  {
    name: 'Gary',
    mood: '😄',
    hunger: 3
  },
  {
    name: 'Kuzco',
    mood: '😄',
    hunger: 95
  },
  {
    name: 'Judy',
    mood: '😄',
    hunger: 95
  }
]

let money = 0


function feedKuzco() {
  const kuzco = animals.find(animal => animal.name == 'Kuzco')
  kuzco.hunger++
  console.log('Feeding Kuzco', kuzco);
  drawKuzco()
}

function drawKuzco() {
  const kuzcoElement = document.getElementById('kuzco')
  const statsElement = kuzcoElement.querySelector('.stats')
  console.log('query selector!', statsElement);
  const kuzco = animals.find(animal => animal.name == 'Kuzco')
  // @ts-ignore
  statsElement.innerText = `${kuzco.name} | ${kuzco.mood} | ${kuzco.hunger}%`
}

function feedAnimal(animalName) {
  const foundAnimal = animals.find(animal => animal.name == animalName)

  if (!foundAnimal) {
    console.error(`No animal found with the name of ${animalName}`)
    return
  }

  if (foundAnimal.mood == '🧑‍🌾') {
    return
  }

  // foundAnimal.hunger += 5
  // if (foundAnimal.hunger >= 100) {
  //   return
  // }

  // if (foundAnimal.hunger < 100) {
  //   foundAnimal.hunger++
  // }


  foundAnimal.hunger++

  // NOTE clamp!
  if (foundAnimal.hunger >= 100) {
    foundAnimal.hunger = 100
  }

  console.log('feeding animal', foundAnimal);
  // REVIEW creates a brand new interval every time feedAnimal is called
  // setInterval(animalsHungerDecreases, 2000)
  drawAnimals()
}

function drawAnimals() {
  animals.forEach(animal => {
    const animalElement = document.getElementById(animal.name.toLowerCase())
    // console.log('here is what we used for our id', animal.name.toLowerCase());
    // console.log('here is the element', animalElement);

    const statsElement = animalElement.querySelector('.stats')
    // @ts-ignore
    statsElement.innerText = `${animal.name} | ${animal.mood} | ${animal.hunger}%`
  })
}

function drawMoney() {
  const moneyElement = document.getElementById('money')
  moneyElement.innerText = money.toFixed(2)
}

function animalsHungerDecreases() {
  // animals.forEach((animal, index) => {
  //   if (index % 2 == 0) {
  //     animal.hunger -= 5
  //   }
  //   else {
  //     animal.hunger--
  //   }
  // })

  animals.forEach(animal => {
    animal.hunger--
    if (animal.hunger <= 0) {
      animal.hunger = 0
    }


    if (animal.mood != '🧑‍🌾' && animal.hunger == 0) {
      sendAnimalToFarm(animal)
    }

    updateMood(animal)

  })
  drawAnimals()
}

function sendAnimalToFarm(animalThatIsGoingToTheFarm) {
  console.log('animal that is heading to the farm', animalThatIsGoingToTheFarm);

  // NOTE handled by updateMood
  // animalThatIsGoingToTheFarm.mood = '🧑‍🌾'

  const animalElement = document.getElementById(animalThatIsGoingToTheFarm.name.toLowerCase())
  // animalElement.style.border = '2px dashed red'
  const animalPenElement = animalElement.querySelector('.animal-pen')
  animalPenElement.classList.add('bg-farm')
  const outerMarquee = animalElement.querySelector('marquee')
  const innerMarquee = animalElement.querySelector('marquee>marquee')
  outerMarquee.setAttribute('scrollamount', '1')
  innerMarquee.setAttribute('scrollamount', '1')
}

// TODO write this function
function auditAnimals() {

  animals.forEach(animal => {

    switch (animal.mood) {
      case '😄':
        money += 5
        break;

      case '😐':
        money += 2
        break;

      case '😖':
        money += 1
        break;

      case '😵':
        money += .1
        break;

      default:
        money -= 5
        break;
    }
    // console.log('here is your money', money);

  })

  drawMoney()
}

function updateMood(moodyAnimal) {
  if (moodyAnimal.hunger > 80) {
    moodyAnimal.mood = '😄'
  }
  else if (moodyAnimal.hunger > 50) {
    moodyAnimal.mood = '😐'
  }
  else if (moodyAnimal.hunger > 20) {
    moodyAnimal.mood = '😖'
  }
  else if (moodyAnimal.hunger > 0) {
    moodyAnimal.mood = '😵'
  }
  else {
    moodyAnimal.mood = '🧑‍🌾'
  }
}

// function runCallbackFunction(func) {
//   console.log('running!');
//   func()
// }
// setInterval(() => { console.log('jeremy is cool') }, 1000)


// switch (money) {
//   case 0:
//     console.log('no money');
//     break;

//   case 1:
//     console.log('1 money');
//     break;

//   default:
//     console.log('Money is above 1');
//     break;
// }

drawAnimals()
setInterval(animalsHungerDecreases, 500)
setInterval(auditAnimals, 500)