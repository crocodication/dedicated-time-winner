const colors = [
    "#1d8ec2",
    "#80c6e2",
    "#61e2a2",
    "#2ec45b",
    "#3c8172",
    "#6b740c",
    "#edc112",
    "#cd6242",
    "#7f2937",
    "#c41818",
    "#eb4166",
    "#e5a6c9",
    "#abbabd",
    "#706296",
    "#4c1b66",
    "#2c3f8c",
    "#2e3659"
]

export function getRandomColor() {
    return colors[getRandomInt(0, colors.length)]
}

function getRandomInt(minNumber, maxNumber) {
    const min = Math.ceil(minNumber)
    const max = Math.floor(maxNumber)

    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}