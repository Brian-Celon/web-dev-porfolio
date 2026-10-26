$(document).ready(function(){

  $("#btn1").click(function(){
        $("#change").text("You changed the output")
        $("#head1").text("Welcome to my profile")
        
    })

  $("#btn1").dblclick(function(){
        $("#change").text("You clicked twice")
        $("#head1").text("You doubled click")

    })

  $("#btn1").mouseenter(function(){
        $("#change").text("You entered the button")
        $(this).css("background", "white")
        $(this).css("color", "black")
    })

  $("#btn1").mouseleave(function(){
        $("#change").text("You left the button")
        $(this).css("background", "black")
        $(this).css("color", "white")
    })

  $("#btn2").click(function(){
        $("#change").text("The content is hidden")
        $(".card").hide("slow")
    })

  $("#btn3").click(function(){
        $("#change").text("The content is now shown")
        $(".card").show("slow")
    })

    $("#course").change(function(){
        $("#program").text("Course: "+ $(this).val())
        $("#change1").text("You have choosen: "+ $(this).val())
    })

    $("th").css("background-color", "lightblue")


  $("#odd").click(function(){
    $("tr:odd").css("background-color", "orange")
    $("tr:even").css("background-color", "white")
    $("#change2").text("Odd colors have been applied")
    })

  $("#even").click(function(){
    $("tr:even").css("background-color", "pink")
    $("tr:odd").css("background-color", "white")
    $("#change2").text("Even colors have been applied")
    })


  $("#hide").click(function(){
        $("#change2").text("The content is hidden")
        $(".student").hide("slow")
    })

  $("#show").click(function(){
        $("#change2").text("The content is now shown")
        $(".student").show("slow")
    })




})

