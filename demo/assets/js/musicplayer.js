/* **********************************************
*
*	MusicPlayer component
*
*	autor: doyoon.kim doyoon.kim@navercorp.com
*   github: @BillionaireDY
*	date: 2017.07.11
*	latest update: 2017.07.12
*	notice: [1.0.0] version
*
********************************************** */

class Music {
	constructor(title, artist, playTime, imageUrl, subColor) {
        /**
        *  Music class
        *
        *  @param {String} title
        *  @param {String} artist
        *  @param {Number} playTime
        *  @param {String} imageUrl
        *  @param {String} subColor
        */
		this.title = title;
		this.artist = artist;
		this.playTime = playTime;
		this.imageUrl = imageUrl;
		this.subColor = subColor;
	}
}

const samplePlayList = [
	new Music("Too Much", "Loco", 6, "./assets/image/music/music1-min.jpg", "red"),
	new Music("Woo ah", "Crush", 5, "./assets/image/music/music2-min.jpg", "orange"),
	new Music("Man In The Mirror", "Micheal Jackson", 3, "./assets/image/music/music3-min.jpg", "yellow"),
	new Music("Adult", "GiriBoy", 4, "./assets/image/music/music4-min.jpg", "green"),
	new Music("Always Awake", "Beenzino", 5, "./assets/image/music/music5-min.jpg", "blue"),
	new Music("City Burns", "Andra Day", 4, "./assets/image/music/music6-min.jpg", "navy"),
	new Music("Get Some Air", "Gary", 3, "./assets/image/music/music7-min.jpg", "purple"),
    new Music("Hold Me Tight", "Loco", 3, "./assets/image/music/music8-min.jpg", "purple"),
];

class MusicPlayer {
    /**
    *  MusicPlayer class
    *
    *  @param {Object} playList
    */
	constructor(playList) {
		this.currentMusicIndex = 0;
        this.currentMusicProgress = 0;
		this.playList = samplePlayList;
        this.timer = null;

	    // for Dom controll
		this.turnTableDom = document.getElementById("turntable");
		this.listCarouselDom = document.getElementById("list_carousel");
		this.titleDom = document.getElementById("title");
		this.artistDom = document.getElementById("artist");
        this.barPlayDom = document.getElementById("bar_play");
        this.bulletContainerDom = document.getElementById("bullet_container");
	}

	init() {
        this.initPlayListPannel();
		this.playMusic(0);
        this.turnTableHandler();
        this.listHandler();
	}

    // make list Dom to the bottom of music player
	initPlayListPannel() {
        let deg =  Math.round(360 / this.playList.length);
        let translateZ =  Math.round( ( 210  / 2 ) /  Math.tan( Math.PI / this.playList.length ) );
	    let pannel = this.playList.map((music, index) => {
		    return `<figure style="transform: rotateY(` + deg * index + `deg) translateZ(` + translateZ + `px);">` +
                `<div id="list_cd" style="background-image:url('` + music.imageUrl + `')"/>` +
                        `<div id="list_cd_hole"></div>` +
                `</div>` +
                `<div id="list_cd_title">` + music.title + `</div>` +
                `<div id="list_cd_artist">` + music.artist + `</div>` +
            '</figure>';
	    });
        let bullets = this.playList.map(() => {
            return `<div id="bullet" class="bullet">` +
                `●`+ 
            `</div>` 
        })
		this.listCarouselDom.innerHTML = pannel.join("");
        this.listCarouselDom.style.transform = "translateZ(" + -1*translateZ +"px)";
        this.bulletContainerDom.innerHTML = bullets.join(""); 
	}

	player() { 
        let index = this.currentMusicIndex;
        this.listLocator(index);
        this.bulletHandler(index).active();
        this.titleDom.innerHTML = this.playList[index].title;
        this.artistDom.innerHTML = this.playList[index].artist;
        this.barPlayDom.style.width = this.currentMusicProgress / this.playList[index].playTime * 100 + "%";
		this.turnTableDom.style.backgroundImage = "url('"+ this.playList[index].imageUrl +"')"

        this.timer = setInterval(() => {
            if (this.currentMusicProgress === this.playList[index].playTime) {
                clearInterval(this.timer);
                this.currentMusicProgress = 0;
                this.nextMusic();
                return false;
            } else {
                ++this.currentMusicProgress;
                this.barPlayDom.style.width = this.currentMusicProgress / this.playList[index].playTime * 100 + "%";
            }
        }, 1000);
	}

