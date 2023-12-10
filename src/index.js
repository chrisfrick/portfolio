fetch('https://api.github.com/users/chrisfrick')
  .then(response => response.json())
  .then(data => {
    document.querySelector('#headshot').innerHTML = `<img
          id="avatar"
          src="${data.avatar_url}"
          alt="avatar"
        />`
    document.querySelector('#github-bio').innerHTML = data.bio
  })

const scrollToId = id => {
  document.querySelector(`#${id}`).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const navigate = elem => {
  switch (elem.id) {
    case 'nav-top':
      window.scrollTo({ top: 0, behavior: 'smooth' })
      break
    case 'nav-about':
      scrollToId('about')
      break
    case 'nav-projects':
      scrollToId('projects')
      break
    case 'nav-resume':
      scrollToId('resume')
      break
  }
}

const scrollElements = document.querySelectorAll('.js-scroll')

const elementInView = (elem, offset = 0) => {
  const elementTop = elem.getBoundingClientRect().top

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - offset
  )
}

const displayScrollElement = element => {
  element.classList.add('scrolled')
}

const hideScrollElement = element => {
  element.classList.remove('scrolled')
}

const handleScrollAnimation = () => {
  scrollElements.forEach(elem => {
    if (elementInView(elem, 200)) {
      displayScrollElement(elem)
    } else {
      hideScrollElement(elem)
    }
  })
}

//initialize throttleTimer as false
let throttleTimer = false
const throttle = (callback, time) => {
  //don't run the function while throttle timer is true
  if (throttleTimer) return

  //first set throttle timer to true so the function doesn't run
  throttleTimer = true

  setTimeout(() => {
    //call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed
    callback()
    throttleTimer = false
  }, time)
}

const nav = document.querySelector('nav')

nav.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    navigate(event.target)
  }
})

// const navLinks = document.querySelectorAll('nav li')

// navLinks.forEach(elem => elem.addEventListener('click', () => navigate(elem)))

window.addEventListener('scroll', () => {
  throttle(handleScrollAnimation, 250)
})
