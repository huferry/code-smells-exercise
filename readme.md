# Code Smells Exercises

## 1. The Story
The program is about printing customer's statement at a video store.
The customer's statement contains the rented movies with its individual
cost. At the end of the statement the total amount and the earned
frequent-rental-points are printed.

There are 3 movie categories: regular, new release and childrens, and each
has different charges.

- Regular: €2 for the first 2 days, and €1.50 for each following day.
- New release: €3 a day
- Childrens: €1.50 for the first 3 days, and €1.50 for each following day.

The frequent-rental-points are counted as follows:
- 1 point for each movie
- 1 extra point for new release, rented at least 2 days

Example of a statement:
```
-------------- start statement --------------
Rental Record for John Baxter
        Fire of Love                    € 6
        Cow                             € 15
        Maleficent                      € 3
        Hubie Halloween                 € 2
---------------------------------------------
Amount owed is € 26
You earned 6 frequent renter points
--------------- end statement ---------------
```

## 2. Getting Started

**Prerequisites:**
- [NodeJS](https://nodejs.org/en/)

**Before starting anything:**
```
> npm install
> npm install -g npx
```

**Start unit tests:**
```
> node test
```

**Start example:**
```
> npx ts-node ./example.ts
```
