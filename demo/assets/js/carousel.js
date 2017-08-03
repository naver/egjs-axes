(() => {
    // const carouselArea = document.querySelector("#carousel-area");
    // const detailViewImg = document.querySelector("#detail-view-content > img");
    // const btnMoreInfo = document.querySelector("#btn-more-info");
    // const detailViewArea = document.querySelector("#detail-view-carousel");
    // const zoomInBtn = document.querySelector("#btn-control-zoom-in");
    // const zoomOutBtn = document.querySelector("#btn-control-zoom-out");
    // const carouselContainer = document.querySelector("#carousel-container");
    // const zoomBtnSection = document.querySelector(".btn-control-section");

    // const AXES_SCALE = 0.5;
    // const CONTENT_VIEW_PORT = 280;
    // const DEFAULT_DETAIL_X = 50;
    // const DEFAULT_DETAIL_Y = 100;
    // const MAX_SCALE = 1.7;
    // const MIN_SACLE = 0.8;
    // const SCALE_RATIO = 0.1;
    // const PANEL_WIDTH = 120;
    // const FIRST_PANEL_IDX = 1;
    // const LAST_PANEL_IDX = carouselArea.children.length;
    // const INITIAL_POS = 3;
    // const BASE = carouselContainer.getBoundingClientRect().width / 2 - (PANEL_WIDTH / 2);
    // const SCALE_UP = 1;
    // const SCALE_DOWM = -1;
    // let scaleRatio = 1;

    // const imgSrcCache = [];
    // const boxElmCache = [];
    // [...(document.querySelectorAll("[data-boxId]"))].map(elm => {
    //     const boxId = elm.dataset.boxid;
    //     imgSrcCache[boxId] = elm.children[0].src;
    //     boxElmCache[boxId] = elm;
    // });

    // const axes = new eg.Axes({
    //     axis: {
    //         detailX: {
    //             range: [0, DEFAULT_DETAIL_X]
    //         },
    //         detailY: {
    //             range: [0, DEFAULT_DETAIL_X]
    //         },
    //         carousel: {
    //             range: [BASE - (PANEL_WIDTH * (LAST_PANEL_IDX - 1)), BASE],
    //         },
    //     },
    //     deceleration: 0.007,
    // });

    // const adjustRangeOfDVAxes = (scaleRatio = 1, direction = 1) => {
    //     const toRange = Math.floor((scaleRatio - 1) * CONTENT_VIEW_PORT / 2 * direction);
    //     const axisOptions = axes.option().axis;
    //     if (scaleRatio === 1) {
    //         axisOptions.detailX.range[0] = 0;
    //         axisOptions.detailX.range[1] = DEFAULT_DETAIL_X;
    //         axisOptions.detailY.range[0] = 0;
    //         axisOptions.detailY.range[1] = DEFAULT_DETAIL_Y;
    //     } else {
    //         axisOptions.detailX.range[0] = 0 - toRange;
    //         axisOptions.detailX.range[1] = DEFAULT_DETAIL_X + toRange;
    //         axisOptions.detailY.range[0] = 0 - toRange;
    //         axisOptions.detailY.range[1] = DEFAULT_DETAIL_Y + toRange;
    //     }
    // }
    
    // const removeSpotlight = (...indexes) => {
    //     indexes.filter(idx => boxElmCache[idx]).forEach(idx => {
    //         boxElmCache[idx].classList.add("box-inactive");
    //         boxElmCache[idx].style[eg.Axes.TRANSFORM] = `scale(1)`;
    //     });
    // }

    // const getIdx = pos => Math.round(((pos - BASE) * -1) / PANEL_WIDTH) + 1;

    // const initDetailView = () => axes.setTo({
    //         detailX: DEFAULT_DETAIL_X / 2,
    //         detailY: DEFAULT_DETAIL_Y / 2,
    // }, 300);
    
    // const changeScale = direction => {
    //     detailViewImg.style[eg.Axes.TRANSFORM] = `scale(${scaleRatio += SCALE_RATIO * direction})`;
    //     adjustRangeOfDVAxes(scaleRatio, direction);
    // }

    // const getBtn = target => {
    //     if (target.id === "") {
    //         return target.parentNode;
    //     }
    //     return target;
    // }

    // const clickedEffectAdd = ({target}) => getBtn(target).classList.add("btn-clicked");
    // const clickedEffectDel = ({target}) => getBtn(target).classList.remove("btn-clicked");

    // axes.on({
    //     "hold": ({inputEvent}) => {
    //         if (inputEvent.target.parentNode.parentNode.id === "carousel-area") {
    //             initDetailView();
    //             detailViewImg.style[eg.Axes.TRANSFORM] = `scale(1)`;
    //             adjustRangeOfDVAxes();
    //             scaleRatio = 1;
    //         }
    //     },

    //     "change": ({pos}) => {
    //         const move = pos.carousel;
    //         const idx = getIdx(move);
    //         carouselArea.style[eg.Axes.TRANSFORM] = `translateX(${move}px)`;
    //         removeSpotlight(FIRST_PANEL_IDX, LAST_PANEL_IDX);
    //         if (idx >= FIRST_PANEL_IDX && idx <= LAST_PANEL_IDX) {
    //             boxElmCache[idx].style[eg.Axes.TRANSFORM] = `scale(1.2)`;
    //             boxElmCache[idx].classList.remove("box-inactive");
    //             removeSpotlight(idx - 1, idx + 1);
    //             detailViewImg.src = imgSrcCache[idx];
    //             if (scaleRatio > MIN_SACLE) {
    //                 detailViewArea.style[eg.Axes.TRANSFORM] = 
    //                 `translateX(${-pos.detailX}px) translateY(${-pos.detailY}px)`;
    //             }
    //         }
    //     },

    //     "release": ({destPos}) => {
    //         const idx = getIdx(destPos.carousel);
    //         destPos.carousel = ((idx - 1) * PANEL_WIDTH * -1) + BASE;
    //     },
    // })
    // .connect(
    //     ["detailX", "detailY"],
    //     new eg.Axes.PanInput("#detail-view-carousel-container", {
    //         scale: [-AXES_SCALE, -AXES_SCALE],
    //     }))
    // .connect(
    //     "carousel",
    //     new eg.Axes.PanInput("#carousel-container", {
    //         scale: [AXES_SCALE, 0]
    //     }))
    // .setTo({
    //     detailX: DEFAULT_DETAIL_X / 2,
    //     detailY: DEFAULT_DETAIL_Y / 2,
    //     carousel: BASE - (INITIAL_POS * PANEL_WIDTH),
    // });

    // zoomInBtn.addEventListener("click", () => {
    //     if (scaleRatio >= MAX_SCALE) {
    //         return ;
    //     }
    //     changeScale(SCALE_UP);
    // });

    // zoomOutBtn.addEventListener("click", () => {
    //     if (scaleRatio < MIN_SACLE) {
    //         return ;
    //     }
    //     initDetailView();
    //     changeScale(SCALE_DOWM);
    // });

    // zoomBtnSection.addEventListener("mousedown", clickedEffectAdd);
    // zoomBtnSection.addEventListener("touchstart", clickedEffectAdd);
    // zoomBtnSection.addEventListener("mouseup", clickedEffectDel);
    // zoomBtnSection.addEventListener("touchend", clickedEffectDel);
})();
