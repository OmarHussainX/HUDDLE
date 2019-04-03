import spaceData from './test.json'
import {ScoreSpaces} from './ScoreSpaces'



test('Checking data import', () => {
    expect(spaceData).not.toBeNull()
})




// --------------------------------------------------
// testing scoreOnRate

test('Checking scoring on rate ($0) SUCCESS', () => {

    // User-specified search criterion
    const searchValue = { rateInput: 0 }

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
    const searchValue = { rateInput: 25 } 

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
    testSpace.rate = { rate: 26 }
    expect(ScoreSpaces.scoreOnRate(testSpace, searchValue)).toBeFalsy()

})

test('Checking scoring on rate ($26-50) & above', () => {

    // User-specified search criterion
    const searchValue = { rateInput: 50 }

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
    testSpace.rate = 52
    expect(ScoreSpaces.scoreOnRate(testSpace, searchValue)).toBeFalsy()

    // space should match the user's criterion!
    testSpace.rate = 56
    expect(ScoreSpaces.scoreOnRate(testSpace, { rateInput: 75 })).toBeTruthy()

    // space should NOT match the user's criterion!
    testSpace.rate = 76
    expect(ScoreSpaces.scoreOnRate(testSpace, { rateInput: 75 })).toBeFalsy()

    // space should match the user's criterion!
    testSpace.rate = 945
    expect(ScoreSpaces.scoreOnRate(testSpace, { rateInput: 100 })).toBeTruthy()

    // space should NOT match the user's criterion!
    testSpace.rate = 50
    expect(ScoreSpaces.scoreOnRate(testSpace, { rateInput: 100 })).toBeFalsy()

    // exercising code for coverage, this branch does nothing
    testSpace.rate = '23'
    ScoreSpaces.scoreOnRate(testSpace, { rateInput: '' })
})
// --------------------------------------------------



// testing scoreOnCapacity

test('Checking scoring on capacity (1-5) SUCCESS', () => {

    // User-specified search criterion
    const searchValue = { capacityInput: 5 }

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

test('Checking scoring on capacity (6-10) & above', () => {

    // User-specified search criterion
    const searchValue = { capacityInput: 10 }

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

    // space should NOT match the user's criterion!
    testSpace.capacity = 5
    expect(ScoreSpaces.scoreOnCapacity(testSpace, { capacityInput: 15 })).toBeFalsy()

    // space should match the user's criterion!
    testSpace.capacity = 13
    expect(ScoreSpaces.scoreOnCapacity(testSpace, { capacityInput: 15 })).toBeTruthy()

    // space should match the user's criterion!
    testSpace.capacity = 56
    expect(ScoreSpaces.scoreOnCapacity(testSpace, { capacityInput: 20 })).toBeTruthy()

    // space should NOT match the user's criterion!
    testSpace.capacity = 13
    expect(ScoreSpaces.scoreOnCapacity(testSpace, { capacityInput: 20 })).toBeFalsy()

    // exercising code for coverage, this branch does nothing
    testSpace.capacity = '23'
    ScoreSpaces.scoreOnCapacity(testSpace, { capacityInput: '' })
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
    expect(ScoreSpaces.scoreOnAddress(testSpace, searchValue)).toBeFalsy()

    // space should NOT match the user's criterion!
    searchValue.streetInput = ''
    expect(ScoreSpaces.scoreOnAddress(testSpace, searchValue)).toEqual(1)
})

// --------------------------------------------------



// testing scoreOnCity

test('Checking scoring on city', () => {

    // User-specified search criterion
    const searchValue = { cityInput: 'TED' }

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.address.city = 'Tilted Towers'

    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnCity(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeTruthy()
    
    // space should NOT match the user's criterion!
    testSpace.address.city = 'Nightmare on Elm St'
    expect(ScoreSpaces.scoreOnCity(testSpace, searchValue)).toBeFalsy()

    // space should NOT match the user's criterion!
    searchValue.cityInput = ''
    expect(ScoreSpaces.scoreOnCity(testSpace, searchValue)).toEqual(1)
})

// --------------------------------------------------



// testing scoreOnQuadrant

test('Checking scoring on quadrant', () => {

    // User-specified search criterion
    const searchValue = { quadrantInput: 'SE' }

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.address.quadrant = 'SE'

    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnQuadrant(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeTruthy()
    
    // space should NOT match the user's criterion!
    testSpace.address.quadrant = 'NA'
    expect(ScoreSpaces.scoreOnQuadrant(testSpace, searchValue)).toBeFalsy()

    // space should NOT match the user's criterion!
    searchValue.quadrantInput = ''
    expect(ScoreSpaces.scoreOnQuadrant(testSpace, searchValue)).toEqual(1)
})

// --------------------------------------------------



// testing scoreOnAvailability

test('Checking scoring on availability', () => {

    // User-specified search criterion
    let searchValue = {
        monday:     true,
        tuesday:    true,
        wednesday:  false,
        thursday:   false,
        friday:     true,
        saturday:   false,
        sunday:     false,
    }

    // Space object against which search criterion is to be checked
    let testSpace = {...spaceData[0]}
    testSpace.availability = {
        "monday":       false,
        "tuesday":      false,
        "wednesday":    true,
        "thursday":     true,
        "friday":       true,
        "saturday":     false,
        "sunday":       false,
    }

    let matchValue = 0

    // Call the search function with:
    // - a reference to a space object 
    // - user's search criterion
    // Receive: a value indicating how well the space matches the criterion
    matchValue = ScoreSpaces.scoreOnAvailability(testSpace, searchValue)
    
    // space should match the user's criterion!
    expect(matchValue).toBeCloseTo(1/3)
    
    // space should NOT match the user's criterion!
    testSpace.availability.friday = false
    expect(ScoreSpaces.scoreOnAvailability(testSpace, searchValue)).toEqual(0)

    searchValue = {
        monday:     false,
        tuesday:    false,
        wednesday:  false,
        thursday:   false,
        friday:     false,
        saturday:   false,
        sunday:     false,
    }
    expect(ScoreSpaces.scoreOnAvailability(testSpace, searchValue)).toEqual(1)

    searchValue.monday = true
    searchValue.tuesday = true
    searchValue.sunday = true

    testSpace.availability = {
        "monday":       true,
        "tuesday":      false,
        "wednesday":    false,
        "thursday":     false,
        "friday":       false,
        "saturday":     false,
        "sunday":       true,
    }

    // space should match the user's criterion!
    expect(ScoreSpaces.scoreOnAvailability(testSpace, searchValue)).toBeCloseTo(2/3)
})

// --------------------------------------------------
