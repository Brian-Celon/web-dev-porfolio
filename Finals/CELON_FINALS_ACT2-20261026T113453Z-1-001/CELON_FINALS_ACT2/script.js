const message = document.getElementById("message")
const btnLoad = document.getElementById("loadBtn")
const profile = document.getElementById("profile")
const grades = document.getElementById("grades")
const schedules = document.getElementById("schedules")
const btnChange = document.getElementById("BtnChange")

// btnChange.addEventListener("click", function(){
//     btnLoad.style.backgroundColor = "yellow"
//     btnChange.style.backgroundColor = "black"
//     btnChange.style.color = "white"
// })

function showMessage (){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve("Checking Account...")
        })
    }, 3000)
}

btnLoad.addEventListener("click", function(){
    message.innerHTML = "loading..."

    showMessage()

    .then(function(result){
        message.innerHTML = result
        message.style.color = "yellow"

        return new Promise(function(resolve){
           setTimeout(function(){
                resolve("Loading Profile...")

           }, 1000) 
    })

    .then(function(result){
        message.innerHTML = result
        message.style.color = "pink"

        return new Promise(function(resolve){
           setTimeout(function(){
                resolve("Welcome")

           }, 2000) 
        
    })

    .then(function(result){
        message.innerHTML = result
        message.style.color = "orange"
    })
    })
    })

})



btnChange.addEventListener("click", function(){
    message.innerHTML = "loading Dashboard"
    profile.innerHTML = "Profile: loading Profile..."
    grades.innerHTML = "Grades: loading Grades..."
    schedules.innerHTML = "Schedule: loading Schedules..."

    setTimeout(function(){
        message.style.color = "pink"
    }, 1000)

        setTimeout(function(){
        profile.style.color = "yellow"
    }, 2000)

        setTimeout(function(){
        grades.style.color = "blue"
    }, 3000)

        setTimeout(function(){
        schedules.style.color = "red"
    }, 4000)


    const profilePromise = new Promise(function(resolve){

        setTimeout(function(){
        profile.innerHTML = "Profile: Loaded";

            resolve();
        }, 1000)
    })

    const SchedulePromise = new Promise(function(resolve){

        setTimeout(function(){
        schedules.innerHTML = "Schedule: Loaded";

            resolve();
        }, 3000)
    })

    const gradesPromise = new Promise(function(resolve){

        setTimeout(function(){
        grades.innerHTML = "Grades: Loaded";

            resolve();
        }, 2000)
    })

    Promise.all([profilePromise, SchedulePromise, gradesPromise])

        .then(function(){
            message.innerHTML = "Dashboard Ready!"
        })
    

})




