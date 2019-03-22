class Search {

    /*
    filterByName performs a case insensitive search
    returns an array of space Objects whose name includes the user-supplied string
    (allowing for partial name searches)
    */

    filterByName(spaceData, searchString) {
        return spaceData.filter(space => space.name.toLowerCase().includes(searchString.toLowerCase()))
    }
    

    /*
    filterByLocation performs a case insensitive search on different location criteria:
        - quadrant
        - street (address)
        - city

    returns an array of space Objects whose location matches the specified criteria
    */
   filterByLocation(spaceData, searchType, searchOption) {
        let filteredSpaces = []

        switch (searchType) {
            case 'quadrant':
            filteredSpaces = spaceData.filter(space => space.address.quadrant.toUpperCase() === searchOption.toUpperCase())
            break

            case 'street':
            case 'city':
            filteredSpaces = spaceData.filter(space => space.address[searchType].toLowerCase().includes(searchOption.toLowerCase()))
            break
            

            default:
            break
        }
        return filteredSpaces
    }
    

    // filterByPrice takes two parameters:
    // - a reference to a collection of all spaces
    // - a numeric search value which is guaranteed to be one of:
    //   0     ( free spaces )
    //   25    ( 1-25 range )
    //   50    ( 26-50 range )
    //   75    ( 51-75 range )
    //   100   ( 76+ range )

    filterByPrice(spaceData, searchValue) {
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
            case 76:
            filteredSpaces = spaceData.filter(space => space.rate > 75)
            break

            default:
        }
        return filteredSpaces
    }

    filterByAvailability() {
    }


}

export default Search