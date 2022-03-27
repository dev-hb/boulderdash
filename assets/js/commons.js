export default class Commons {

    // Width et Height et Step de tous les objets dans l'espace de jeu
    static getMapCoeff = () => { return 40; }

    // lire un track MP3
    static playSound = (soundTrack, loop = "false") => {
        let url = "assets/media/" + soundTrack + ".mp3";
        let player = document.createElement("embed");
        player.setAttribute("src", url);
        player.setAttribute("loop", "false");
        player.setAttribute("autostart", "true");
        document.getElementById('soundtracks').appendChild(player);
    }

}