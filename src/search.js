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
                filteredSpaces = spaceData.filter(space => space.address[searchType].toUpperCase() === searchOption.toUpperCase())
            break

            case 'street':
                filteredSpaces = spaceData.filter(space => space.address[searchType].includes(searchOption))
            break

            case 'city':
            break

            default:
            break
        }
        return filteredSpaces
    }
    

    filterByPrice() {
    }

    filterByAvailability() {
    }


}

export default Search