import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";

const videoUrls = [
    '/2f085302-9fa4-4b62-ac37-0a17b46a3c49.mov',
    '/ff1f5d72-acd5-400d-8094-48a615e775b9.mov',
    '/e4af51c1-2dc8-4b7e-868b-f3fc27f7a68e.mov',
    '/d66c7407-1a70-4a95-a272-2f9db4248131.mov',
    '/dd68ba83-6cc4-4855-aa87-5783eb7544f4.mov',
    '/2b206bce-89b4-4c98-bdf8-2b066a06ceba.mov',
    '/29e0900b-47fa-4468-a0d7-7d895853fefc.mp4',
];

function App() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
      if (window.location.pathname !== '/done') {
          if (index === 0) {
              window.addEventListener('load', async () => {
                  const playButton = document.getElementById('playpause');
                  playButton!.onclick = async () => {
                      document.getElementById('playpause')!.style.display = 'none';
                      document.getElementById('myvideo')!.style.display = 'block';
                      const videoPlayer: any = document.getElementById('myvideo')!;
                      await videoPlayer.play();
                      videoPlayer!.muted = false;
                  }
              });

              const videoPlayer: any = document.getElementById('myvideo')!;
              videoPlayer.addEventListener('ended', () => {
                  setIndex(index => {
                      const newIndex = index + 1;
                      if (newIndex >= videoUrls.length) {
                          window.location.pathname = '/done';
                      }
                      return newIndex
                  });
                  if (index < videoUrls.length) {
                      videoPlayer.play();
                  }
              });
          }
      } else {
          document.body.style.margin = '0';
          document.body.style.background = '#020202';
          document.body.style.cursor = 'crosshair';
          document.getElementById('birthday-canvas')!.style.display = 'block';
          const header = document.getElementById('birthday-header')!;
          header.style.position = 'absolute';
          header.style.top = '20%';
          header.style.left = '50%';
          header.style.transform = 'translate(-50%, -50%)';
          header.style.color = '#fff';
          header.style.fontFamily = 'Source Sans Pro';
          header.style.fontSize = '5em';
          header.style.fontWeight = '900';
          header.style.userSelect = 'none';

          // helper functions
          const PI2 = Math.PI * 2
          const random = (min: any, max: any) => Math.random() * (max - min + 1) + min | 0
          const timestamp = (_: any) => new Date().getTime()

// container
          class Birthday {
              constructor() {
                  this.resize()

                  // create a lovely place to store the firework
                  // @ts-ignore
                  this.fireworks = []
                  // @ts-ignore
                  this.counter = 0

              }

              resize() {
                  // @ts-ignore
                  this.width = canvas.width = window.innerWidth
                  // @ts-ignore
                  let center = this.width / 2 | 0
                  // @ts-ignore
                  this.spawnA = center - center / 4 | 0
                  // @ts-ignore
                  this.spawnB = center + center / 4 | 0

                  // @ts-ignore
                  this.height = canvas.height = window.innerHeight
                  // @ts-ignore
                  this.spawnC = this.height * .1
                  // @ts-ignore
                  this.spawnD = this.height * .5

              }

              onClick(evt: any) {
                  let x = evt.clientX || evt.touches && evt.touches[0].pageX
                  let y = evt.clientY || evt.touches && evt.touches[0].pageY

                  let count = random(3,5)
                  // @ts-ignore
                  for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
                      // @ts-ignore
                      random(this.spawnA, this.spawnB),
                      // @ts-ignore
                      this.height,
                      x,
                      y,
                      random(0, 260),
                      random(30, 110)))
// @ts-ignore
                  this.counter = -1

              }

              update(delta: any) {
                  ctx.globalCompositeOperation = 'hard-light'
                  ctx.fillStyle = `rgba(20,20,20,${ 7 * delta })`
                  // @ts-ignore
                  ctx.fillRect(0, 0, this.width, this.height)

                  ctx.globalCompositeOperation = 'lighter'
                  // @ts-ignore
                  for (let firework of this.fireworks) firework.update(delta)

                  // if enough time passed... create new new firework
                  // @ts-ignore
                  this.counter += delta * 3 // each second
                  // @ts-ignore
                  if (this.counter >= 1) {
                      // @ts-ignore
                      this.fireworks.push(new Firework(
                          // @ts-ignore
                          random(this.spawnA, this.spawnB),
                          // @ts-ignore
                          this.height,
                          // @ts-ignore
                          random(0, this.width),
                          // @ts-ignore
                          random(this.spawnC, this.spawnD),
                          random(0, 360),
                          random(30, 110)))
                      // @ts-ignore
                      this.counter = 0
                  }

                  // remove the dead fireworks
                  // @ts-ignore
                  if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

              }
          }

          class Firework {
              // @ts-ignore
              constructor(x, y, targetX, targetY, shade, offsprings) {
                  // @ts-ignore
                  this.dead = false
                  // @ts-ignore
                  this.offsprings = offsprings

                  // @ts-ignore
                  this.x = x
                  // @ts-ignore
                  this.y = y
                  // @ts-ignore
                  this.targetX = targetX
                  // @ts-ignore
                  this.targetY = targetY
// @ts-ignore
                  this.shade = shade
                  // @ts-ignore
                  this.history = []
              }
              update(delta: any) {
                  // @ts-ignore
                  if (this.dead) return
// @ts-ignore
                  let xDiff = this.targetX - this.x
                  // @ts-ignore
                  let yDiff = this.targetY - this.y
                  if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
                      // @ts-ignore
                      this.x += xDiff * 2 * delta
                      // @ts-ignore
                      this.y += yDiff * 2 * delta

                      // @ts-ignore
                      this.history.push({
                          // @ts-ignore
                          x: this.x,
                          // @ts-ignore
                          y: this.y
                      })
// @ts-ignore
                      if (this.history.length > 20) this.history.shift()

                  } else {
                      // @ts-ignore
                      if (this.offsprings && !this.madeChilds) {
// @ts-ignore
                          let babies = this.offsprings / 2
                          for (let i = 0; i < babies; i++) {
                              // @ts-ignore
                              let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
                              // @ts-ignore
                              let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0
// @ts-ignore
                              birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

                          }

                      }
                      // @ts-ignore
                      this.madeChilds = true
                      // @ts-ignore
                      this.history.shift()
                  }
// @ts-ignore
                  if (this.history.length === 0) this.dead = true
                  // @ts-ignore
                  else if (this.offsprings) {
                      // @ts-ignore
                      for (let i = 0; this.history.length > i; i++) {
                          // @ts-ignore
                          let point = this.history[i]
                          ctx.beginPath()
                          // @ts-ignore
                          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
                          ctx.arc(point.x, point.y, 1, 0, PI2, false)
                          ctx.fill()
                      }
                  } else {
                      ctx.beginPath()
                      // @ts-ignore
                      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
                      // @ts-ignore
                      ctx.arc(this.x, this.y, 1, 0, PI2, false)
                      ctx.fill()
                  }

              }
          }

          let canvas = document.getElementById('birthday-canvas')
          // @ts-ignore
          let ctx = canvas.getContext('2d')
