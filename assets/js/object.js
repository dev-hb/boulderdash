import Commons from "./commons.js";

export class FieldObject {

    constructor(map, type, key, x, y){
        // map
        this.map = map;
        this.key = key;
        // attributes
        this.id = type + x + '-' + y;
        this.type = type;
        this.x = x;
        this.y = y;
    }

    // modifier les coordonnées un objet de l'espace de jeu
    updateObjectCoords(newCoords){
        this.map.currentSettings[this.type][this.key].x = newCoords[0] / Commons.getMapCoeff();
        this.map.currentSettings[this.type][this.key].y = newCoords[1] / Commons.getMapCoeff();
    }

    // get DOM element
    getDOM = () => {
        return document.getElementById(this.id);
    }
}