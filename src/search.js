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
    // - a search value which is guaranteed to be one of:
    //   25    ( 0-25 range )
    //   50    ( 26-50 range )
    //   75    ( 51-75 range )
    //   76    ( 76-100 range )

    filterByPrice(spaceData, searchValue) {
        let filteredSpaces = []

        switch (searchValue) {
            // ( 0-25 range )
            case 25:
            break

            // 
            case 50:
            break

            // 
            case 75:
            break

            // 
            case 76:
            break

            default:
        }



        return filteredSpaces
    }

    filterByAvailability() {
    }


}

export default Search