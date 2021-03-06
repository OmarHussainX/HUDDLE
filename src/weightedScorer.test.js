import spaceData from './test.json'
import {weightedScorer} from './weightedScorer'


const searchState = {

    // Master array of all available spaces
    spaces: spaceData,

    // Search inputs (dropdowns, date/time pickers, checkboxes, textfields)
    rateInput: '',
    capacityInput: '',
    panelExpanded: null,
    selectedDate: new Date('2019-03-25T15:30:00'),
    selectedEndDate: new Date('2019-03-25T17:45:00'),
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    streetInput: '',
    cityInput: '',
    quadrantInput: '',
}



test('Checking instantiation', () => {
    expect(spaceData).not.toBeNull()

    const newState = weightedScorer(searchState)
    expect(newState).not.toBeNull()
})



test('Checking score calculation', () => {

    let testState = searchState
    testState.capacityInput = 10
    testState.rateInput = 25


    const newState = weightedScorer(testState)
    
    expect(newState.spaces[0].score).toEqual(1)
    expect(newState.spaces[2].score).toBeCloseTo(0.83)
    expect(newState.spaces[15].score).toBeCloseTo(0.67)

    console.log(`----------- after sorting based on score in the test file!!!-----------------`)
    newState.spaces.forEach(space => {
        console.log(`------ ${space.name} rate: ${space.score}`)
    })

})

