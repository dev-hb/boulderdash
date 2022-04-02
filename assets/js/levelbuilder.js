export class LevelBuilder {

    constructor(game, levelId){
        this.level = {
            'level': levelId, 'walls' : [], 'dirts' : [],
            'gems' : [], 'rocks' : []
        };
        this.sheet = "GWWWWWWWWWWWWWWWWWWW\nDDDDDDDDDGGGGGGDDDDDDWWWW";
    }

    // créer un niveau à partir de fichier texte map
    build(){
        this.sheet.split("\n").map((row, rowKey) => {
            row.split('').map((col, colKey) => {
                switch(col) {
                    case 'W': this.level['walls'].push([rowKey, colKey]); break;
                    case 'D': this.level['dirts'].push([rowKey, colKey]); break;
                    case 'G': this.level['gems'].push([rowKey, colKey]); break;
                    case 'R': this.level['rocks'].push([rowKey, colKey]); break;
                    default: console("Caractères non reconnu ignoré dans le fichier séléctionné!!");
                }
            });
        });

        console.log(this.level)
        return this;
    }

    getLevel(){
        return this.level;
    }

}