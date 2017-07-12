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
	new Music("My passion is red", "Reddy", 4, "red", "red"),
	new Music("title2", "Orangy", 5, "orange", "orange"),
	new Music("title3", "Yello", 3, "yellow", "yellow"),
	new Music("title3", "Greenist", 4, "green", "green"),
	new Music("title3", "Blues", 5, "blue", "blue"),
	new Music("title3", "Naver", 4, "navy", "navy"),
	new Music("title3", "Pupler", 5, "purple", "purple"),
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
        this.playStatus = false;
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
        this.turnTableDom.addEventListener("mousedown", (e) => {
            this.pauseMusic();
        });

        this.turnTableDom.addEventListener("mouseup", (e) => {
            this.playMusic();
        });

        this.initPlayListPannel();
		this.playMusic();
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
        let autoPlayNext;
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
        this.playStatus = true;
        this.player(this.currentMusicIndex);
    }

    // pause player
	pauseMusic() {
        this.playStatus = false;
        clearInterval(this.timer);
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
        let axes = new egAxes({
            axis: {
                angle: {
                    range: [0, 360],
                    circular: true
                }
            },
            deceleration: 0.1
        }).on("change", (e) => {

        })
	}
}

(() => {
	const egjsPlayer = new MusicPlayer(samplePlayList);

	egjsPlayer.init();
})();
