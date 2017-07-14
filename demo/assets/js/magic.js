(function() {
    let previousXelem;
    const boardWrapper = document.querySelector("#boardWrapper");
    const wrapperWidth = window.getComputedStyle(boardWrapper, null).getPropertyValue("width").replace("px","");
    const boards = [...document.querySelectorAll(".board")];
    const boardWidth = boards[0].style.width.replace("px", "");
    const maxRange = Math.floor(wrapperWidth * 0.75);
    const axes = new eg.Axes({
        axis: {
            xElem: {
                range: [1, maxRange]
            }
        },
        deceleration: 0.0012
    })
    .on({
        "change": e => {
            previousXelem = previousXelem ? previousXelem : e.pos.xElem;
            let direction = ((e.pos.xElem - previousXelem) > 0) ? 1 : -1;
            for (let i = 0; i < boards.length; i++) {
                boards[i].style.left = e.pos.xElem + "px";
                if (e.pos.xElem > maxRange / 2) {
                    // Form a cube
                    let xDeg = Math.floor(maxRange - e.pos.xElem);
                    boards[i].style.top = 50 + "%";
                    boards[i].style[eg.Axes.TRANSFORM] = "rotateX(" + xDeg + "deg)";
                    if (e.pos.xElem === maxRange) {
                        let shuffledBoards = shuffleArr(boards);
                        shuffledBoards[0].style[eg.Axes.TRANSFORM] = "translate3d(0, 0, 0)";
                        shuffledBoards[1].style[eg.Axes.TRANSFORM] = "translate3d(0, 0, -" + boardWidth + "px)";
                        shuffledBoards[2].style[eg.Axes.TRANSFORM] = "translate3d(-" + boardWidth/2 + "px, 0, -" + boardWidth/2 + "px) rotateY(90deg)";
                        shuffledBoards[3].style[eg.Axes.TRANSFORM] = "translate3d(" + boardWidth/2 + "px, 0, -" + boardWidth/2 + "px) rotateY(90deg)";
                        shuffledBoards[4].style[eg.Axes.TRANSFORM] = "translate3d(0, -" + boardWidth/2 + "px, -" + boardWidth/2 + "px) rotateX(90deg)";
                        shuffledBoards[5].style[eg.Axes.TRANSFORM] = "translate3d(0, " + boardWidth/2 + "px, -" + boardWidth/2 + "px) rotateX(90deg)";
                        boardWrapper.style[eg.Axes.TRANSFORM] = "rotateX(30deg)";
                        break;
                    }
                } else {
                    // Gather or spread
                    switch (i) {
                        case 0:
                        case 1:
                        case 2:
                            boards[i].style.top = boards[i].offsetTop + direction * (3 - i) * (e.pos.xElem / 100) + "px";
                            break;
                        case 3:
                        case 4:
                        case 5:
                            boards[i].style.top = boards[i].offsetTop - direction * (i - 2) * (e.pos.xElem / 100) + "px";
                            break;
                    }
                }
            }
            previousXelem = e.pos.xElem;
      },
        "release": e => {
            if (e.depaPos.xElem > maxRange / 2) {
                e.destPos.xElem = maxRange;
            } else {
                e.destPos.xElem = 1;
            }
        }
    })
    .mapInput("xElem", new eg.Axes.HammerInput("#boardWrapper"));

    function shuffleArr(arr) {
        for (let i = arr.length; i >= 1; i--) {
            let randomIndex = Math.floor(Math.random() * i); 
            let itemAtIndex = arr[randomIndex]; 
            arr[randomIndex] = arr[i - 1]; 
            arr[i - 1] = itemAtIndex;
        }
        return arr;
    }
})();
