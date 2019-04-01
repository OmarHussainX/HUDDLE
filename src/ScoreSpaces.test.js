import spaceData from './test.json'
import {ScoreSpaces} from './ScoreSpaces'



test('Checking data import', () => {
    expect(spaceData).not.toBeNull()
})




// --------------------------------------------------
// testing scoreOnRate

test('Checking scoring on rate ($0) SUCCESS', () => {

    // User-specified search criterion
    const searchValue = { rate: 0 }

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.rate = 0

    let matchValue = 1

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnRate(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeTruthy()
    
    // space should NOT match the user's criterion!
    testSpace.rate = 23
    expect(ScoreSpaces.scoreOnRate(testSpace, searchValue)).toBeFalsy()
})

test('Checking scoring on rate ($1-25)', () => {

    // User-specified search criterion
    const searchValue = { rate: 25} 

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.rate = 13
    
    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnRate(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeTruthy()

    // space should NOT match the user's criterion!
    testSpace.rate = {rate:26}
    expect(ScoreSpaces.scoreOnRate(testSpace, searchValue)).toBeFalsy()

})

test('Checking scoring on rate ($26-50)', () => {

    // User-specified search criterion
    const searchValue = { rate: 50 }

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.rate = 47
    
    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnRate(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeTruthy()

    // space should NOT match the user's criterion!
    testSpace.rate = 2
    expect(ScoreSpaces.scoreOnRate(testSpace, searchValue)).toBeFalsy()

})
// --------------------------------------------------



// testing scoreOnCapacity

test('Checking scoring on capacity (1-5) SUCCESS', () => {

    // User-specified search criterion
    const searchValue = { capacity: 5 }

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.capacity = 3

    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnCapacity(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeTruthy()
    
    // space should NOT match the user's criterion!
    testSpace.capacity = 6
    expect(ScoreSpaces.scoreOnCapacity(testSpace, searchValue)).toBeFalsy()
})

test('Checking scoring on capacity (6-10) SUCCESS', () => {

    // User-specified search criterion
    const searchValue = { capacity: 10 }

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.capacity = 7

    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnCapacity(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeTruthy()
    
    // space should NOT match the user's criterion!
    testSpace.capacity = 2
    expect(ScoreSpaces.scoreOnCapacity(testSpace, searchValue)).toBeFalsy()
})
// --------------------------------------------------



// testing scoreOnAddress

test('Checking scoring on address', () => {

    // User-specified search criterion
    const searchValue = { streetInput: 'SAME' }

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.address.street = 'How to get to Sesame Street?'

    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnAddress(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeTruthy()
    
    // space should NOT match the user's criterion!
    testSpace.address.street = 'Nightmare on Elm St'
    expect(ScoreSpaces.scoreOnCapacity(testSpace, searchValue)).toBeFalsy()

    // space should NOT match the user's criterion!
    searchValue.streetInput = ''
    expect(ScoreSpaces.scoreOnCapacity(testSpace, searchValue)).toBeFalsy()
})

// --------------------------------------------------
