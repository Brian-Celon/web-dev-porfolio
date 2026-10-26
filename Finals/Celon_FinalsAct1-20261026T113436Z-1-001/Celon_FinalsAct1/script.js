const btn1 = document.getElementById("clickBtn")
const studname = document.getElementById("name")
const btn2 = document.getElementById("dblClickBtn")
const text1 = document.getElementById("text1")
const btn3 = document.getElementById("pressBtn")
const stat = document.getElementById("status")
const username = document.getElementById("username")
const form = document.getElementById("form");

btn1.addEventListener("click", function () {

    studname.style.color = "red";
    studname.innerHTML = "My name is Brian";

});

btn2.addEventListener("dblclick", function(){
    text1.innerHTML = "I am the developer";
    text1.style.color = "brown";
})

btn3.addEventListener("mousedown", function(){
    stat.innerHTML = "Button has been pressed";

})

btn3.addEventListener("mouseup", function(){
    stat.innerHTML = "Button has been released";

})

username.addEventListener("input", function(){
    studname.innerHTML = username.value;
})

form.addEventListener("click", function(){
    stat.innerHTML = "Year: " + form.value

})