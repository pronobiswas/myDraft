function myFunction () {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const wrapper = document.getElementById("videoAnimationWrapper2");

  const sections = [
    {
      container: document.querySelector(".videoContainer1"),
      video: document.querySelector(".videoContainer1 video"),
    },
    {
      container: document.querySelector(".videoContainer2"),
      video: document.querySelector(".videoContainer2 video"),
    },
    {
      container: document.querySelector(".videoContainer3"),
      video: document.querySelector(".videoContainer3 video"),
    },
    {
      container: document.querySelector(".videoContainer4"),
      video: document.querySelector(".videoContainer4 video"),
    },
    {
      container: document.querySelector(".videoContainer5"),
      video: document.querySelector(".videoContainer5 video"),
    },
    {
      container: document.querySelector(".videoContainer6"),
      video: document.querySelector(".videoContainer6 video"),
    },
  ];


  Promise.all(
    sections.map(
      (s) =>
        new Promise((resolve) => {
          if (s.video.readyState >= 1) resolve();
          else s.video.addEventListener("loadedmetadata", resolve, { once: true });
        })
    )
  ).then(() => {

    sections.forEach((s) => {
      s.video.pause();
      s.video.muted = true;
      s.video.playsInline = true;
      s.video.currentTime = 0;

      gsap.set(s.container, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        zIndex: 0,
      });
    });


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=4800",
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    sections.forEach((s, i) => {
      const scrub = { t: 0 }; 
      tl.to(s.container, { opacity: 1, zIndex: 1, duration: 0.3 }, i);
      if (i > 0) {
        tl.to(sections[i - 1].container, { opacity: 0, zIndex: 0, duration: 0.3 }, i);
      }


      tl.to(
        scrub,
        {
          t: s.video.duration,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            s.video.currentTime = scrub.t;


            if (i === sections.length - 1) {
              const moveX = (scrub.t / s.video.duration) * 500;
              s.container.style.transform = `translateX(${moveX}px)`;
            } else {
              s.container.style.transform = `translateX(0px)`;
            }
          },
        },
        i
      );
    });
  });
};

// ================================================================


const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "red";
ctx.font = "40px Helvetica";
ctx.fillText("Loading...", 50, 50);

