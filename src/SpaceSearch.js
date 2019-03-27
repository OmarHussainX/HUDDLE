class SpaceSearch {

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
    filterByRate takes two parameters:
    - a reference to a collection of all spaces
    - a numeric search value which is guaranteed to be one of:
      0     ( free spaces )
      25    ( 1-25 range )
      50    ( 26-50 range )
      75    ( 51-75 range )
      100   ( 76+ range )

    returns an array of space Objects whose price matches the specified range
    */
    static filterByRate(spaceData, searchValue) {
        searchValue = parseInt(searchValue)
        let filteredSpaces = []

        switch (searchValue) {
            // ( free spaces )
            case 0:
            filteredSpaces = spaceData.filter(space => space.rate === 0 )
            break

            // ( 0-25 range )
            case 25:
            filteredSpaces = spaceData.filter(space => space.rate > 0 && space.rate <= 25)
            break

            // ( 26-50 range )
            case 50:
            filteredSpaces = spaceData.filter(space => space.rate > 25 && space.rate <= 50)
            break

            // ( 51-75 range )
            case 75:
            filteredSpaces = spaceData.filter(space => space.rate > 51 && space.rate <= 75)
            break

            // ( 76+ range )
            case 100:
            filteredSpaces = spaceData.filter(space => space.rate > 75)
            break

            default:
        }
        return filteredSpaces
    }


    /*
    filterByCapacity takes two parameters:
    - a reference to a collection of all spaces
    - a numeric search value which is guaranteed to be one of:
      5     ( 1-5 range )
      10    ( 6-10 range )
      15    ( 11-15 range )
      20    ( 16+ range )

    returns an array of space Objects whose capacity matches the specified range
    */
   static filterByCapacity(spaceData, searchValue) {
    searchValue = parseInt(searchValue)
    let filteredSpaces = []

    switch (searchValue) {
        // ( 1-5 range )
        case 5:
        filteredSpaces = spaceData.filter(space => space.capacity <= 5)
        break

        // ( 6-10 range )
        case 10:
        filteredSpaces = spaceData.filter(space => space.capacity > 5 && space.capacity <= 10)
        break

        // ( 11-15 range )
        case 15:
        filteredSpaces = spaceData.filter(space => space.capacity > 10 && space.capacity <= 15)
        break

        // ( 16+ range )
        case 20:
        filteredSpaces = spaceData.filter(space => space.capacity > 15)
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