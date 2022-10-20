export class Movie {

    public static readonly CHILDRENS = 2
    public static readonly REGULAR = 0
    public static readonly NEW_RELEASE = 1

    constructor(
        public readonly title: string,
        public priceCode: number) {
    }
}
