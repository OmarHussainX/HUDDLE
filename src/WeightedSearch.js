import {SpaceSearch} from './SpaceSearch'
import {rateWeight, capacityWeight} from './SpaceWeights'

// weightedSearch receives a reference to a state Object from a component
// NOTE: caller passes a copied Object to weightedSearch, which will be modified
// and returned
//
// The Object contains the user's search criteria, and also a reference to
// an array of space Objects which are to be scored according to the search
// criteria
//
// Scoring is done via external 'tester' logic (SpaceSearch.js), and weightings
// for the various tests (SearchWeights.js)

function weightedSearch(searchState) {
    console.log('------------inside weightedSearch!')
    console.log(`user's 'rate' search criterion: ${searchState.rate}`)

    // iterate over all spaces, updating the score of each
    searchState.spaces.forEach(space => {
        // reset score
        let newScore = 0
        
        // call rate tester 
        newScore += (SpaceSearch.filterByRate(space, searchState)) * (rateWeight)
        
        // call capacity tester 
        newScore += (SpaceSearch.filterByCapacity(space, searchState)) * (capacityWeight)

        // assign new score to space
        space.score = newScore

        const testerObject = [
            {
                tester: "filterByRate",
                weight: 0.5
            },
            {
                tester: "filterByCapacity",
                weight: 0.5
            },

        ] 




    })

    // All spaces have now been assigned updated scores - sort based on score!
    searchState.spaces.sort( (a,b) => b.score - a.score)
    
    console.log(`----------- weightedSearch() after sorting!!`)
    searchState.spaces.forEach((space, i) => {
        console.log(`------ ${space.name} rate: ${space.score}, index: ${i}`)
    })

    // searchState.spaces[0].rate = 456


    return searchState
}

export {weightedSearch}