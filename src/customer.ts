import {Rental} from "./rental";
import {Movie} from "./movie";
import {EmailSender} from "./emailSender";
import { forEachLeadingCommentRange } from "typescript";

export class Customer {
    private readonly _rentals: Rental[] = []

    constructor(public readonly name: string) {
    }

    public addRental(rental: Rental) {
        this._rentals.push(rental)
    }

  private bepaal_hoeveel_te_betalen(huur: Rental){
        let bedrag = 0
        if (huur.movie.priceCode === Movie.REGULAR) { 
            bedrag += 2
            if (huur.daysRented > 2) {
                bedrag += (huur.daysRented - 2) * 1.5
            }
            console.log ('functie: regular')
            console.log(bedrag)
        }
        if (huur.movie.priceCode === Movie.NEW_RELEASE) {
            bedrag += huur.daysRented * 3
            console.log ('functie: nieuwe release')
            console.log(bedrag)                   
        }
        if (huur.movie.priceCode === Movie.CHILDRENS) {
            bedrag += 1.5
            if (huur.daysRented > 3) { bedrag += (huur.daysRented -3)*1.5}
            console.log ('functie: kinderfilm')
            console.log(bedrag)            
        }
        return bedrag
    }

    public statement(): string {
        let totalAmount = 0
        let frequentRenterPoints = 0
        let result = '-------------- start statement --------------\n'
        result += 'Rental Record for ' + this.name + '\n'

        this._rentals.forEach(each => {
            let thisAmount = 0

            // determine amounts for each line
            /* 
            switch(each.movie.priceCode) {
                case Movie.REGULAR:
                    // 2 euros for the first 2 days. 1.5 euros for any extra day.
                    thisAmount += 2
                    if (each.daysRented > 2) {
                        thisAmount += (each.daysRented - 2) * 1.5
                    }
                    console.log ('Oorspronkelijk: regular')
                    console.log(thisAmount)
                    break
                case Movie.NEW_RELEASE:
                    // 3 euros per day
                    thisAmount += each.daysRented * 3
                    console.log ('Oorspronkelijk: nieuwe release')
                    console.log(thisAmount)                   
                    break
                case Movie.CHILDRENS:
                    // 1.5 euros for the first 3 days. 1.5 euros for each following day
                    thisAmount += 1.5
                    if (each.daysRented > 3) {
                        thisAmount += (each.daysRented - 3) * 1.5
                    }
                    console.log ('Oorspronkelijk: kinderfilm')
                    console.log(thisAmount)
                    break
            }
            */
            
            // thisAmount = this.bepaal_hoeveel_te_betalen(each)

            thisAmount = each.movie.bepaal_prijs(each.daysRented)

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

    public sendPromotion(
        promotionTitle: string,
        movieTitle1: string,
        moviePriceCode1: number,
        movieTitle2: string,
        moviePriceCode2: number,
        startPromotionDate: Date,
        endPromotionDate: Date,
        discountInPercent: number,
        extraFrequentRenterPoints: number,
        customerEmailAddress: string): void {

        let letter = 'Dear ' + this.name + ',\n\n'

        letter += 'We would gladly announce our newest personal offer in the "' + promotionTitle +'".\n'
        letter += 'Special for this offer:\n'

        let movieType1
        switch(moviePriceCode1) {
            case Movie.REGULAR:
                movieType1 = '(regular)'
                break
            case Movie.CHILDRENS:
                movieType1 = '(childrens)'
                break
            case Movie.NEW_RELEASE:
                movieType1 = '(new release)'
        }

        // add the first promotion movie
        letter += '\t -' + movieTitle1 + ' ' + movieType1 + '\n'

        let movieType2
        switch(moviePriceCode2) {
            case Movie.REGULAR:
                movieType2 = '(regular)'
                break
            case Movie.CHILDRENS:
                movieType2 = '(childrens)'
                break
            case Movie.NEW_RELEASE:
                movieType2 = '(new release)'
        }

        // add second promotion movie
        letter += '\t -' + movieTitle2 + ' ' + movieType2 + '\n'
        // add empty line
        letter += '\n'

        // add discount
        if (discountInPercent > 0) {
            letter += 'For renting this movie, you will get a ' +
                discountInPercent.toFixed(0) + '% discount.\n'
        }

        // add extra frequent renter points
        if (extraFrequentRenterPoints > 0) {
            letter += 'Plus... you will get ' + extraFrequentRenterPoints + ' extra frequent renter point(s).\n'
        }

        letter += '\nBe quick, because this promotion will start on ' +
            startPromotionDate.toLocaleDateString() +
            ' and valid until ' + endPromotionDate.toLocaleDateString() +
            '\n'

        letter += '\nSincerely,\nGlow Parker\n(Chief Marketing Officer)'

        let sender = new EmailSender()

        // actually send the promotion email
        sender.send(
            this.name,
            customerEmailAddress,
            'Our newest promotion: ' + promotionTitle,
            letter)
    }
}
