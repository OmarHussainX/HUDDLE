import spaceData from './test.json'
import {SpaceSearch} from './SpaceSearch'



test('Checking data import', () => {
    expect(spaceData).not.toBeNull()
})



test('Checking filtering by name SUCCESS', () => {
    const searchString = 'GARY'

    // filteredSpaces is an array of Objects which match the user's
    // search string
    const filteredSpaces = SpaceSearch.filterByName(spaceData, searchString)
    
    let nameMatch = false
    
    // iterate through the filteredSpaces array, checking each name...
    // ...if any name doesn't match the search string, something is wrong!!
    nameMatch = filteredSpaces.every(space => {
        // console.log(`'space.name' that matches '${searchString}': ${space.name}`)
        return space.name.toLowerCase().includes(searchString.toLowerCase())
    })
    
    expect(nameMatch).toBeTruthy()
})



test('Checking filtering by name FAILURE', () => {

    const searchString = 'THIS PLACE DOES NOT EXIST!!'

    // filteredSpaces is an array of Objects which match the user's
    // search string
    const filteredSpaces = SpaceSearch.filterByName(spaceData, searchString)
    
    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)
    
})



test('Checking filtering by location (quadrant) SUCCESS', () => {

    const searchOption = 'sw'       // selected by the user

    const searchType = 'quadrant'   // internal: type of location search
    const quadrantTest = 'SW'       // internal: search match criteria
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByLocation(spaceData, searchType, searchOption)
    
    let locationMatch = false
    
    // iterate through the filteredSpaces array, checking each object's quadrant...
    // ...if any quadrant doesn't match the search option, something is wrong!!
    locationMatch = filteredSpaces.every(space =>
        space.address.quadrant.toUpperCase() === quadrantTest)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) locationMatch = false

    expect(locationMatch).toBeTruthy()
})



test('Checking filtering by location (quadrant) FAILURE', () => {

    const searchOption = 'zw'        // bad query, should not match anything

    const searchType = 'quadrant'   // internal: type of location search

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByLocation(spaceData, searchType, searchOption)
    
    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)
})



test('Checking filtering by location (address) SUCCESS', () => {

    const searchString = 'RiVe'    // input by the user

    const searchType = 'street'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByLocation(spaceData, searchType, searchString)

    let locationMatch = false
    
    // iterate through the filteredSpaces array, checking each object's street address...
    // ...if any address doesn't include the search term, something is wrong!!
    locationMatch = filteredSpaces.every(space => 
        space.address.street.toLowerCase().includes(searchString.toLowerCase()))

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) locationMatch = false

    expect(locationMatch).toBeTruthy()
    // expect(filteredSpaces.length).toBeTruthy()
})



test('Checking filtering by location (address) FAILURE', () => {

    const searchString = 'THIS STREET DOES NOT EXIST!!'    // input by the user

    const searchType = 'street'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByLocation(spaceData, searchType, searchString)

    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)
})


test('Checking filtering by location (city) SUCCESS', () => {

    const searchString = 'MoN'    // input by the user

    const searchType = 'city'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByLocation(spaceData, searchType, searchString)

    let locationMatch = false
    
    // iterate through the filteredSpaces array, checking each object's street address...
    // ...if any address doesn't include the search term, something is wrong!!
    locationMatch = filteredSpaces.every(space => 
        space.address.city.toLowerCase().includes(searchString.toLowerCase()))

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) locationMatch = false

    expect(locationMatch).toBeTruthy()
    // expect(filteredSpaces.length).toBeTruthy()
})



test('Checking filtering by location (city) FAILURE', () => {

    const searchString = 'THIS CITY DOES NOT EXIST!!'    // input by the user

    const searchType = 'city'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByLocation(spaceData, searchType, searchString)

    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)

    // this merely exercises the 'default' case in filterByLocation() in order
    // to achieve 100% coverage
    SpaceSearch.filterByLocation(spaceData, 'exercising', 'code')
})



test('Checking filtering by price ($0) SUCCESS', () => {

    const searchValue = 0    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByRate(spaceData, searchValue)
    
    // console.log(`---matches for rate ${searchValue}: ${filteredSpaces.length}`)
    // filteredSpaces.forEach(space => console.log(`${space.name}: $${space.rate}`)) 

    let priceRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's rate...
    // ...if any rate falls outside the desired range, something is wrong!!
    priceRangeMatch = filteredSpaces.every(space => space.rate === 0)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) priceRangeMatch = false

    expect(priceRangeMatch).toBeTruthy()
})



test('Checking filtering by price ($1-25) SUCCESS', () => {

    const searchValue = 25    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByRate(spaceData, searchValue)

    let priceRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's rate...
    // ...if any rate falls outside the desired range, something is wrong!!
    priceRangeMatch = filteredSpaces.every(space =>
        space.rate > 0 && space.rate <= 25)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) priceRangeMatch = false

    expect(priceRangeMatch).toBeTruthy()
})



test('Checking filtering by price ($26-50) SUCCESS', () => {

    const searchValue = 50    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByRate(spaceData, searchValue)

    let priceRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's rate...
    // ...if any rate falls outside the desired range, something is wrong!!
    priceRangeMatch = filteredSpaces.every(space =>
        space.rate > 25 && space.rate <= 50 )

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) priceRangeMatch = false

    expect(priceRangeMatch).toBeTruthy()
})
         

