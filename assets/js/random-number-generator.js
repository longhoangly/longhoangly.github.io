$(document).ready(function () {

    $("#nightMode").on("click", function () {
        let isNight = localStorage.getItem("isNight") == "true"
        setButtonNightMode(isNight)
    })

    let isNight = localStorage.getItem("isNight") == "true"
    setButtonNightMode(isNight)

    $("#generate").on("click", function () {

        var qty = $("#num").val() || 0
        var from = parseInt($("#from").val())
        var to = parseInt($("#to").val())

        var separator = $("input[name='separator']:checked").val()
        var isUnique = $("#unique").is(":checked")

        cleanUpPreviousResult()
        generateRandomNumbers(qty, from, to, separator, isUnique)
    })

    $("#copy").on("click", function () {

        if ($("#result").val().length == 0) {

            displayAlertMessage("Nothing in text result!", false)

        } else {

            copyTextToClipboard("#result")
            displayAlertMessage("Text result copied into the clipboard!", true)
        }
    })
})

function generateRandomNumbers(qty, from, to, separator, isUnique) {

    if (qty == 0 || !from && from != 0 || !to && to != 0) {

        displayAlertMessage("Please check your inputs! All fields are required!", false)
        return

    } else if (from > to) {

        displayAlertMessage("Please check your inputs! 'max' value should be bigger than 'min' value!", false)
        return

    } else if (isUnique && to - from - 99 < qty) {

        displayAlertMessage("Unique flag checked! The range should be big enough (100 units) to compare with quantity of random number!", false)
        return
    }

    var numbers = []
    do {

        var randNum = Math.floor(Math.random() * (to - from + 1)) + from
        if (!isUnique) {

            numbers.push(randNum)
            qty--
        } else if (isUnique && !numbers.includes(randNum)) {

            numbers.push(randNum)
            qty--
        }

    } while (qty > 0)

    $("#result").val(separator == "+++" ? numbers.join("\n") : numbers.join(separator))
}