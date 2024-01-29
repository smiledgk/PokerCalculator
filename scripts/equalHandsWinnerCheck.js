
export const StraightFlushWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.highest > secondPlayerCombo.highest) {
      count.firstPlayerWins = count.firstPlayerWins + 1
    } else if (firstPlayerCombo.highest < secondPlayerCombo.highest) {
      count.secondPlayerWins = count.secondPlayerWins + 1
    } else {
      count.draws = count.draws + 1;
    }
    return count
  }
  
  export const QuadsWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.quads > secondPlayerCombo.quads) {
      count.firstPlayerWins = count.firstPlayerWins + 1
    } else if (firstPlayerCombo.quads < secondPlayerCombo.quads) {
      count.secondPlayerWins = count.secondPlayerWins + 1
    } else {
      if (firstPlayerCombo.highest > secondPlayerCombo.highest) {
        count.firstPlayerWins = count.firstPlayerWins + 1
      } else if (firstPlayerCombo.highest < secondPlayerCombo.highest) {
        count.secondPlayerWins = count.secondPlayerWins + 1
      } else {
        count.draws = count.draws + 1;
      }
    }
    return count
  }
  
  export const FullHouseWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.full > secondPlayerCombo.full) {
      count.firstPlayerWins = count.firstPlayerWins + 1
    } else if (firstPlayerCombo.full < secondPlayerCombo.full) {
      count.secondPlayerWins = count.secondPlayerWins + 1
    } else {
      if (firstPlayerCombo.of > secondPlayerCombo.of) {
        count.firstPlayerWins = count.firstPlayerWins + 1
      } else if (firstPlayerCombo.of < secondPlayerCombo.of) {
        count.secondPlayerWins = count.secondPlayerWins + 1
      } else {
        count.draws = count.draws + 1;
      }
    }
    return count
  }
  
  export const FlushWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.highest > secondPlayerCombo.highest) {
      count.firstPlayerWins = count.firstPlayerWins + 1
    } else if (firstPlayerCombo.highest < secondPlayerCombo.highest) {
      count.secondPlayerWins = count.secondPlayerWins + 1
    } else {
      if (firstPlayerCombo.highest1 > secondPlayerCombo.highest1) {
        count.firstPlayerWins = count.firstPlayerWins + 1
      } else if (firstPlayerCombo.highest1 < secondPlayerCombo.highest1) {
        count.secondPlayerWins = count.secondPlayerWins + 1
      } else {
        if (firstPlayerCombo.highest2 > secondPlayerCombo.highest2) {
          count.firstPlayerWins = count.firstPlayerWins + 1
        } else if (firstPlayerCombo.highest2 < secondPlayerCombo.highest2) {
          count.secondPlayerWins = count.secondPlayerWins + 1
        } else {
          if (firstPlayerCombo.highest3 > secondPlayerCombo.highest3) {
            count.firstPlayerWins = count.firstPlayerWins + 1
          } else if (firstPlayerCombo.highest3 < secondPlayerCombo.highest3) {
            count.secondPlayerWins = count.secondPlayerWins + 1
          } else {
            if (firstPlayerCombo.highest4 > secondPlayerCombo.highest4) {
              count.firstPlayerWins = count.firstPlayerWins + 1
            } else if (firstPlayerCombo.highest4 < secondPlayerCombo.highest4) {
              count.secondPlayerWins = count.secondPlayerWins + 1
            } else {
              count.draws = count.draws + 1;
            }
          }
        }
      }
    }
    return count
  }
  
  export const StraightWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.highest > secondPlayerCombo.highest) {
      count.firstPlayerWins = count.firstPlayerWins + 1
    } else if (firstPlayerCombo.highest < secondPlayerCombo.highest) {
      count.secondPlayerWins = count.secondPlayerWins + 1
    } else {
      count.draws = count.draws + 1;
    }
    return count
  }
  
  export const ThreeOfAKindWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.set > secondPlayerCombo.set) {
      count.firstPlayerWins = count.firstPlayerWins + 1
    } else if (firstPlayerCombo.set < secondPlayerCombo.set) {
      count.secondPlayerWins = count.secondPlayerWins + 1
    } else {
      if (firstPlayerCombo.highest1 > secondPlayerCombo.highest1) {
        count.firstPlayerWins = count.firstPlayerWins + 1
      } else if (firstPlayerCombo.highest1 < secondPlayerCombo.highest1) {
        count.secondPlayerWins = count.secondPlayerWins + 1
      } else {
        if (firstPlayerCombo.highest2 > secondPlayerCombo.highest2) {
          count.firstPlayerWins = count.firstPlayerWins + 1
        } else if (firstPlayerCombo.highest2 < secondPlayerCombo.highest2) {
          count.secondPlayerWins = count.secondPlayerWins + 1
        } else {
          count.draws = count.draws + 1;
        }
      }
    }
    return count
  }
  
  export const TwoPairWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.firstPair > secondPlayerCombo.firstPair) {
      count.firstPlayerWins = count.firstPlayerWins + 1
    } else if (firstPlayerCombo.firstPair < secondPlayerCombo.firstPair) {
      count.secondPlayerWins = count.secondPlayerWins + 1
    } else {
      if (firstPlayerCombo.secondPair > secondPlayerCombo.secondPair) {
        count.firstPlayerWins = count.firstPlayerWins + 1
      } else if (firstPlayerCombo.secondPair < secondPlayerCombo.secondPair) {
        count.secondPlayerWins = count.secondPlayerWins + 1
      } else {
        if (firstPlayerCombo.highest > secondPlayerCombo.highest) {
          count.firstPlayerWins = count.firstPlayerWins + 1
        } else if (firstPlayerCombo.highest < secondPlayerCombo.highest) {
          count.secondPlayerWins = count.secondPlayerWins + 1
        } else {
          count.draws = count.draws + 1;
        }
      }
    }
    return count
  }
  
  export const OnePairWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.pair > secondPlayerCombo.pair) {
      count.firstPlayerWins = count.firstPlayerWins + 1
      //console.log('First Player Won!')
    } else if (firstPlayerCombo.pair < secondPlayerCombo.pair) {
      count.secondPlayerWins = count.secondPlayerWins + 1
      //console.log('Second Player Won!')
    } else {
      if (firstPlayerCombo.highest1 > secondPlayerCombo.highest1) {
        count.firstPlayerWins = count.firstPlayerWins + 1
        //console.log('First Player Won!')
      } else if (firstPlayerCombo.highest1 < secondPlayerCombo.highest1) {
        count.secondPlayerWins = count.secondPlayerWins + 1
        //console.log('Second Player Won!')
      } else {
        if (firstPlayerCombo.highest2 > secondPlayerCombo.highest2) {
          count.firstPlayerWins = count.firstPlayerWins + 1
          //console.log('First Player Won!')
        } else if (firstPlayerCombo.highest2 < secondPlayerCombo.highest2) {
          count.secondPlayerWins = count.secondPlayerWins + 1
          //console.log('Second Player Won!')
        } else {
          if (firstPlayerCombo.highest3 > secondPlayerCombo.highest3) {
            count.firstPlayerWins = count.firstPlayerWins + 1
            //console.log('First Player Won!')
          } else if (firstPlayerCombo.highest3 < secondPlayerCombo.highest3) {
            count.secondPlayerWins = count.secondPlayerWins + 1
            //console.log('Second Player Won!')
          } else {
            count.draws = count.draws + 1;
          }
        }
      }
    }
    return count
  }
  
  export const HighCardWinnerCheck = (firstPlayerCombo, secondPlayerCombo) => {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    if (firstPlayerCombo.highest > secondPlayerCombo.highest) {
      count.firstPlayerWins = count.firstPlayerWins + 1
      //console.log('First Player Won!')
    } else if (firstPlayerCombo.highest < secondPlayerCombo.highest) {
      count.secondPlayerWins = count.secondPlayerWins + 1
      //console.log('Second Player Won!')
    } else {
      if (firstPlayerCombo.highest1 > secondPlayerCombo.highest1) {
        count.firstPlayerWins = count.firstPlayerWins + 1
        //console.log('First Player Won!')
      } else if (firstPlayerCombo.highest1 < secondPlayerCombo.highest1) {
        count.secondPlayerWins = count.secondPlayerWins + 1
        //console.log('Second Player Won!')
      } else {
        if (firstPlayerCombo.highest2 > secondPlayerCombo.highest2) {
          count.firstPlayerWins = count.firstPlayerWins + 1
          //console.log('First Player Won!')
        } else if (firstPlayerCombo.highest2 < secondPlayerCombo.highest2) {
          count.secondPlayerWins = count.secondPlayerWins + 1
          //console.log('Second Player Won!')
        } else {
          if (firstPlayerCombo.highest3 > secondPlayerCombo.highest3) {
            count.firstPlayerWins = count.firstPlayerWins + 1
            //console.log('First Player Won!')
          } else if (firstPlayerCombo.highest3 < secondPlayerCombo.highest3) {
            count.secondPlayerWins = count.secondPlayerWins + 1
            //console.log('Second Player Won!')
          } else {
            if (firstPlayerCombo.highest4 > secondPlayerCombo.highest4) {
              count.firstPlayerWins = count.firstPlayerWins + 1
              //console.log('First Player Won!')
            } else if (firstPlayerCombo.highest4 < secondPlayerCombo.highest4) {
              count.secondPlayerWins = count.secondPlayerWins + 1
              //console.log('Second Player Won!')
            } else {
              count.draws = count.draws + 1;
            }
          }
        }
      }
    }
    return count
  }
  