test('Checking filtering by price ($51-75) SUCCESS', () => {

    const searchValue = 75    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByRate(spaceData, searchValue)

    let priceRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's rate...
    // ...if any rate falls outside the desired range, something is wrong!!
    priceRangeMatch = filteredSpaces.every(space =>
        space.rate > 50 && space.rate <= 75)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) priceRangeMatch = false

    expect(priceRangeMatch).toBeTruthy()
})
         


test('Checking filtering by price ($76+) SUCCESS', () => {

    const searchValue = 100    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByRate(spaceData, searchValue)

    let priceRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's rate...
    // ...if any rate falls outside the desired range, something is wrong!!
    priceRangeMatch = filteredSpaces.every(space => space.rate > 75)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) priceRangeMatch = false

    expect(priceRangeMatch).toBeTruthy()

    // this merely exercises the 'default' case in filterByRate() in order
    // to achieve 100% coverage
    SpaceSearch.filterByRate(spaceData, 'exercising code')
})



test('Checking filtering by capacity (1-5) SUCCESS', () => {

    const searchValue = 5    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByCapacity(spaceData, searchValue)
    console.log(`${filteredSpaces.length} spaces with capacity (1-5)`)

    let capacityRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's capacity...
    // ...if any capacity falls outside the desired range, something is wrong!!
    capacityRangeMatch = filteredSpaces.every(space => space.capacity < 6)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) capacityRangeMatch = false

    expect(capacityRangeMatch).toBeTruthy()

})



test('Checking filtering by capacity (6-10) SUCCESS', () => {

    const searchValue = 10    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByCapacity(spaceData, searchValue)
    console.log(`${filteredSpaces.length} spaces with capacity (6-10)`)

    let capacityRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's capacity...
    // ...if any capacity falls outside the desired range, something is wrong!!
    capacityRangeMatch = filteredSpaces.every(space => space.capacity > 5 && space.capacity <= 10)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) capacityRangeMatch = false

    expect(capacityRangeMatch).toBeTruthy()

    // this merely exercises the 'default' case in filterByRate() in order
    // to achieve 100% coverage
    SpaceSearch.filterByCapacity(spaceData, 'exercising code')
})



test('Checking filtering by capacity (11-15) SUCCESS', () => {

    const searchValue = 15    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByCapacity(spaceData, searchValue)
    console.log(`${filteredSpaces.length} spaces with capacity (11-15)`)

    let capacityRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's capacity...
    // ...if any capacity falls outside the desired range, something is wrong!!
    capacityRangeMatch = filteredSpaces.every(space => space.capacity > 10 && space.capacity <= 15)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) capacityRangeMatch = false

    expect(capacityRangeMatch).toBeTruthy()

})



test('Checking filtering by capacity (16+) SUCCESS', () => {

    const searchValue = 20    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByCapacity(spaceData, searchValue)
    console.log(`${filteredSpaces.length} spaces with capacity (16+)`)

    let capacityRangeMatch = false

    // iterate through the filteredSpaces array, checking each object's capacity...
    // ...if any capacity falls outside the desired range, something is wrong!!
    capacityRangeMatch = filteredSpaces.every(space => space.capacity > 15)

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) capacityRangeMatch = false

    expect(capacityRangeMatch).toBeTruthy()

    // this merely exercises the 'default' case in filterByRate() in order
    // to achieve 100% coverage
    SpaceSearch.filterByCapacity(spaceData, 'exercising code')
})



test('Checking filtering by availability (for ALL days) SUCCESS', () => {

    // all possible capacity values user can search for (each value maps to a range)
    const searchValues = [5, 10, 15, 20]

    // store how many 'hits' (i.e. matches) there are for a given capacity
    const searchHits = []

    // iterate through 'searchValues', do a capacity based search on 'spaceData'
    // and for each search, store the *number* of matches in 'searchHits'
    searchValues.forEach(capacity => searchHits.push((SpaceSearch.filterByCapacity(spaceData, capacity)).length))

    searchHits.forEach( (hit, i) => console.log(`${hit} matches for ${searchValues[i]} capacity`))

    // get the total number of hits by adding up the hits for each search
    const totalHits = searchHits.reduce((acc, cur) => acc + cur, 0)

    // each space must only fall into one and only one capacity range, so the total
    // number of hits should equal the total number of spaces available! 
    expect(totalHits).toEqual(spaceData.length)

})



test('Checking filtering by availability (Sunday) SUCCESS', () => {

    const searchValue = 'SuNday'    // selected by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = SpaceSearch.filterByAvailability(spaceData, searchValue)
    
    console.log(`---spaces available on '${searchValue}': ${filteredSpaces.length}`)
    filteredSpaces.forEach(space => console.log(`${space.name}: ${space.availability[searchValue.toLowerCase()]}`)) 

    let availabilityMatch = false

    // iterate through the filteredSpaces array, checking each object's rate...
    // ...if any space is not available on the specified day, something is wrong!!
    availabilityMatch = filteredSpaces.every(space => space.availability[searchValue.toLowerCase()])

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!,
    // and if the filter method worked, filteredSpaces CANNOT be empty
    if (filteredSpaces.length === 0) availabilityMatch = false

    expect(availabilityMatch).toBeTruthy()

    // this merely exercises the 'default' case in filterByAvailability()
    // in order to achieve 100% coverage
    SpaceSearch.filterByAvailability(spaceData, 'exercising code')
})
