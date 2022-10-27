export abstract class Movie {

    public static readonly CHILDRENS = 2
    public static readonly REGULAR = 0
    public static readonly NEW_RELEASE = 1

    constructor(
        public readonly title: string,
        public priceCode: number) {
    }

    public abstract bepaal_prijs(aantal_dagen: number): number
}

export class ChildrensMovie extends Movie{
    bepaal_prijs(aantal_dagen: number){
        let prijs = 0
        prijs += aantal_dagen * 1.5
        console.log ("prijs voor kinderfilm bepaald op " + prijs)
        return prijs
    }
}

export class PornoMovie extends Movie{
    bepaal_prijs(aantal_dagen: number){
        let prijs = 0
        prijs += aantal_dagen * 8
        console.log ("prijs voor pornofilm bepaald op " + prijs)
        return prijs
    }    
}

export class NewMovie extends Movie {
    bepaal_prijs(aantal_dagen: number){
        let prijs = 0
        prijs += aantal_dagen * 8
        console.log ("prijs voor nieuwe film bepaald op " + prijs)
        return prijs
    }   
}

export class RegularMovie extends Movie {
    bepaal_prijs(aantal_dagen: number){
        let prijs = 0
        prijs += aantal_dagen * 8
        console.log ("prijs voor reguliere film bepaald op " + prijs)
        return prijs
    }   
}