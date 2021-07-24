window.addEventListener("load", function (event){
    let main = gsap.timeline();

    main.from("#cell", {ease:"inout"}).to("#cell", {scale:2, x: 200, y: 200}, 2)
})
