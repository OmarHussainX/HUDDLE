class ScoreSpaces {

    /* --------------------------------
    scoreOnRate takes two parameters:
    - a reference to a space object
    - a searchState object with property 'rateInput', guaranteed to be one of:
      0     ( free spaces )
      25    ( $25 or less )
      50    ( $50 or less )
      75    ( $75 or less )
      100   ( Over $75 )

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
            
            // ( $25 or less )
            case 25:
            scoreValue = (space.rate <= 25) ? 1 : 0
            break
            
            // ( $50 or less )
            case 50:
            scoreValue = (space.rate <= 50) ? 1 : 0
            break

            // ( $75 or less )
            case 75:
            scoreValue = (space.rate <= 75) ? 1 : 0
            break
            
            // ( Over $75 )
            case 100:
            scoreValue = (space.rate > 75) ? 1 : 0
            break

            // user hasn't set/doesn't care about this criterion
            default:
            scoreValue = 1
            // console.log(`==========default case!! searchState.rateInput: ${searchState.rateInput}, searchValue: ${searchValue}`)
        }
        // console.log(`----- Yo! ${space.name} gets a value of ${scoreValue} for 'rate range ${searchValue}'`)
        return scoreValue
    }



    /* --------------------------------
    scoreOnCapacity takes two parameters:
    - a reference to a space object
    - a searchState object with property 'capacityInput', guaranteed to be one of:
      5     ( 1-25 range )
      10    ( 26-50 range )
      15    ( 50-100 range )
      20    ( 100+ range )
    
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
            scoreValue = 1
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

        if (searchState.streetInput === '') return 1

        return space.address.street.toLowerCase().includes(searchState.streetInput.toLowerCase()) ? 1 : 0
    }



    /* --------------------------------
    scoreOnCity takes two parameters:
    - a reference to a space object
    - a searchState object with property 'cityInput' - a string value to search for
    
    returns a value (0 or 1) reflecting how well the space matches the specified criterion
    */
    static scoreOnCity(space, searchState) {

        if (searchState.cityInput === '') return 1

        return space.address.city.toLowerCase().includes(searchState.cityInput.toLowerCase()) ? 1 : 0
    }



    /* --------------------------------
    scoreOnQuadrant takes two parameters:
    - a reference to a space object
    - a searchState object with property 'quadrantInput' - a string value to search for
    
    returns a value (0 or 1) reflecting how well the space matches the specified criterion
    */
    static scoreOnQuadrant(space, searchState) {

        if (searchState.quadrantInput === '') return 1

        return space.address.quadrant.toLowerCase().includes(searchState.quadrantInput.toLowerCase()) ? 1 : 0
    }



    /* --------------------------------
    scoreOnAvailability takes two parameters:
    - a reference to a space object
    - a searchState object with boolean properties:

        monday:     true|false,
        tuesday:    true|false,
        wednesday:  true|false,
        thursday:   true|false,
        friday:     true|false,
        saturday:   true|false,
        sunday:     true|false,
        
    returns a value (0 or 1) reflecting how well the space matches the specified criterion
    */
    static scoreOnAvailability(space, searchState) {

        // number of days selected by the user
        let daysSelected = 0

        // number of days where the space is available on a *selected* day
        let daysMatched = 0

        const searchValue = {
            monday: searchState.monday,
            tuesday: searchState.tuesday,
            wednesday: searchState.wednesday,
            thursday: searchState.thursday,
            friday: searchState.friday,
            saturday: searchState.saturday,
            sunday: searchState.sunday,
        }

        // - loop through the week, checking each day:
        //      * if the user has selected a day as a search criterion, increment
        //          the number of days selected
        //      * if user has checked a day AND space is available on that day, increment
        //          the number of days where availability matches
        Object.keys(searchValue).forEach(day => {
            if (searchValue[day]) daysSelected +=1
            
            if (searchValue[day] && space.availability[day] ) daysMatched += 1
        })

        // if number of days selected by the user is not 0, return the proportion of days
        // where availability matches the selection
        if (daysSelected) {
            // console.log(`going to return ${daysMatched/daysSelected}`)
            return daysMatched/daysSelected
        }

        return 1
    }
}


const scoreCalculators = [
    {
        function: "scoreOnRate",
        weight: 1
    },
    {
        function: "scoreOnCapacity",
        weight: 1
    },
    {
        function: "scoreOnAddress",
        weight: 1
    },
    {
        function: "scoreOnCity",
        weight: 1
    },
    {
        function: "scoreOnQuadrant",
        weight: 1
    },
    {
        function: "scoreOnAvailability",
        weight: 1
    },
] 


export {ScoreSpaces, scoreCalculators}