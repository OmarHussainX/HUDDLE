import {ScoreSpaces, scoreCalculators} from './ScoreSpaces'

// weightedScorer receives a reference to a state Object from a component
// NOTE: caller passes a copied Object to weightedScorer, which will be modified
// and returned
//
// The Object contains the user's search criteria, and also a reference to
// an array of space Objects which are to be scored according to the search
// criteria
//
// Scoring is done via external 'tester' logic (ScoreSpaces.js), and weightings
// for the various tests (SearchWeights.js)

function weightedScorer(searchState) {
    console.log('------------inside weightedScorer!')
    console.log(`user's 'rate' search criterion: ${searchState.rate}`)
    console.log(`user's 'capacity' search criterion: ${searchState.capacity}`)


    // iterate over all spaces, updating the score of each
    searchState.spaces.forEach(space => {
        // reset score
        let newScore = 0
        
        newScore += scoreCalculators.map(test => 
            ScoreSpaces[test.function](space, searchState) * test.weight)
                .reduce((acc, cur) => acc+cur, 0)
        
        // assign new score to space
        space.score = newScore
    
        
    })

    // All spaces have now been assigned updated scores - sort based on score!
    searchState.spaces.sort( (a,b) => b.score - a.score)
    
    console.log(`----------- weightedScorer() after sorting!!`)
    searchState.spaces.forEach((space, i) => {
        console.log(`------ ${space.name} score: ${space.score}, index: ${i}`)
    })

    // searchState.spaces[0].rate = 456


    return searchState
}

export {weightedScorer}