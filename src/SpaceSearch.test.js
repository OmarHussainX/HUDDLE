import spaceData from './test.json'
import {SpaceSearch} from './SpaceSearch'



test('Checking data import', () => {
    expect(spaceData).not.toBeNull()
})




// --------------------------------------------------
// testing filterByRate

test('Checking filtering by price ($0) SUCCESS', () => {

    // User-specified search criterion
    const searchValue = 0

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.rate = 45

    let matchValue = 1

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = SpaceSearch.filterByRate(testSpace, searchValue)
    
    expect(matchValue).toBeFalsy()

    testSpace.rate = 0
    expect(SpaceSearch.filterByRate(testSpace, searchValue)).toBeTruthy()
})

test('Checking filtering by price ($1-25)', () => {

    // User-specified search criterion
    const searchValue = 25

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.rate = 13
    
    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = SpaceSearch.filterByRate(testSpace, searchValue)
    
    expect(matchValue).toBeTruthy()

    testSpace.rate = 26
    expect(SpaceSearch.filterByRate(testSpace, searchValue)).toBeFalsy()

})

test('Checking filtering by price ($26-50)', () => {

    // User-specified search criterion
    const searchValue = 50

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.rate = 47
    
    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = SpaceSearch.filterByRate(testSpace, searchValue)
    
    expect(matchValue).toBeTruthy()

    testSpace.rate = 2
    expect(SpaceSearch.filterByRate(testSpace, searchValue)).toBeFalsy()

})
// --------------------------------------------------



// --------------------------------------------------
// testing filterByCapacity

test('Checking filtering by capacity (1-5) SUCCESS', () => {

    // User-specified search criterion
    const searchValue = 5

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.capacity = 6

    let matchValue = 1

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = SpaceSearch.filterByCapacity(testSpace, searchValue)
    
    expect(matchValue).toBeFalsy()

    testSpace.rate = 0
    expect(SpaceSearch.filterByCapacity(testSpace, searchValue)).toBeTruthy()
})
