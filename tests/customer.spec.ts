import {Customer} from "../src/customer";
import {Movie} from "../src/movie";
import {Rental} from "../src/rental";

describe('statement', () => {

    it('should state name of customer', () => {
        // arrange
        const name = 'Jax Waxing'
        const customer = new Customer(name)

        // act
        const actual = customer.statement()

        // assert
        expect(actual).toContain(`Rental Record for ${name}`)
    })

    it('with 7 days regular movie, should cost 9.5 and add 1 frequent renter point', () => {
        // arrange
        const movie = new Movie('Mission Impossible', Movie.REGULAR)
        const rental = new Rental(movie, 7)

        const customer = new Customer('Boxy Batting')
        customer.addRental(rental)

        // act
        const actual = customer.statement()

        // assert
        expect(actual).toContain(`Mission Impossible            \t€ 9.5`)
        expect(actual).toContain('You earned 1 frequent renter points')
    })

    it('with 1 day regular movie, should cost 1', () => {
        // arrange
        const movie = new Movie('Days of The Thunder', Movie.REGULAR)
        const rental = new Rental(movie, 1)

        const customer = new Customer('Boxy Batting')
        customer.addRental(rental)

        // act
        const actual = customer.statement()

        // assert
        expect(actual).toContain(`Days of The Thunder           \t€ 2`)
    })

    it('with 2 day new release movie, should earn 2 frequent renter points', () => {
        // arrange
        const movie = new Movie('Top Gun: Mavrick', Movie.NEW_RELEASE)
        const rental = new Rental(movie, 2)

        const customer = new Customer('Boxy Batting')
        customer.addRental(rental)

        // act
        const actual = customer.statement()

        // assert
        expect(actual).toContain(`You earned 2 frequent renter points`)
    })

    it('with 3 days new release, should cost 21 and add 2 frequent renter point', () => {
        // arrange
        const movie = new Movie('Ticket to Paradise', Movie.NEW_RELEASE)
        const rental = new Rental(movie, 7)

        const customer = new Customer('Boxy Batting')
        customer.addRental(rental)

        // act
        const actual = customer.statement()

        // assert
        expect(actual).toContain(`Ticket to Paradise            \t€ 21`)
        expect(actual).toContain('You earned 2 frequent renter points')
    })

    it('with 3 movies, should state total amount', () => {
        // arrange
        const movie1 = new Movie('Ticket to Paradise', Movie.NEW_RELEASE)
        const rental1 = new Rental(movie1, 3)

        const movie2 = new Movie('Gone with The Wind', Movie.REGULAR)
        const rental2 = new Rental(movie2, 5)

        const movie3 = new Movie('Shrek', Movie.CHILDRENS)
        const rental3 = new Rental(movie3, 1)

        const customer = new Customer('Boxy Batting')
        customer.addRental(rental1)
        customer.addRental(rental2)
        customer.addRental(rental3)

        // act
        const actual = customer.statement()

        // assert
        expect(actual).toContain(`Amount owed is € 17`)
    })

})
