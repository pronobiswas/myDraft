gsap.registerPlugin(ScrollTrigger);

let anim = lottie.loadAnimation({
  container: document.getElementById('lottie-container'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'your-animation.json'
});

anim.addEventListener('DOMLoaded', () => {
  gsap.to({frame:0}, {
    frame: anim.totalFrames - 1,
    x:100,
    ease: "none",
    scrollTrigger: {
      trigger: "#lottie-container",
      scrub: true,
      markers: true,
      start: "top top",
      end: "bottom bottom"
    },
    onUpdate: function() {
      anim.goToAndStop(Math.round(this.targets()[0].frame), true);
    }
  });
});
