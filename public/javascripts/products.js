async function addProduct(url) {
    let name = prompt('Provide the products\'s name')
    let description = prompt('Provide the product\'s description');
    let unitprice = prompt('Provide the product\'s unit price');
    let discount = prompt('Provide the product\'s discont');
    let dateAdded = prompt('Provide the product\'s date added (YYYY-MM-DD)');
    let imgurl = prompt('Provide the product\'s image URL');
    let quantity = prompt('Provide the product\'s quantity');
    let brandId = prompt('Provide the product\'s brandId');
    let categoryId = prompt('Provide the product\'s categoryId');
    if (!name || !description || !unitprice || !discount || !dateAdded || !imgurl || !quantity || !brandId || !categoryId) {
        return;
    }
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            unitprice: parseFloat(unitprice),
            discount: parseFloat(discount),
            date_added: dateAdded,
            imgurl: imgurl,
            quantity: parseInt(quantity),
            brandId: parseInt(brandId),
            CategoryId: parseInt(categoryId)
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Created a new product';
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    })
      .catch((response) => {
        alert(response.statusText);
      });
}


// async function deleteProduct(url, productId) {
//     console.log(url, productId)
//     await fetch(url, {
//         method: 'DELETE',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             productId: productId
//         })
//     }).then((response) => {
//         if (response.ok) {
//             const resData = 'Product deleted...';
//             location.reload()
//             return Promise.resolve(resData);
//         }
//         return Promise.reject(response);
//     })
//     .catch((response) => {
//         alert(response.statusText);
//     })
// }
async function deleteProduct(url, productId) {
    console.log(`Deleting product with ID: ${productId} at ${url}/${productId}`);

    try {
        const response = await fetch(`${url}/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Product deleted successfully.');
            location.reload();
        } else {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error, please try again later.');
    }
}
async function editProduct(url, productId) {
    console.log(`edit a product:: ${productId} at ${url}/${productId}`);
    let name = prompt('Provide the products\'s name')
    let description = prompt('Provide the product\'s description');
    let unitprice = prompt('Provide the product\'s unit price');
    let discount = prompt('Provide the product\'s discont');
    let dateAdded = prompt('Provide the product\'s date added (YYYY-MM-DD)');
    let imgurl = prompt('Provide the product\'s image URL');
    let quantity = prompt('Provide the product\'s quantity');
    let brandId = prompt('Provide the product\'s brandId');
    let categoryId = prompt('Provide the product\'s categoryId');
    if (!name || !description || !unitprice || !discount || !dateAdded || !imgurl || !quantity || !brandId || !categoryId) {
        return;
    }
    try {
        const response = await fetch(`${url}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                unitprice: parseFloat(unitprice),
                discount: parseFloat(discount),
                date_added: dateAdded,
                imgurl: imgurl,
                quantity: parseInt(quantity),
                brandId: parseInt(brandId),
                CategoryId: parseInt(categoryId)
            })
        });

        if (response.ok) {
            alert('Product edited successfully.');
            location.reload();
        } else {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error, please try again later.');
    }
}