$(document).ready(function () {
    const database = firebase.database();
    const beforeQuery = database.ref('menu/');

    //   ********NOTIFICATION******* //

    const notifications = (message) => {
        if (message == 'fillall') {
            $('.fillall').fadeIn(1000);

            setTimeout(function () {
                $('.fillall').fadeOut(1000);
            }, 3500);
        }
        if (message == 'inserted successfully') {
            $('.inserted').fadeIn(1000);

            setTimeout(function () {
                $('.inserted').fadeOut(1000);
            }, 3500);
        }
        if (message == 'updated') {
            $('.updated').fadeIn(1000);

            setTimeout(function () {
                $('.updated').fadeOut(1000);
            }, 3500);
        }
    }







    //   ********Add new dishes******* //

    $('[name=submit]').click(function (e) {
        e.preventDefault();

        const category = $('[name=category]').val(),
            title = $('[name=title]').val(),
            price = $('[name=price]').val(),
            image = $('[name=image]').val().slice(12),
            newid = beforeQuery.push();

        if (!title || !price || !image) {
            notifications('fillall');
        }
        else {
            newid.set({
                category: category,
                title: title,
                price: price,
                image: "img/" + image
            }),
                function (error) {
                    if (!error) {
                        notifications("inserted successfully");
                        $('[name-title]').val("");
                        $('[name-price]').val("");
                        $('[name-image]').val("");
                    }
                    else {
                        console.log('Not Saved')
                    }
                }
        }





    });


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
                     <div data-id=${key} class="delete"></div>
                     <div data-id=${key} class="update"></div>
                     </div>
                     </div>`;
                }
                else if (category == 'secondi') {
                    secondi += `<div class="product-box">
            <div id=${key}>
            <img class="image" src=${image}>
            <div class="title">${title}</div><hr>
            <div class="price">${parseFloat(price).toFixed(2)}$</div><hr>
            <div data-id=${key} class="delete"></div>
            <div data-id=${key} class="update"></div>
            </div>
            </div>`;
                }

                else if (category == 'contorni') {
                    contorni += `<div class="product-box">
            <div id=${key}>
            <img class="image" src=${image}>
            <div class="title">${title}</div><hr>
            <div class="price">${parseFloat(price).toFixed(2)}$</div><hr>
            <div data-id=${key} class="delete"></div>
            <div data-id=${key} class="update"></div>
            </div>
            </div>`;
                }

                else if (category == 'dolci') {
                    dolci += `<div class="product-box">
            <div id=${key}>
            <img class="image" src=${image}>
            <div class="title">${title}</div><hr>
            <div class="price">${parseFloat(price).toFixed(2)}$</div><hr>
            <div data-id=${key} class="delete"></div>
            <div data-id=${key} class="update"></div>
            </div>
            </div>`;
                }








            })

            $('.primi').html(primi);
            $('.secondi').html(secondi);
            $('.contorni').html(contorni);
            $('.dolci').html(dolci);

            //   ********Deleting from Database******* //

            $('.delete').click(function () {
                let thekey = $(this).data('id');
                beforeQuery.child(thekey).remove();
            });

            //   ********Edit from Database******* //
            $('#close-update').click(function () {
                $('#for-update').slideup();
            })

            $('.update').click(function () {
                let thekey = $(this).data('id');
                $('#for-update').slideDown();

                let oldtitle = $(`#${theekey} > .title`).text(),
                    oldprice = $(`#${theekey} > .price`).text(),
                    slice = oldprice.indexOf('.');
                oldprice = oldprice.slice(0, slice);


                $('[name=newtitle]').val(oldtitle);
                $('[name=newprice]').val(parseFloat(oldprice).toFixed(2));
                $('[name=newid]').val(theekey);

                $('[name=update]').click(function (e) {
                    e.preventDefault();
                    let theid = $('[name=id]').val();
                    newtitle = $('[name=newtitle]').val();
                    newprice = $('[name=newprice]').val();



                    beforeQuery.child(theid).update({
                        title: newtitle,
                        price: newprice,
                    }, function (error) {
                        if (!error) {
                            notifications('updated');
                            $('#for-update').slideup();
                        } else {

                        }

                    })
                });
            });


        } else {
            console.log('No Data Found')
        };


    });
});