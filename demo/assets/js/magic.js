(function() {
  let xPointer, yPointer;
  let previousYelem;
  document.getElementById('boardWrapper').addEventListener('mousemove', function(e) {
    xPointer = e.clientX - this.offsetLeft;
    yPointer = e.clientY - (this.offsetTop - window.pageYOffset);
  });

  const boards = [].slice.apply(document.querySelectorAll('.board'));
  const axes = new eg.Axes({
    axis: {
      xElem: {
        range: [1, 500]
      },
      yElem: {
        range: [1, 500]
      }
    },
    deceleration: 0.0024
  })
  .on({
    'change': function(e) {
      previousYelem = previousYelem ? previousYelem : e.pos.yElem;
      let yElemMove = ((e.pos.yElem - previousYelem) < 0) ? 'up' : 'down'; 
      previousYelem = e.pos.yElem;
      let verticalDistance = boards[1].offsetTop - boards[0].offsetTop;
      boards.forEach(function(board, index) {
        board.style.left = xPointer + 'px';
        if(yElemMove === 'down' && verticalDistance >= 30) {
          switch (index) {
            case 0:
            case 1:
            case 2:
              board.style.top = board.offsetTop + (3-index)*(e.pos.yElem/15) + 'px';
              break;
            case 3:
            case 4:
            case 5:
              board.style.top = board.offsetTop - (index-2)*(e.pos.yElem/15) + 'px';
              break;
          }
        } else if(yElemMove === 'up' && verticalDistance <= 60) {
          switch (index) {
            case 0:
            case 1:
            case 2:
              board.style.top = board.offsetTop - (3-index)*(e.pos.yElem/15) + 'px';
              break;
            case 3:
            case 4:
            case 5:
              board.style.top = board.offsetTop + (index-2)*(e.pos.yElem/15) + 'px';
              break;
          }
        }
      });
    },
    'release': function(e) {

    }
  })
  .mapInput(['xElem', 'yElem'], new eg.Axes.HammerInput('#boardWrapper'));
  // .setTo({'xElem': 100, 'yElem': 200});

  function shuffleArr(arr) {
    for (let i = arr.length; i >=1; i--) {
      let randomIndex = Math.floor(Math.random()*i); 
      let itemAtIndex = arr[randomIndex]; 

      arr[randomIndex] = arr[i-1]; 
      arr[i-1] = itemAtIndex;
    }
    return arr;
  }
})();