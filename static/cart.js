if (document.readyState == 'loading') { //check if body of html is loaded before running JS
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger') //creates array of all remove buttons
    for (var i = 0; i < removeCartItemButtons.length; i++) { //loop through buttons
        var button = removeCartItemButtons[i]   //select each button
        button.addEventListener('click', removeCartItem)//add event
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
        
    }

    var productContainer = document.querySelector('.cart-total') //added if var and if statement
    if (productContainer) {
        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    }
}

function purchaseClicked(event) {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <=0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    console.log('Hello', title, price, imageSrc)

    localStorage.setItem('itemTitle', title)
    localStorage.setItem('itemPrice', price)
    localStorage.setItem('itemImage', imageSrc)

    addItemToCart()
    updateCartTotal()
}

function addItemToCart() {
    var cart = document.querySelector('cart-items')
    // if (cart) {
        var title = localStorage.getItem('itemTitle')
        var price = localStorage.getItem('itemPrice')
        var imageSrc = localStorage.getItem('itemImage')

        console.log(title, price, imageSrc)

        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
        for (var i  = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText == title) {
                alert('This item is already added to the cart')
                return
            }
        }
        var cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    // }
    
}

// function addItemToCart(title, price, imageSrc) {
//     var cartRow = document.createElement('div')
//     cartRow.classList.add('cart-row')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
//     for (var i  = 0; i < cartItemsNames.length; i++) {
//         if (cartItemsNames[i].innerText == title) {
//             alert('This item is already added to the cart')
//             return
//         }
//     }
//     var cartRowContents = `
//         <div class="cart-item cart-column">
//             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//             <span class="cart-item-title">${title}</span>
//         </div>
//         <span class="cart-price cart-column">${price}</span>
//         <div class="cart-quantity cart-column">
//             <input class="cart-quantity-input" type="number" value="1">
//             <button class="btn btn-danger" type="button">REMOVE</button>
//         </div>`
//     cartRow.innerHTML = cartRowContents
//     cartItems.append(cartRow)
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    
// }

function updateCartTotal() {
    var cart = document.querySelector('cart-items')
    if (cart) {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0] //creates array of cart-items and obtains first element
        var cartRows = cartItemContainer.getElementsByClassName('cart-row') //obtains cart-rows elements inside container
        var total = 0;
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0] //obtains price
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //obtains quantity
            //CHANGE TO INT
            var price = parseFloat(priceElement.innerText.replace('$', '')) //obtains price text 
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    }
    
}
