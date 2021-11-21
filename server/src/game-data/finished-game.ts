export const validateSolution = (culprit: string, reason: string): boolean => {
  return (/(ranger\s|mr\s)?caw|ranger|pharmacist|(candice[']?s\s)?fianc[eé]/gi.test(culprit) && /greed|money|inheritance|debt/gi.test(
    reason))
}

export const congratulatoryMessage = `
            <p>You've solved the case. The pharmacist Ranger Caw murdered his soon-to-be aunt-in-law
                Jane Robinson. Jane was about to write her niece Candice of our her will, meaning
                that Ranger would not have access to her inheritance. After trying to support
                the luxurious lifestyle Candice was used to and suffering financial problems of his own, Ranger badly needed the cash.</p>`
