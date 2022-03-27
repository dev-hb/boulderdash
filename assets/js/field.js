export class Field {
    constructor(id){
        // l'objet DOM de l'espace de jeu
        this.object = document.getElementById(id);
        this.width = 1280; // par défaut
        this.height = 640; // par défaut
        // redimensionner l'espace de travail
        this.object.style.width = this.width;
        this.object.style.height = this.height;
    }

    getFieldDOM = () => {
        return this.object;
    }
}