import {ScoreSpaces, scoreCalculators} from './ScoreSpaces'

// weightedScorer receives a reference to a state Object from a component
// (NOTE: caller passes a copied Object to weightedScorer, which will be modified
// and returned)
//
// The Object contains the user's search criteria, and also a reference to
// an array of space Objects which are to be scored according to the search
// criteria
//
// Scoring is done via external 'tester' logic and weightings
// for the various tests (see 'ScoreSpaces.js')

function weightedScorer(searchState) {
    console.log('------------inside weightedScorer!')
    console.log(`user's 'rate' search criterion: ${searchState.rateInput}`)
    console.log(`user's 'capacity' search criterion: ${searchState.capacityInput}`)
    console.log(`user's 'address' search criterion: ${searchState.streetInput}`)
    console.log(`user's 'city' search criterion: ${searchState.cityInput}`)
    console.log(`user's 'quadrant' search criterion: ${searchState.quadrantInput}`)
    console.log(`user's 'day' search criterion:
    monday:     ${searchState.monday}
    tuesday:    ${searchState.tuesday}
    wednesday:  ${searchState.wednesday}
    thursday:   ${searchState.thursday}
    friday:     ${searchState.friday}
    saturday:   ${searchState.saturday}
    sunday:     ${searchState.sunday}`)


    // iterate over all spaces, and for each space:
    //  - reset the score
    //  - calculate a new score, based on the latest search criteria
    searchState.spaces.forEach(space => {

        // reset score
        space.score = 0

        // calculate new score
        let newScore = 0
        newScore += scoreCalculators.map(test => 
            ScoreSpaces[test.function](space, searchState) * test.weight)
                .reduce((acc, cur) => acc + cur, 0)
        
        // assign new score
        space.score = newScore
    })

    // All spaces have now been assigned updated scores - sort based on score, so
    // that most relevant spaces are always at the top
    searchState.spaces.sort((a,b) => b.score - a.score)
    
    return searchState
}

export {weightedScorer}