/* **********************************************
*
*	MusicPlayer component
*
*	autor: doyoon.kim doyoon.kim@navercorp.com
*   github: @BillionaireDY
*	date: 2017.07.11
*	latest update: 2017.07.11
*	notice: -
*
********************************************** */

class Music {
	constructor(title, artist, playTime, color, subColor) {
        /**
        *  Music class
        *
        *  @param {String} title
        *  @param {String} artist
        *  @param {Number} playTime
        *  @param {String} color
        *  @param {String} subColor
        */
		this.title = title;
		this.artist = artist;
		this.playTime = playTime;
		this.color = color;
		this.subColor = subColor;
	}
}

const samplePlayList = [
	new Music("My passion is red", "Reddy", 14, "red", "red"),
	new Music("title2", "Orangy", 15, "orange", "orange"),
	new Music("title3", "Yello", 13, "yellow", "yellow"),
	new Music("title3", "Greenist", 14, "green", "green"),
	new Music("title3", "Blues", 15, "blue", "blue"),
	new Music("title3", "Naver", 14, "navy", "navy"),
	new Music("title3", "Pupler", 15, "purple", "purple"),
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
		this.listContainerDom = document.getElementById("list_container");
		this.titleDom = document.getElementById("title");
		this.artistDom = document.getElementById("artist");
        this.barPlayDom = document.getElementById("bar_play");
	}

	init() {
		this.currentMusicIndex = 0;

        // eventListener declaration 
        // this.turnTableDom.addEventListener("mousedown", (e) => {
        //     this.pauseMusic();
        // });

        // this.turnTableDom.addEventListener("mouseup", (e) => {
        //     this.playMusic();
        // });

        this.initPlayListPannel();
		this.playMusic();
        this.turnTableHandler();
	}

    // make list Dom to the bottom of music player
	initPlayListPannel() {
	    let pannel = this.playList.map((music, index) => {
		    return `<figure>` +
                `<div id="list_cd" style="background-color:` + music.color + `"/>` +
                        `<div id="list_cd_hole"></div>` +
                `</div>` +
                `<div id="list_cd_title">` + music.title + `</div>` +
            '</figure>';
	    });
		this.listContainerDom.innerHTML = pannel.join("");
	}

    /**
    *  core of music player
    *
    *  @param {Number} index
    */
	player(index) { 
        this.currentMusicProgress;
        this.barPlayDom.style.width = this.currentMusicProgress / this.playList[index].playTime * 100 + "%";
        this.titleDom.innerHTML = this.playList[index].title;
		this.artistDom.innerHTML = this.playList[index].artist;
		this.turnTableDom.style.backgroundColor = this.playList[index].color;

        this.timer = setInterval(() => {
            if (this.currentMusicProgress === this.playList[index].playTime) {
                clearInterval(this.timer);
                this.currentMusicProgress = 0;
                this.nextMusic();
                return false;
            } else {
                ++this.currentMusicProgress;
                console.log(this.currentMusicProgress)
                this.barPlayDom.style.width = this.currentMusicProgress / this.playList[index].playTime * 100 + "%";
            }
        }, 1000);
	}

    // play player
    playMusic() {
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
			this.currentMusicIndex = 0;
		} else {
			this.currentMusicIndex = ++this.currentMusicIndex;
		}
		this.player(this.currentMusicIndex);
	}

    // play previous music
	prevMusic() {
		if (this.currentMusicIndex <= 0) {
			this.currentMusicIndex = this.playList.length;
		} else {
			this.currentMusicIndex = --this.currentMusicIndex;
		}
		this.player(this.currentMusicIndex);
	}

    // handle turn table using egjs-axes
	turnTableHandler() {
        let axes = new eg.Axes({
            axis: {
                rotateX: {
                    range: [0, 360],
                    // circular: true
                },
                rotateY: {
                    range: [0, 360],
                    // circular: true
                }
            },
            deceleration: 0.0024
        }).on({
            "change": (e) => {
                console.log(e.pos.rotateX, ' ', e.pos.rotateY);
                // this.turnTableDom.style[eg.Axes.TRANSFORM] = "rotate(" + e.pos.rotateX + "deg)";
            },
            "hold": (e) => {
                this.pauseMusic();
            },
            "release": (e) => {
                this.playMusic();
            }
        }).mapInput(["rotateX", "rotateY"], new eg.Axes.HammerInput(".turntable_container"))
        // .setTo({
        //     "rotateX": 40,
        //     "rotateY": 315
        // }, 100);
        window._axes = axes;
	}
}

(() => {
	const egjsPlayer = new MusicPlayer(samplePlayList);

	egjsPlayer.init();
})();
