export class Map {


    constructor(field, level){
        this.field = field;
        // paramètres globales
        this.map_coeff = 40; // taille d'un carré sur le map
        // paramêtres de map
        this.level = level;
        this.draw();
    }

    draw(level){
        if(! level) level = this.level;
        let settings = this.levels()[level -1];
        // dessiner les murs
        settings.walls.map((wall) => {
            let w = document.createElement('div');
            w.style.marginLeft = wall[0] * this.map_coeff;
            w.style.marginTop = wall[1] * this.map_coeff;
            w.className = 'wall';
            this.field.object.appendChild(w);
        });
    }

    getLevelSettings = () => {
        return this.levels()[this.level -1];
    }

    levels(){
        return [
            {
                'level': 1,
                'walls' : [
                    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[12,6],[13,6],[14,6],[15,6],[16,6],[17,6],[18,6],[19,6],[20,6],
                    [17,9],[18,9],[19,9],[20,9],[21,9],[22,9],[23,9],[24,9],[25,9],[26,9],[27,9],[28,9],[29,9],
                ]
            }
        ]
    }
}