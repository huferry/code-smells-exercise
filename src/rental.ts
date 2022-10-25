import {Movie} from "./movie";

export class Rental {
    constructor(
        public readonly movie: Movie,
        public readonly daysRented: number) {
    }

    public calcPrice(): number {
        return this.movie.priceCalculator(this.daysRented)
    }
}
