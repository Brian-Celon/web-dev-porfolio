const button = document.getElementById("loadBtn")
const result = document.getElementById("result")


button.addEventListener("click", function(){

    let request = new XMLHttpRequest()
    // Middle man 

    request.open("GET", "students.html", true)

    request.onload = function(){
        result.innerHTML = request.response
    }

    request.send()


})