    /**
    *  input music index, then player run
    *
    *  @param {Number} index
    */
    playMusic(index) {
        // if index passed, it means play specific music
        if(typeof index === 'number') {
            this.bulletHandler(this.currentMusicIndex).inactive();
            this.currentMusicProgress = 0;
            this.currentMusicIndex = index;
        }
        this.player(this.currentMusicIndex);
        this.turnTableDom.classList.remove('paused');
    }

    // pause player
	pauseMusic() {
        clearInterval(this.timer);
        this.turnTableDom.classList.add('paused');
    }

    // play next music
	nextMusic() {
        // if last music of list, go to the first music
		if (this.currentMusicIndex >= this.playList.length - 1) {
            this.bulletHandler(this.currentMusicIndex).inactive();
			this.currentMusicIndex = 0;
		} else {
            this.bulletHandler(this.currentMusicIndex).inactive();
			this.currentMusicIndex = ++this.currentMusicIndex;
		}
		this.playMusic();
	}

    // play previous music
	prevMusic() {
		if (this.currentMusicIndex <= 0) {
            this.bulletHandler(this.currentMusicIndex).inactive();
			this.currentMusicIndex = this.playList.length;
		} else {
            this.bulletHandler(this.currentMusicIndex).inactive();
			this.currentMusicIndex = --this.currentMusicIndex;
		}
		this.playMusic();
	}

    bulletHandler(index) {
        return {
            active: () => {
                this.bulletContainerDom.querySelectorAll(".bullet")[index].classList.add('active');
            },
            inactive: () => {
                this.bulletContainerDom.querySelectorAll(".bullet")[index].classList.remove('active');   
            }
        }
    }

    // handle list using egjs-axes
    listHandler() {
        let uinitDeg =  360 / this.playList.length; // 단위각
        let unitRad = uinitDeg * Math.PI / 180; // 단위라디안
        let rangeRad = unitRad / 2; // 범위라디안
        let destMusicIndex; // 라디안 계산에 의해 실행될 음악
        let translateZ =  Math.round( ( 210  / 2 ) /  Math.tan( Math.PI / this.playList.length ));
        
        let axes = new eg.Axes({
            axis: {
                rotateX: {
                    range: [0, 360],
                    circular: true
                },
            },
            deceleration: 0.0024
        }).on({
            "change": (e) => {
                this.listCarouselDom.style[eg.Axes.TRANSFORM] = "translateZ("+ -1 * translateZ +"px) rotateY(" + e.pos.rotateX + "deg)";
            },
            "hold": (e) => {
                this.pauseMusic();
            },
            "release": (e) => {
                destMusicIndex = 0;
                let currentRadian = e.destPos.rotateX * Math.PI / 180; // 현재라디안

                // 자기자신의 범위라디안에 들어온 뮤직을 가운데로 위치
                for(let i = 0; i < this.playList.length; i++) {
                    if(unitRad * i - rangeRad <= currentRadian && currentRadian <= unitRad * i + rangeRad) {
                        destMusicIndex = this.playList.length - i === this.playList.length ? 0 : this.playList.length - i;
                        this.listCarouselDom.style[eg.Axes.TRANSFORM] = "translateZ("+ -1 * translateZ +"px) rotateY(" + uinitDeg * i + "deg)";
                    }
                }
                this.playMusic(destMusicIndex);
            },
            "animationEnd": (e) => {
                // 관성에 의해 더 간경우
                this.listLocator(destMusicIndex);
            }
        }).mapInput(["rotateX", null], new eg.Axes.HammerInput("#list_carousel"))
    }
    
    listLocator(locate) {
        let uinitDeg =  360 / this.playList.length; // 단위각
        let translateZ =  Math.round( ( 210  / 2 ) /  Math.tan( Math.PI / this.playList.length ));
        let allocator = this.playList.length - locate;
        this.listCarouselDom.style[eg.Axes.TRANSFORM] = "translateZ("+ -1 * translateZ +"px) rotateY(" + uinitDeg * allocator + "deg)";
    }

	turnTableHandler() {
        let axes = new eg.Axes({
            axis: {
                rotateX: {
                    range: [0, 360],
                    circular: true
                },
                rotateY: {
                    range: [0, 360],
                    circular: true
                }
            },
            deceleration: 0.0024
        }).on({
            "change": (e) => {
            },
            "hold": (e) => {
                this.pauseMusic();
            },
            "release": (e) => {
                this.playMusic();
            }
        }).mapInput(["rotateX", "rotateY"], new eg.Axes.HammerInput(".turntable_container"));
	}
}

(() => {
	const egjsPlayer = new MusicPlayer(samplePlayList);

	egjsPlayer.init();
})();
