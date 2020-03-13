export function getInitial(name) {
    let nameWords = name.trim()
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
    .replace(/ /g, '')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); })
    .split(" ")

    nameWords = nameWords.filter(word => word.trim() !== "")

    const maxInitialLength = 3
    
    const initialLength = nameWords.length >= maxInitialLength ? maxInitialLength : nameWords.length

    let initial = ""

    for(let nameWordsIndex = 0; nameWordsIndex < initialLength; nameWordsIndex++) {
        initial += nameWords[nameWordsIndex][0]
    }

    return initial
}