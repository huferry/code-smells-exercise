import {Rental} from "./rental";
import {Movie} from "./movie";
import {EmailSender} from "./emailSender";
import {Promotion} from "./promotion";

export class Customer {
    private readonly _rentals: Rental[] = []

    constructor(public readonly name: string) {
    }

    public addRental(rental: Rental) {
        this._rentals.push(rental)
    }

    public statement(): string {
        let totalAmount = 0
        let frequentRenterPoints = 0
        let result = '-------------- start statement --------------\n'
        result += 'Rental Record for ' + this.name + '\n'

        this._rentals.forEach(each => {
            let thisAmount = 0

            // determine amounts for each line
            switch(each.movie.priceCode) {
                case Movie.REGULAR:
                    // 2 euros for the first 2 days. 1.5 euros for any extra day.
                    thisAmount += 2
                    if (each.daysRented > 2) {
                        thisAmount += (each.daysRented - 2) * 1.5
                    }
                    break
                case Movie.NEW_RELEASE:
                    // 3 euros per day
                    thisAmount += each.daysRented * 3
                    break
                case Movie.CHILDRENS:
                    // 1.5 euros for the first 3 days. 1.5 euros for each following day
                    thisAmount += 1.5
                    if (each.daysRented > 3) {
                        thisAmount += (each.daysRented - 3) * 1.5
                    }
                    break
            }

            // add frequent renter points
            frequentRenterPoints++
            // add bonus for two day new release rental
            if ((each.movie.priceCode === Movie.NEW_RELEASE) && (each.daysRented > 1)) {
                frequentRenterPoints++
            }

            // show figures for this rental
            result += '\t' + each.movie.title.padEnd(30) + '\t€ ' + thisAmount + '\n'

            // summing to the totalAmount
            totalAmount += thisAmount
        })

        // add footer lines
        result += '---------------------------------------------\n'
        result += 'Amount owed is € ' + totalAmount + '\n'
        result += 'You earned ' + frequentRenterPoints + ' frequent renter points\n'
        result += '--------------- end statement ---------------\n'

        return result
    }
}
