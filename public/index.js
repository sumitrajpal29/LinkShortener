

function copy(){
  var text=document.getElementById("shortedLink")

  text.select()
  text.setSelectionRange(0,99999)

  navigator.clipboard.writeText(text.value)

  alert("Copied the short link")
  console.log("clicked");

}
