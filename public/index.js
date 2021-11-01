const item = document.getElementsByClassName("item");
const add = document.querySelector(".add")
const submit = document.querySelector(".submitButton");
const lastItem = document.querySelector(".lastItem")
const cancelOrder = document.querySelector(".cancelButton")

let order = [];
let completeOrder = []
const ul = document.querySelector('ul')

Array.from(item).forEach(function (element) {
    element.addEventListener("click", function () {
        let items = this.value;
        order.push(items);

        let li = document.createElement('li')

        ul.appendChild(li)
        li.textContent = items

        console.log(order);

    });
});

add.addEventListener('click', () => {
    completeOrder.push(order)
    let br = document.createElement('br')
    let li = document.createElement('li')
    let price = `$${Number((order.map((x, i) => (i * 0.4))).reduce((e, i) => { return e + i }).toFixed(1))}`
    
    ul.appendChild(li)
    li.textContent = price
    ul.appendChild(br)
  
    order = []
})

lastItem.addEventListener('click', () => {
    completeOrder.pop()
    ul.innerHTML = ''
    let br = document.createElement('br')
    

    for (let i = 0; i < completeOrder.length; i++) {
        for (let j = 0; j < completeOrder[i].length; j++) {
            let li = document.createElement('li')
            ul.appendChild(li)
            li.textContent = completeOrder[i][j]
        }
        ul.appendChild(br)
    }
})

cancelOrder.addEventListener('click', () => {
    let name = document.querySelector(".customer").value;
    let li = document.querySelectorAll('li')

    for (let i = 0; i < li.length; i++) {
        ul.removeChild(li[i])
    }

    completeOrder = []
    order = []
    name = ""
})

submit.addEventListener("click", function () {
    let name = document.querySelector(".customer").value;
    let bomb = [].concat(...completeOrder)
    let price = `$${Number((bomb.map((x, i) => (i * 0.4))).reduce((e, i) => { return e + i }).toFixed(1))}`

    if (name !== '') {
        event.preventDefault();
        fetch("/order", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                coffee: completeOrder.join(' '),
                price: price
            }),
        })
            .then((response) => {
                if (response.ok) return response.json();
            })
            .then((data) => {
                console.log(data);
                window.location.reload(true);
            });
    } else {
        alert('Enter Customer Name')
    }
});
