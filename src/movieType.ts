
import { Rental } from "./rental";
import { Movie } from "./movie";
import { EmailSender } from "./emailSender";
import { Customer } from "./customer"

export class MovieType {
    public movieType(moviePriceCode:Number) {
        switch(moviePriceCode) {
                case Movie.REGULAR:
                    return '(regular)'
                    break
                case Movie.CHILDRENS:
                    return '(childrens)'
                    break
                case Movie.NEW_RELEASE:
                    return  '(new release)'
            }
        
    }
}