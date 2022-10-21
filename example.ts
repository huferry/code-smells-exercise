import {Customer} from "./src/customer";
import {Movie} from "./src/movie";
import * as fs from "fs"
import {Rental} from "./src/rental";

async function main() {
    const movies: Movie[] = await readData<Movie[]>('./data/movies.json')
    const newReleases = movies.filter(m => m.priceCode === 1)
    const children = movies.filter(m => m.priceCode === 2)
    const regular = movies.filter(m => m.priceCode === 0)

    const customer = new Customer('John Baxter')
    customer.addRental(new Rental(newReleases[0], 2))
    customer.addRental(new Rental(newReleases[1], 5))
    customer.addRental(new Rental(children[3], 4))
    customer.addRental(new Rental(regular[1], 2))

    console.log(customer.statement())

    customer.sendPromotion(
        'Happy Schwarzenegger Weeks!',
        `The Expendables 8: I can't afford it`,
        Movie.NEW_RELEASE,
        'Terminator 2: The Judgment Day',
        Movie.REGULAR,
        new Date(2028, 3, 1),
        new Date(2028, 5, 1),
        10,
        2,
        'john.b@gmaul.com')
}

main().then(() => console.log('\nend of example\n'))

async function readFile(filename: string) {
    return (await fs.promises.readFile(filename)).toString()
}

async function readData<T>(filename: string): Promise<T> {
    return JSON.parse(await readFile(filename)) as T
}
