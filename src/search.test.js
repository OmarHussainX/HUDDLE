import spaceData from './dummy.json'
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
    const searchString = 'T'

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
    
    // NOTE: Calling '.every()' on an empty array returns 'true'!!!
    // nameMatch = [].every(space => { return {}})
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
        return space.address[searchType].toUpperCase() === quadrantTest
    })

    expect(locationMatch).toBeTruthy()
})


test('Checking filtering by location (quadrant) FAILURE', () => {

    const searchOption = 'W'        // bad query, should not match anything

    const searchType = 'quadrant'   // internal: type of location search

    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    const filteredSpaces = spaceSearch.filterByLocation(spaceData, searchType, searchOption)
    
    // if the array of filtered spaces is not empty, something went wrong!!
    expect(filteredSpaces.length).toEqual(0)
})



test('Checking filtering by location (address) SUCCESS', () => {

    const searchString = '8'    // input by the user

    const searchType = 'street'     // internal: type of location search
    
    // filteredSpaces is an array of Objects which match the user's
    // search criterion
    let filteredSpaces = spaceSearch.filterByLocation(spaceData, searchType, searchString)
    console.log(filteredSpaces)

    let locationMatch = false
    
    // iterate through the filteredSpaces array, checking each object's street address...
    // ...if any address doesn't include the search term, something is wrong!!
    locationMatch = filteredSpaces.every(space => {
        // console.log(`'space.name's that match '${searchString}': ${space.name}`)
        return space.address.street.toLowerCase().includes(searchString.toLowerCase())})

    expect(locationMatch).toBeTruthy()
    // expect(filteredSpaces.length).toBeTruthy()
})
