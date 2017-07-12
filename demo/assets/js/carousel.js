(function() {

    const CONTENT_VIEW_PORT = 280;

	const PANEL_WIDTH = 120;
	const FIRST_PANEL_IDX = 1;
	const LAST_PANEL_IDX = 8;
    const BASE = document.querySelector("#carousel-container").getBoundingClientRect().width / 2 - (PANEL_WIDTH / 2);

	const carouselArea = document.querySelector("#carousel-area");
	const detailViewImg = document.querySelector("#detail-view-content > img");
    const btnMoreInfo = document.querySelector("#btn-more-info");
    const detailViewArea = document.querySelector("#detail-view-carousel");
    
    let scaleRatio = 1;

	const imgSrcCache = [];
	const boxElmCache = [];
	Array.from(document.querySelectorAll("[data-boxId]")).forEach((elm) => {
        const boxId = elm.dataset.boxid;
        imgSrcCache[boxId] = elm.children[0].src;
        boxElmCache[boxId] = elm;
    });

    const detailViewAxes = new eg.Axes({
        axis: {
            X: {
                range: [-50, 0]
            },
            Y: {
                range: [-100, 0]
            }
        },
        bounce: [0, 0],
        deceleration: 0.0024
    }).on({
        "change": ({pos}) => {
            if (scaleRatio <= 0.8) {
                return ;
            }
            detailViewArea.style[eg.Axes.TRANSFORM] = `translateX(${pos.X}px) translateY(${pos.Y}px)`;
        }
    }).mapInput(
        ["X", "Y"],
        new eg.Axes.HammerInput("#detail-view-carousel-container", {
            scale: [0.4, 0.4]
        })
    ).setTo({
        X: -25,
		Y: 50
	});

    const adjustRange = function(scaleRatio = 1, direction = 1) {
        let rangeRatio = Math.floor((scaleRatio - 1) * CONTENT_VIEW_PORT / 4 * direction);
        if (scaleRatio === 1) {
            detailViewAxes.option().axis.X.range[0] = -50;
            detailViewAxes.option().axis.X.range[1] = 0;
            detailViewAxes.option().axis.Y.range[0] = -100;
            detailViewAxes.option().axis.Y.range[1] = 0;
        } else {
            detailViewAxes.option().axis.X.range[0] -= rangeRatio;
            detailViewAxes.option().axis.X.range[1] += rangeRatio;
            detailViewAxes.option().axis.Y.range[0] -= rangeRatio;
            detailViewAxes.option().axis.Y.range[1] += rangeRatio;
        }
    }

    const carouselAxes = new eg.Axes({
        axis: {
            X: {
                range: [BASE - (PANEL_WIDTH * (LAST_PANEL_IDX - 1)), BASE]
            }
        },
        deceleration: 0.005
    }).on({
        "change": ({pos}) => {
            const move = pos.X;
			carouselArea.style[eg.Axes.TRANSFORM] = `translateX(${move}px)`;

			const idx = Math.round(((move - BASE) * -1) / PANEL_WIDTH) + 1;
            if (idx <= LAST_PANEL_IDX && idx >= FIRST_PANEL_IDX) {
                detailViewImg.src = imgSrcCache[idx];
                boxElmCache[idx].style[eg.Axes.TRANSFORM] = `scale(1.2)`;
				boxElmCache[idx].classList.remove("box-inactive");
                if (idx < LAST_PANEL_IDX) {
					boxElmCache[idx + 1].classList.add("box-inactive");
                    boxElmCache[idx + 1].style[eg.Axes.TRANSFORM] = `scale(1)`;
                }

                if (idx > FIRST_PANEL_IDX) {
					boxElmCache[idx - 1].classList.add("box-inactive");
                    boxElmCache[idx - 1].style[eg.Axes.TRANSFORM] = `scale(1)`;
                }
                detailViewImg.style[eg.Axes.TRANSFORM] = `scale(1)`;
                scaleRatio = 1;
                adjustRange();
                detailViewAxes.setTo({X: -25, Y: -50}, 300);
            }

            if (idx === FIRST_PANEL_IDX - 1) {
                boxElmCache[idx + 1].classList.add("box-inactive");
                boxElmCache[idx + 1].style[eg.Axes.TRANSFORM] = `scale(1)`;
            }

            if (idx === LAST_PANEL_IDX + 1) {
                boxElmCache[idx - 1].classList.add("box-inactive");
                boxElmCache[idx - 1].style[eg.Axes.TRANSFORM] = `scale(1)`;
            }
        },

		"release": ({depaPos, destPos}) => {
            const idx = Math.round(((destPos.X - BASE) * -1) / PANEL_WIDTH) + 1;
            const toPos = ((idx - 1) * PANEL_WIDTH * -1) + BASE;
            destPos.X = toPos;
        }
    }).mapInput(
        "X",
        new eg.Axes.HammerInput("#carousel-container", {
            scale: [0.5, 0]
        })
    ).setTo({
        X: BASE
    });

    document.querySelector("#btn-control-zoom-in").addEventListener("click", (e) => {
        if (scaleRatio >= 1.3) {
            return ;
        }
        detailViewImg.style[eg.Axes.TRANSFORM] = `scale(${scaleRatio += 0.1})`;
        adjustRange(scaleRatio);
    });

    document.querySelector("#btn-control-zoom-out").addEventListener("click", (e) => {
        if (scaleRatio <= 0.7) {
            return ;
        }
        detailViewImg.style[eg.Axes.TRANSFORM] = `scale(${scaleRatio -= 0.1})`;
        adjustRange(scaleRatio, -1);
        detailViewAxes.setTo({X: -25, Y: -50}, 300);
    });
})();
