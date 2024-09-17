async function addBrand(url) {
    let name = prompt('Provide the brand\'s name');
    if (!name || name.trim() === '') {
        alert('Brand name cannot be empty');
        return;
    }
    if (name.length < 3) {
        alert('Brand name must be at least 3 characters long');
        return;
    }
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Created a new brand';
            location.reload();
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    }).catch((response) => {
        alert(response.statusText);
    });
}
async function deleteBrand(url, brandId) {
    console.log(`Deleting brand with ID: ${brandId} at ${url}/${brandId}`);

    try {
        const response = await fetch(`${url}/${brandId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Brand deleted successfully.');
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
async function editBrand(url, brandId) {
    console.log(`edit a brand:: ${brandId} at ${url}/${brandId}`);
    let name = prompt('Provide the new brand\'s name')

    if (!name) {
        return;
    }
    if (!name || name.trim() === '') {
        alert('Brand name cannot be empty');
        return;
    }
    if (name.length < 3) {
        alert('Brand name must be at least 3 characters long');
        return;
    }
    try {
        const response = await fetch(`${url}/${brandId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        });

        if (response.ok) {
            alert('Brand edited successfully.');
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