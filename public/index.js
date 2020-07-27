(function(){
    const socket = io();
    const link = document.getElementById("link");
    const submit = document.getElementById("submit");
    const content = document.getElementById("content");
    const getLinks = document.getElementById("get_links");
    const result = document.getElementsByClassName("result")

    //all validations
    $("#link").on("change paste keyup", ()=>{
        console.log($("#link").val().length)
        if($("#link").val().length > 5){
            $("#submit").attr("disabled", false);
        }
    });

    submit.addEventListener("click", (e)=>{
        e.preventDefault();
        $("#spinner").addClass("spinner-border");
        $("#status").text("Getting data");
        socket.emit("link", link.value);
    });
    socket.on("content", (data)=>{
         $("#spinner").removeClass("spinner-border");
         $("#spinner").removeClass("spinner-border");
         $("#status").text("Done! You may get links now");
        content.innerHTML = data;
        const styles = document.querySelectorAll("link");
        styles.forEach((style)=>{
            if(style.hasAttribute("crossorigin")){
                style.href = "#";
            }
        });
        $("#get_links").attr("disabled", false);
    });
    getLinks.addEventListener("click", ()=>{
        const links = document.querySelectorAll(".issue-link");
        $(".result").empty();
        links.forEach((link)=>{
            $(".result").append(`<li><a href="${link.href}">${link.href}</a></li>`);
        });
        $("#next").attr("disabled", false)
    });
    const page = $(".paginate-container a");
    $("#next").on("click", () => {
        $(".result").empty();
        $("#spinner").addClass("spinner-border");
        $("#status").text("Getting data");
         if (page.length == 0) {
             $("#previous").attr("disabled", false);
             socket.emit("link", $("#content .paginate-container a").attr("href"));
         } else if(page.length == 1) {
             socket.emit("link", $("#content .paginate-container a:eq(1)").attr("href"));
         }
    });

    $("#previous").on("click", () => {
        $(".result").empty();
        $("#spinner").addClass("spinner-border");
        $("#status").text("Getting data");
        socket.emit("link", $("#content .paginate-container a").attr("href"));
    });
   
    $("#usage").on("click", ()=>{
        $(".result").empty();
        alert(`Usage\n1. Go to the GitHub page containing you pull request history\n2. Copy the link in tab\nPaste link in input field here and click submit\n3. Click on view links to view all links on page`)
    });
})();