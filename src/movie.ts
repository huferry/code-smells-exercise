type PriceCalculator = (daysRented: number) => number

const regularPriceCalculator: PriceCalculator = daysRented => {
    const additionDaysPrice = () => daysRented > 2 ? (daysRented - 2) * 1.5 : 0

    return 2 + additionDaysPrice()
}

const childrensPriceCalculator: PriceCalculator = daysRented => {
    const additionDaysPrice = () => daysRented > 3 ? (daysRented - 3) * 1.5 : 0

    return 1.5 + additionDaysPrice()
}

const newReleasePriceCalculator: PriceCalculator = daysRented => daysRented * 3

export class Movie {

    public static readonly CHILDRENS = 2
    public static readonly REGULAR = 0
    public static readonly NEW_RELEASE = 1

    private constructor(
        public readonly title: string,
        public priceCode: number,
        public priceCalculator: PriceCalculator) {
    }

    public static CreateChildrens(title: string): Movie {
        return new Movie(title, Movie.CHILDRENS, childrensPriceCalculator)
    }

    public static CreateRegular(title: string): Movie {
        return new Movie(title, Movie.REGULAR, regularPriceCalculator)
    }

    public static CreateNewRelease(title: string): Movie {
        return new Movie(title, Movie.NEW_RELEASE, newReleasePriceCalculator)
    }
}
