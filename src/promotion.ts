
import { Rental } from "./rental";
import { Movie } from "./movie";
import { EmailSender } from "./emailSender";
import { Customer } from "./customer"
import { MovieType} from "./movieType";

export class Promotion {
    constructor(public customer:Customer, movieType:MovieType){}

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

        let letter = 'Dear ' + this.customer.name + ',\n\n'

        letter += 'We would gladly announce our newest personal offer in the "' + promotionTitle + '".\n'
        letter += 'Special for this offer:\n'


        let movieType1 = this.movieType.movieType(moviePriceCode1)

        // add the first promotion movie
        letter += '\t -' + movieTitle1 + ' ' + movieType1 + '\n'

        let movieType2 = this.movieType(moviePriceCode2)

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
            this.customer.name,
            customerEmailAddress,
            'Our newest promotion: ' + promotionTitle,
            letter)
    }
}