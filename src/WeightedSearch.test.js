import spaceData from './test.json'
import {weightedSearch} from './WeightedSearch'


const searchState = {

    // Array of all available spaces
    spaces: spaceData,

    // Search inputs (dropdowns, date/time pickers, checkboxes, textfields)
    rate: '',
    capacity: '',
    panelExpanded: null,
    selectedDate: new Date('2019-03-25T15:30:00'),
    selectedEndDate: new Date('2019-03-25T17:45:00'),
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    streetInput: '',
    cityInput: '',
    quadrant: '',
}



test('Checking instantiation', () => {
    expect(spaceData).not.toBeNull()

    const newState = weightedSearch(searchState)
    expect(newState).not.toBeNull()
})



test('Checking score calculation', () => {

    let testState = searchState
    testState.capacity = 10
    testState.rate = 25


    const newState = weightedSearch(testState)
    
    console.log(`----------- after sorting based on score in the test file!!!-----------------`)
    newState.spaces.forEach(space => {
        console.log(`------ ${space.name} rate: ${space.score}`)
    })

    // expect(newState.spaces[0].rate).toEqual(456)
    // expect(testState.spaces[0].rate).toEqual(0)

})

