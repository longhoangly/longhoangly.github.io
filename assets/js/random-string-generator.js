$(document).ready(function () {

    $("#nightMode").on("click", function () {
        let isNight = localStorage.getItem("isNight") == "true"
        setButtonNightMode(isNight)
    })

    let isNight = localStorage.getItem("isNight") == "true"
    setButtonNightMode(isNight)

    $("#generate").on("click", function () {

        let qty = $("#num").val() || 0
        let characters = $("#characters").val()
        let length = $("#length").val() || 1

        let separator = $("input[name='separator']:checked").val()
        let isUnique = $("#unique").is(":checked")

        cleanUpPreviousResult()
        generateRandomStrings(qty, characters, length, separator, isUnique)
    })

    $("#copy").on("click", function () {

        if ($("#result").val().length == 0) {

            displayAlertMessage("Nothing in text result!", false)

        } else {

            copyTextToClipboard("#result")
            displayAlertMessage("Text result copied into the clipboard!", true)
        }
    })


    $("#result").on("change  paste input", function () {

        calculateCounters("#result")
    })
})

function generateRandomStrings(qty, characters, length, separator, isUnique) {

    if (!qty || qty == 0 || !characters && characters.length == 0 || !length || length == 0) {

        displayAlertMessage("Please check your inputs! All fields are required!", false)
        return
    }

    let strings = []
    do {

        let randString = ''
        for (let i = 0; i < length; i++) {
            randString += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        if (!isUnique) {

            strings.push(randString)
            qty--
        } else if (isUnique && !strings.includes(randString)) {

            strings.push(randString)
            qty--
        }

    } while (qty > 0)

    $("#result").val(separator == "+++" ? strings.join("\n") : strings.join(separator)).trigger("change")
}