// @ts-ignore
          let then = timestamp()

          let birthday = new Birthday
          window.onresize = () => birthday.resize()
          document.onclick = evt => birthday.onClick(evt)
          document.ontouchstart = evt => birthday.onClick(evt)

          ;(function loop(){
              requestAnimationFrame(loop)
// @ts-ignore
              let now = timestamp()
              let delta = now - then

              then = now
              birthday.update(delta / 1000)


          })()
      }
  }, [index]);
    // @ts-ignore
    const lottie = (<lottie-player src="https://assets2.lottiefiles.com/datafiles/1UieKbAyeQMSqmt/data.json" mode="bounce" background="transparent"  speed="1"  style={{ width: '200px', height: '200px', position: 'absolute', left: '0%', right: '0%', top: '0%', bottom: '0%', margin: 'auto', backgroundSize: 'contain', backgroundPosition: 'center',}}  loop  autoplay></lottie-player>);

    return (
      <Router>
          <Route path='/done'>
              <h1 id='birthday-header'>Happy Birthday</h1>
              <canvas id="birthday-canvas"></canvas>
          </Route>
          <Route exact path='/'>
              <div>
                  <video
                      id='myvideo'
                      src={videoUrls[index]}
                      // @ts-ignore
                      style={{
                          display: 'none',
                          position: 'absolute',
                          zIndex: '-1',
                          top: '0',
                          left: '0',
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                      }}
                      playsInline
                  />
                  <div id='playpause'>
                      {lottie}
                      <p
                          style={{
                              width: '200px',
                              height: '100px',
                              position: 'absolute',
                              left: '4%',
                              right: '0%',
                              top: '35%',
                              bottom: '0%',
                              margin: 'auto',
                              backgroundSize: 'contain',
                              backgroundPosition: 'center'
                          }}
                      >Click The Play Button</p>
                  </div>
              </div>
          </Route>
      </Router>
  );
}

export default App;
