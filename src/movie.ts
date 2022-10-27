export class Movie {

    public static readonly CHILDRENS = 2
    public static readonly REGULAR = 0
    public static readonly NEW_RELEASE = 1

    public movieType

    constructor(
        public readonly title: string,
        public priceCode: number) {
            this.movieType = this.GetMovieType();
    }

    private GetMovieType()
    {   
        switch(this.priceCode) {
            case Movie.REGULAR:
                return '(regular)';
            case Movie.CHILDRENS:
                return '(childrens)';
            case Movie.NEW_RELEASE:
                return '(new release)'
        }
    }


}
