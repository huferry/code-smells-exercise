import {Rental} from "./rental";
import {Movie} from "./movie";
import {EmailSender} from "./emailSender";

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
            // determine amounts for each line

            let thisAmount = this.getPrice(each.daysRented, each.movie.priceCode);
          
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

    private getPrice(daysRented: number, priceCode: number): number{
        switch(priceCode) {
            case Movie.REGULAR:
                // 2 euros for the first 2 days. 1.5 euros for any extra day.
                if (daysRented > 2) {
                    return 2+(daysRented - 2) * 1.5
                }
                return 2
            case Movie.NEW_RELEASE:
                // 3 euros per day
                return daysRented * 3
            case Movie.CHILDRENS:
                // 1.5 euros for the first 3 days. 1.5 euros for each following day
                if (daysRented > 3) {
                    return 1.5 + (daysRented - 3) * 1.5
                }
                return 1.5
            default:
                return 0
        }
    }

    public GetLetter(
        promotionTitle: string,
        movie1: Movie,
        movie2: Movie,
        startPromotionDate: Date,
        endPromotionDate: Date,
        discountInPercent: number,
        extraFrequentRenterPoints: number){

        let letter = 'Dear ' + this.name + ',\n\n'

        letter += 'We would gladly announce our newest personal offer in the "' + promotionTitle +'".\n'
        letter += 'Special for this offer:\n'

        // add the first promotion movie
        letter += '\t -' + movie1.title + ' ' + movie1.movieType + '\n'

        // add second promotion movie
        letter += '\t -' + movie2.title + ' ' + movie2.movieType + '\n'

        // add empty line
        letter += '\n'

        // add discount
        if (discountInPercent > 0) {
            letter += 'For renting this movie, you will get a ' + discountInPercent.toFixed(0) + '% discount.\n'
        }

        // add extra frequent renter points
        if (extraFrequentRenterPoints > 0) {
            letter += 'Plus... you will get ' + extraFrequentRenterPoints + ' extra frequent renter point(s).\n'
        }

        letter += '\nBe quick, because this promotion will start on ' +
            startPromotionDate.toLocaleDateString() +
            ' and valid until ' + endPromotionDate.toLocaleDateString() + '\n'

        letter += '\nSincerely,\nGlow Parker\n(Chief Marketing Officer)';

        return letter;
    }

    public sendPromotion(
        promotionTitle: string,
        movie1: Movie,
        movie2: Movie,
        startPromotionDate: Date,
        endPromotionDate: Date,
        discountInPercent: number,
        extraFrequentRenterPoints: number,
        customerEmailAddress: string): void {
        
        let letter = this.GetLetter(promotionTitle, movie1, movie2, startPromotionDate,
                endPromotionDate, discountInPercent, extraFrequentRenterPoints)

        let sender = new EmailSender()

        // actually send the promotion email
        sender.send(
            this.name,
            customerEmailAddress,
            'Our newest promotion: ' + promotionTitle,
            letter)
    }
}
