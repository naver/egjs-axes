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
	new Music("My passion is red", "Reddy", 12, "red", "red"),
	new Music("title2", "Orangy", 14, "orange", "orange"),
	new Music("title3", "Yello", 9, "yellow", "yellow"),
	new Music("title3", "Greenist", 13, "green", "green"),
	new Music("title3", "Blues", 14, "blue", "blue"),
	new Music("title3", "Naver", 10, "navy", "navy"),
	new Music("title3", "Pupler", 8, "purple", "purple"),
];

class MusicPlayer {
    /**
    *  MusicPlayer class
    *
    *  @param {object} playList
    */
	constructor(playList) {
		this.currentMusicIndex = 0;
		this.playList = samplePlayList;
	    // for Dom controll
		this.turnTableDom = document.getElementById("turntable");
		this.listContainerDom = document.getElementById("list_container");
		this.titleDom = document.getElementById("title");
		this.artistDom = document.getElementById("artist");
	}

	init() {
		this.currentMusicIndex = 0;
		this.initPlayListPannel();
		this.playMusic(this.currentMusicIndex);
	}

	initPlayListPannel() {
	    let pannel = this.playList.map((music, index) => {
		    return `<figure>` +
                `<div id="list_cd" style="background-color:` + music.color + `"/>` +
                        `<div id="list_cd_hole"></div>` +
                `</div>` +
                `<div>` + music.title + `</div>` +
            '</figure>';
	});
		this.listContainerDom.innerHTML = pannel.join("");
	}

    // play music
	playMusic(index) {
        // music information setting;
		this.titleDom.innerHTML = this.playList[index].title;
		this.artistDom.innerHTML = this.playList[index].artist;
		this.turnTableDom.style.backgroundColor = this.playList[index].color;
		setTimeout(() => {
			this.nextMusic();
		}, this.playList[index].playTime * 1000);
	}

    // stop play music
	stopMusic() {

	}

    // play next music
	nextMusic() {
		if (this.currentMusicIndex > this.playList.length) {
			this.currentMusicIndex = 0;
		} else {
			this.currentMusicIndex = ++this.currentMusicIndex;
		}
		this.playMusic(this.currentMusicIndex);
	}

    // play previous music
	prevMusic() {
		if (this.currentMusicIndex <= 0) {
			this.currentMusicIndex = this.playList.length;
		} else {
			this.currentMusicIndex = --this.currentMusicIndex;
		}
		this.playMusic(this.currentMusicIndex);
	}

    // handle play time using egjs-axes
	playTimeHandler() {

	}
}

(() => {
	const egjsPlayer = new MusicPlayer(samplePlayList);

	egjsPlayer.init();
})();
