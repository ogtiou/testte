document.addEventListener("DOMContentLoaded", function() {
    const lenis = new Lenis({
        lerp: 0.1
    })

    lenis.on('scroll', (e) => {
    console.log(e)
    })

    function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf);

    // this is page1 to page2 anim -->
    // const btn1 = document.querySelector(".button")
    // const page2 = document.querySelector(".page2")

    // btn1.addEventListener("click", () => {
    //     gsap.to(window, {
    //         scrollTo: {
    //             y: page2,
    //         },
    //         duration: 0.8,
    //         ease: 'power2.inOut'
    //     })
    //     // document.querySelector(".page2").scrollIntoView({behavior: "smooth"})
    // });

    // menu -->
    const overlay = document.querySelector(".overlay")
    const nav = document.querySelector("nav")
    const menuStagger = gsap.utils.toArray("nav ul li a")
    const mbt = document.querySelector(".menu-btn")
    const bNav = document.querySelector(".bottom-nav")

    let menuOpen = false

    gsap.set(menuStagger, {
        yPercent: 100
    })
    gsap.set(overlay, {
        opacity: 0
    })
    gsap.set(bNav, {
        opacity: 0,
        yPercent: 10
    })
    // gsap.set(nav, {
    //     pointerEvents: 'none'
    // })

    // Disable Lenis scroll
    function disableScroll() {
        lenis.stop();
        document.body.classList.add('noS')
    }

    // Enable Lenis scroll
    function enableScroll() {
        lenis.start();
        document.body.classList.remove('noS')
    }


    const tl = gsap.timeline({
        defaults: {
            ease: 'power4.inOut',
            duration: 2
        },
        onStart: disableScroll,  // Disable scrolling when the timeline starts
        onReverseComplete: enableScroll // Enable scrolling when the timeline completes
    })

    tl.to(overlay, {
        opacity: 1,
        duration: 1
    }).to(menuStagger, {
        yPercent: 0,
        stagger: {
            amount: 0.1
        },
        duration: 1.3
    }, 0.1).to(bNav, {
        opacity: 1,
        yPercent: 0,
        duration: 1.3
    }, 0)
    .to(nav, {
        pointerEvents: "visible",
        duration: 0.01
    }, 0)
    tl.pause()

    mbt.addEventListener("click", () => {
        if (!menuOpen) {
            tl.play()
            menuOpen = true
        } else {
            tl.reverse()
            menuOpen = false
        }
    });

    // img 1 scroll
    const img = document.querySelector(".right-img img")

    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.right-img',
            start: 'top center',
            end: 'bottom top',
            scrub: true,
            // markers: true
        }
    })

    tl2.to(img, {
        yPercent: 10,
        ease: 'none'
    }, 0)


    // close announcement
    const closeBtn = document.querySelector(".close")
    const announcement = document.querySelector(".announcement")

    closeBtn.addEventListener("click", () => {
        announcement.remove()
    })
})