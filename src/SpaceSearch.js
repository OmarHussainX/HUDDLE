class SpaceSearch {

    /* --------------------------------
    filterByRate takes two parameters:
    - a reference to a space object
    - a numeric search value which is guaranteed to be one of:
      0     ( free spaces )
      25    ( 1-25 range )
      50    ( 26-50 range )
      75    ( 51-75 range )
      100   ( 76+ range )

    returns a value (0 or 1) reflecting how well the space matches the specified rate
    */
    static filterByRate(space, searchValue) {
        searchValue = parseInt(searchValue)
        let matchValue = null

        switch (searchValue) {
            // ( free spaces )
            case 0:
                matchValue = space.rate === 0 ? 1 : 0
                break

            // ( 1-25 range )
            case 25:
                matchValue = (space.rate > 0 && space.rate <= 25) ? 1 : 0
                break

            // ( 26-50 range )
            case 50:
                matchValue = (space.rate > 25 && space.rate <= 50) ? 1 : 0
                break

            // ( 51-75 range )
            case 75:
                matchValue = (space.rate > 51 && space.rate <= 75) ? 1 : 0
                break

            // ( 76+ range )
            case 100:
                matchValue = (space.rate > 75) ? 1 : 0
                break

            default:
        }
        console.log(`----- Yo! ${space.name} gets a value of ${matchValue} for 'rate range ${searchValue}'`)
        return matchValue
    }



    /* --------------------------------
    filterByCapacity takes two parameters:
    - a reference to a space object
    - a numeric search value which is guaranteed to be one of:
      5     ( 1-5 range )
      10    ( 6-10 range )
      15    ( 11-15 range )
      20    ( 16+ range )
    
    returns a value (0 or 1) reflecting how well the space matches the specified rate
    */
    static filterByCapacity(space, searchValue) {
        searchValue = parseInt(searchValue)
        let matchValue = null

        switch (searchValue) {
            // ( 1-5 range )
            case 5:
                matchValue = space.capacity <= 5 ? 1 : 0
                break

            // ( 6-10 range )
            case 10:
                matchValue = (space.capacity > 5 && space.capacity <= 10) ? 1 : 0
                break

            // ( 11-15 range )
            case 15:
                matchValue = (space.capacity > 10 && space.capacity <= 15) ? 1 : 0
                break

            // ( 16+ range )
            case 20:
                matchValue = (space.capacity > 15) ? 1 : 0
                break

            default:
        }
        console.log(`----- Yo! ${space.name} gets a value of ${matchValue} for 'capacity range ${searchValue}'`)
        return matchValue
    }


























    /*
    filterByName takes two parameters:
    - a reference to a collection of all spaces
    - a string value to search for

    performs a case insensitive search
    returns an array of space Objects whose name includes the specified string
    (allowing for partial name searches)
    */
    static filterByName(spaceData, searchString) {
        return spaceData.filter(space => space.name.toLowerCase().includes(searchString.toLowerCase()))
    }
    

    /*
    filterByLocation takes three parameters:
    - a reference to a collection of all spaces
    - a string indicating the type of location search needed (quadrant, street, city)
    - a string value to search for

    performs a case insensitive search
    returns an array of space Objects whose location matches the specified criteria
    */
    static filterByLocation(spaceData, searchType, searchString) {
        let filteredSpaces = []

        switch (searchType) {
            case 'quadrant':
            filteredSpaces = spaceData.filter(space => space.address.quadrant.toUpperCase() === searchString.toUpperCase())
            break

            case 'street':
            case 'city':
            filteredSpaces = spaceData.filter(space => space.address[searchType].toLowerCase().includes(searchString.toLowerCase()))
            break

            default:
        }
        return filteredSpaces
    }
    /*
    filterByAvailability takes two parameters:
    - a reference to a collection of all spaces
    - a search value which is guaranteed to be one of the days of the week

    returns an array of space Objects whose availability matches the specified day
    */
    static filterByAvailability(spaceData, day) {
        let filteredSpaces = []
        day = day.toLowerCase()

        switch (day) {
            case 'sunday':
            case 'monday':
            case 'tuesday':
            case 'wednesday':
            case 'thursday':
            case 'friday':
            case 'saturday':
            filteredSpaces = spaceData.filter(space => space.availability[day])
            break

            default:
        }
        return filteredSpaces
    }
}

export {SpaceSearch}