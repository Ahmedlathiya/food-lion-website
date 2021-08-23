$(document).ready(function () {
    const database = firebase.database();
    const beforeQuery = database.ref('menu/');
    const beforecartQuery = database.ref('orders/');


    //   ********Selecting From DataBase******* //

    beforeQuery.on('value', function success(data) {
        if (data) {
            let primi = '',
                secondi = '',
                contorni = '',
                dolci = '';

            $.each(data.val(), function (key, value) {
                let id = key,
                    category = value['category'],
                    title = value['title'],
                    price = value['price'],
                    image = value['image'];

                if (category == 'primi') {
                    primi += `<div class="product-box">
                     <div id=${key}>
                     <img class="image" src=${image}>
                     <div class="title">${title}</div><hr>
                     <div class="price">${parseFloat(price).toFixed(2)}$</div><hr>
                     <div class="add-to-cart" data-id=${key}><img class="cart-icon" src="https://w7.pngwing.com/pngs/1022/32/png-transparent-shopping-cart-icon-shopping-cart-logo-icon-shopping-cart-label-coffee-shop-shopping-mall.png"</div>
                     </div>
                     </div>`;
                }
                else if (category == 'secondi') {
                    secondi += `<div class="product-box">
            <div id=${key}>
            <img class="image" src=${image}>
            <div class="title">${title}</div><hr>
            <div class="price">${parseFloat(price).toFixed(2)}$</div><hr>
            <div class="add-to-cart" data-id=${key}><img class="cart-icon" src="https://w7.pngwing.com/pngs/1022/32/png-transparent-shopping-cart-icon-shopping-cart-logo-icon-shopping-cart-label-coffee-shop-shopping-mall.png"</div>
            </div>
            </div>`;
                }

                else if (category == 'contorni') {
                    contorni += `<div class="product-box">
            <div id=${key}>
            <img class="image" src=${image}>
            <div class="title">${title}</div><hr>
            <div class="price">${parseFloat(price).toFixed(2)}$</div><hr>
            <div class="add-to-cart" data-id=${key}><img class="cart-icon" src="https://w7.pngwing.com/pngs/1022/32/png-transparent-shopping-cart-icon-shopping-cart-logo-icon-shopping-cart-label-coffee-shop-shopping-mall.png"</div>
            </div>
            </div>`;
                }

                else if (category == 'dolci') {
                    dolci += `<div class="product-box">
            <div id=${key}>
            <img class="image" src=${image}>
            <div class="title">${title}</div><hr>
            <div class="price">${parseFloat(price).toFixed(2)}$</div><hr>
            <div class="add-to-cart" data-id=${key}><img class="cart-icon" src="https://w7.pngwing.com/pngs/1022/32/png-transparent-shopping-cart-icon-shopping-cart-logo-icon-shopping-cart-label-coffee-shop-shopping-mall.png"</div>
            </div>
            </div>`;
                }








        })

            $('.primi').html(primi);
            $('.secondi').html(secondi);
            $('.contorni').html(contorni);
            $('.dolci').html(dolci);

            //   *******Add to cart******* //
 
        $('.add-to-cart').click(function(){
            let thekey = $(this).data('id');
            let title = $(`#${thekey} > .title`).text(),
                price = $(`#${thekey} > .price`).text(),
                slice = price.indexOf('0');
                price = price.slice(0,slice);

                let appenddata = `<tr>
                                  <td class="carttitle">${title}</td>
                                  <td class="cartprice">${parseFloat(price).toFixed(2)}$</td>
                                  <td class="removeme">X</td>
                                  <td>`
                $('.cart').append(appenddata);                  
        });
    
 $('cart-toggle').click(function(){
   $('.cart-container').slideToggle();
 });

 








        }

        });
});