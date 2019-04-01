class ScoreSpaces {

    /* --------------------------------
    scoreOnRate takes two parameters:
    - a reference to a space object
    - a searchState object with property 'rateInput', guaranteed to be one of:
      0     ( free spaces )
      25    ( 1-25 range )
      50    ( 26-50 range )
      75    ( 51-75 range )
      100   ( 76+ range )

    returns a value (0 or 1) reflecting how well the space matches the specified criterion
    */
    static scoreOnRate(space, searchState) {
        const searchValue = parseInt(searchState.rateInput)
        let scoreValue = 0

        switch (searchValue) {
            // ( free spaces )
            case 0:
                scoreValue = space.rate === 0 ? 1 : 0
                break

            // ( 1-25 range )
            case 25:
                scoreValue = (space.rate > 0 && space.rate <= 25) ? 1 : 0
                break

            // ( 26-50 range )
            case 50:
                scoreValue = (space.rate > 25 && space.rate <= 50) ? 1 : 0
                break

            // ( 51-75 range )
            case 75:
                scoreValue = (space.rate > 51 && space.rate <= 75) ? 1 : 0
                break

            // ( 76+ range )
            case 100:
                scoreValue = (space.rate > 75) ? 1 : 0
                break

            // user hasn't set/doesn't care about this criterion
            default:
            // console.log(`==========default case!! searchState.rateInput: ${searchState.rateInput}, searchValue: ${searchValue}`)
        }
        // console.log(`----- Yo! ${space.name} gets a value of ${scoreValue} for 'rate range ${searchValue}'`)
        return scoreValue
    }



    /* --------------------------------
    scoreOnCapacity takes two parameters:
    - a reference to a space object
    - a searchState object with property 'capacityInput', guaranteed to be one of:
      5     ( 1-5 range )
      10    ( 6-10 range )
      15    ( 11-15 range )
      20    ( 16+ range )
    
    returns a value (0 or 1) reflecting how well the space matches the specified criterion
    */
    static scoreOnCapacity(space, searchState) {
        const searchValue = parseInt(searchState.capacityInput)
        let scoreValue = 0

        switch (searchValue) {
            // ( 1-5 range )
            case 5:
                scoreValue = space.capacity <= 5 ? 1 : 0
                break

            // ( 6-10 range )
            case 10:
                scoreValue = (space.capacity > 5 && space.capacity <= 10) ? 1 : 0
                break

            // ( 11-15 range )
            case 15:
                scoreValue = (space.capacity > 10 && space.capacity <= 15) ? 1 : 0
                break

            // ( 16+ range )
            case 20:
                scoreValue = (space.capacity > 15) ? 1 : 0
                break

            // user hasn't set/doesn't care about this criterion
            default:
            // console.log(`==========default case!! searchState.capacityInput: ${searchState.capacityInput}, searchValue: ${searchValue}`)
        }
        // console.log(`----- Yo! ${space.name} gets a value of ${scoreValue} for 'capacity range ${searchValue}'`)
        return scoreValue
    }



    /* --------------------------------
    scoreOnAddress takes two parameters:
    - a reference to a space object
    - a searchState object with property 'streetInput' - a string value to search for
    
    returns a value (0 or 1) reflecting how well the space matches the specified criterion
    */
   static scoreOnAddress(space, searchState) {
    
    if (searchState.streetInput === '') return 0
    
    return space.address.street.toLowerCase().includes(searchState.streetInput.toLowerCase()) ? 1 : 0
}



    /* --------------------------------
    scoreOnCity takes two parameters:
    - a reference to a space object
    - a searchState object with property 'cityInput' - a string value to search for
    
    returns a value (0 or 1) reflecting how well the space matches the specified criterion
    */
   static scoreOnCity(space, searchState) {
    
    if (searchState.cityInput === '') return 0
    
    return space.address.city.toLowerCase().includes(searchState.cityInput.toLowerCase()) ? 1 : 0
}



    /* --------------------------------
    scoreOnQuadrant takes two parameters:
    - a reference to a space object
    - a searchState object with property 'quadrantInput' - a string value to search for
    
    returns a value (0 or 1) reflecting how well the space matches the specified criterion
    */
   static scoreOnQuadrant(space, searchState) {
    
    if (searchState.quadrantInput === '') return 0
    
    return space.address.quadrant.toLowerCase().includes(searchState.quadrantInput.toLowerCase()) ? 1 : 0
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

const scoreCalculators = [
    {
        function: "scoreOnRate",
        weight: 0.5
    },
    {
        function: "scoreOnCapacity",
        weight: 0.5
    },
 ] 


export {ScoreSpaces, scoreCalculators}