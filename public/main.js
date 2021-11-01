const check = document.getElementsByClassName("fa-check");
const trash = document.getElementsByClassName("fa-trash");

Array.from(check).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const coffee = this.parentNode.parentNode.childNodes[3].innerText
    
    const synth = window.speechSynthesis
    let yellThis = new SpeechSynthesisUtterance(`${name} order completed`)
    synth.speak(yellThis)
    
    fetch('/order', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        coffee: coffee
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
    
});



Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const coffee = this.parentNode.parentNode.childNodes[3].innerText
        const extra = this.parentNode.parentNode.childNodes[5].innerText
        const size = this.parentNode.parentNode.childNodes[7].innerText
        fetch('/order', {
          method: 'delete',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            coffee: coffee,
            extra : extra,
            size : size
          })
        })
          .then(res => {
          window.location.reload() 
          })
          .catch(error => console.log(error))
      });
});
