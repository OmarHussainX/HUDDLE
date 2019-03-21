import spaceData from './test.json'
import Search from './search'

const spaceSearch = new Search()


test('Checking data import', () => {
    expect(spaceData).not.toBeNull()
})


test('Checking object instantiation', () => {
    let spaceSearch = null
    spaceSearch = new Search()
    expect(spaceSearch).not.toBeNull()
})


test('Checking filtering by name SUCCESS', () => {
    const searchString = 'GARY'

    // filteredSpaces is an array of Objects which match the user's
    // search string
    const filteredSpaces = spaceSearch.filterByName(spaceData, searchString)
    
    let nameMatch = false
    
    // iterate through the filteredSpaces array, checking each name...
    // ...if any name doesn't match the search string, something is wrong!!
    nameMatch = filteredSpaces.every(space => {
        // console.log(`'space.name's that match '${searchString}': ${space.name}`)
        return space.name.toLowerCase().includes(searchString.toLowerCase())})
    
    expect(nameMatch).toBeTruthy()
})


test('Checking filtering by name FAILURE', () => {

    const searchString = 'THIS PLACE DOES NOT EXIST!!'

    // filteredSpaces is an array of Objects which match the user's
    // search string
    const filteredSpaces = spaceSearch.filterByName(spaceData, searchString)
    
    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)
    
})


test('Checking filtering by location (quadrant) SUCCESS', () => {

    const searchOption = 'sw'       // selected by the user

    const searchType = 'quadrant'   // internal: type of location search
    const quadrantTest = 'SW'       // internal:  
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = spaceSearch.filterByLocation(spaceData, searchType, searchOption)
    
    let locationMatch = false
    
    // iterate through the filteredSpaces array, checking each object's quadrant...
    // ...if any quadrant doesn't match the search option, something is wrong!!

    locationMatch = filteredSpaces.every(space => {
        return space.address.quadrant.toUpperCase() === quadrantTest
    })

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!
    if (filteredSpaces.length === 0) {
        locationMatch = false
    }

    expect(locationMatch).toBeTruthy()
})


test('Checking filtering by location (quadrant) FAILURE', () => {

    const searchOption = 'zw'        // bad query, should not match anything

    const searchType = 'quadrant'   // internal: type of location search

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = spaceSearch.filterByLocation(spaceData, searchType, searchOption)
    
    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)
})


test('Checking filtering by location (address) SUCCESS', () => {

    const searchString = 'RIVE'    // input by the user

    const searchType = 'street'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    let filteredSpaces = spaceSearch.filterByLocation(spaceData, searchType, searchString)

    let locationMatch = false
    
    // iterate through the filteredSpaces array, checking each object's street address...
    // ...if any address doesn't include the search term, something is wrong!!
    locationMatch = filteredSpaces.every(space => {
        // console.log(`'space.name's that match '${searchString}': ${space.name}`)
        return space.address.street.toLowerCase().includes(searchString.toLowerCase())})

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!
    if (filteredSpaces.length === 0) {
            locationMatch = false
        }
    expect(locationMatch).toBeTruthy()
    // expect(filteredSpaces.length).toBeTruthy()
})


test('Checking filtering by location (address) FAILURE', () => {

    const searchString = 'THIS STREET DOES NOT EXIST!!'    // input by the user

    const searchType = 'street'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    let filteredSpaces = spaceSearch.filterByLocation(spaceData, searchType, searchString)

    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)
})


test('Checking filtering by location (city) SUCCESS', () => {

    const searchString = 'MoN'    // input by the user

    const searchType = 'city'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    let filteredSpaces = spaceSearch.filterByLocation(spaceData, searchType, searchString)

    let locationMatch = false
    
    // iterate through the filteredSpaces array, checking each object's street address...
    // ...if any address doesn't include the search term, something is wrong!!
    locationMatch = filteredSpaces.every(space => {
        // console.log(`'space.name's that match '${searchString}': ${space.name}`)
        return space.address.city.toLowerCase().includes(searchString.toLowerCase())})

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!
    if (filteredSpaces.length === 0) {
        locationMatch = false
    }

    expect(locationMatch).toBeTruthy()
    // expect(filteredSpaces.length).toBeTruthy()
})
test('Checking filtering by location (city) FAILURE', () => {

    const searchString = 'THIS CITY DOES NOT EXIST!!'    // input by the user

    const searchType = 'city'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    let filteredSpaces = spaceSearch.filterByLocation(spaceData, searchType, searchString)

    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)
})


test('Checking filtering by price SUCCESS', () => {

    const searchValue = '75'    // input by the user

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    let filteredSpaces = spaceSearch.filterByPrice(spaceData, searchValue)

    let priceMatch = false
    console.log(filteredSpaces.length)
    // iterate through the filteredSpaces array, checking each object's street address...
    // ...if any address doesn't include the search term, something is wrong!!
    priceMatch = filteredSpaces.every(space => {
        // console.log(`'space.name's that match '${searchString}': ${space.name}`)
        return space.price <= searchValue})

    // NOTE: Calling '.every()' on an empty array returns 'true'!!!
    if (filteredSpaces.length === 0) {
        priceMatch = false
    }

    expect(priceMatch).toBeTruthy()
    // expect(filteredSpaces.length).toBeTruthy()
    
})
         

