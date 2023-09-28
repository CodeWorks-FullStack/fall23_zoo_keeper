const animals = [
  {
    name: 'Gary',
    mood: '😄',
    hunger: 95
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

function animalsHungerDecreases() {
  // animals.forEach((animal, index) => {
  //   if (index % 2 == 0) {
  //     animal.hunger -= 5
  //   }
  //   else {
  //     animal.hunger--
  //   }
  // })

  animals.forEach(animal => animal.hunger--)
  drawAnimals()
}


// function runCallbackFunction(func) {
//   console.log('running!');
//   func()
// }
// setInterval(() => { console.log('jeremy is cool') }, 1000)

drawAnimals()
setInterval(animalsHungerDecreases, 2000)