function weightedSearch(state) {
    console.log('inside weightedSearch!')

    let notaCopyOfState = state    //make a copy... NO!

    // really make a local copy of state...
    let newState = {...state}
    newState.spaces = [...state.spaces]

    const rateWeight = 0.5
    const capacityWeight = 0.5
    

    // iterate over all spaces, updating the score of each
    newState.spaces.forEach(space => {
        // reset score
        let newScore = 0
        
        // call rate tester - pretend it returns the correct/desired value
        // this was a match for rate!
        newScore += (testerRate(space.rate, newState.rate)) * (rateWeight)
        
        // call capacity tester - pretend it returns the correct/desired value
        // this was a match for rate!
        newScore += (testerCapacity(space.capacity, newState.capacity)) * (capacityWeight)

        // assign new score to space
        space.score = newScore

    })

    // All spaces have now been assigned updated scores - sort based on score!
    newState.spaces.sort( (a,b) => b.score - a.score)
    
    console.log(`----------- weightedSearch() after sorting!!`)
    newState.spaces.forEach((space, i) => {
        console.log(`------ ${space.name} rate: ${space.score}, index: ${i}`)
    })

    // newState.spaces[0].rate = 456


    return newState
}




function testerRate(spaceRate, stateRate) {
    return Math.round(Math.random())
}

function testerCapacity(spaceRate, stateRate) {
    return Math.round(Math.random())

}

export {weightedSearch}