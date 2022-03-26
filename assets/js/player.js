export class Player {

    // Création de joueur avec une position initiale, par défaut 0,0
    constructor(field, map, objId, x=0, y=0){
        // objets globales
        this.field = field;
        this.map = map;
        // Caractériqtiques de joueur
        this.object = document.getElementById(objId); // l'objet DOM de joueur dans HTML (balise img)
        this.x = x; // coordonnée x de joueur
        this.y = y; // coordonnée y de joueur
        this.player_step_shift = 40; // nombre de pixels de mouvement pour une étape
    }


    loadEvents(){
        window.document.addEventListener('keydown', (e) => {
            let code = e.keyCode; // récupérer le code de caractère clavier saisi
            let x = this.x, y = this.y; // récupérer les coordonnées
            switch(code){ // vérifier les nouveaux coordonnées de joueur et les collisions avec les mûrs
                case 38: if(this.y >= this.player_step_shift){
                    y -= this.player_step_shift;
                    if(this.checkWallsCollisions(x, y)) return false;
                } break;
                case 40: if(this.y <= this.field.height - this.player_step_shift*2){
                    y += this.player_step_shift;
                    if(this.checkWallsCollisions(x, y)) return false;
                } break;
                case 37: if(this.x >= this.player_step_shift){
                    x -= this.player_step_shift;
                    if(this.checkWallsCollisions(x, y)) return false;
                } break;
                case 39: if(this.x <= this.field.width - this.player_step_shift*2) {
                        x += this.player_step_shift;
                    if(this.checkWallsCollisions(x, y)) return false;
                } break;
            }
            // modifier vers les nouvelles coordonnées
            this.x = x;
            this.y = y;
            // repositionner le joueur dans l'espace de jeu
            this.move();
        });
    }

    // redéplacer le joueur
    move(x = undefined, y = undefined){
        x = x ? x : this.x;
        y = y ? y : this.y;
        this.object.style.marginTop = y;
        this.object.style.marginLeft = x;
        // une fois le joueur boujé, vérifier les collisions
        this.manageCollisions();
    }

    manageCollisions(){
        // vérifier la collision avec les objets
    }

    checkWallsCollisions(newX, newY){
        let is_collised = false;
        this.map.getLevelSettings().walls.map((wall) => {
            if(newX == wall[0] * this.map.map_coeff && newY == wall[1] * this.map.map_coeff){
                is_collised = true; return true;
            }
        }); return is_collised;
    }
}