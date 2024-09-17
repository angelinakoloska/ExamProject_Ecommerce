async function addCategory(url) {
    let name = prompt('Provide the category\'s name');
    if (!name || name.trim() === '') {
        alert('Category name cannot be empty');
        return;
    }
    if (name.length < 3) {
        alert('Category name must be at least 3 characters long');
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
            const resData = 'Created a new category';
            location.reload();
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    }).catch((response) => {
        alert(response.statusText);
    });
}
async function deleteCategory(url, categoryId) {
    console.log(`Deleting category with ID: ${categoryId} at ${url}/${categoryId}`);

    try {
        const response = await fetch(`${url}/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Category deleted successfully.');
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
async function editCategory(url, categoryId) {
    console.log(`edit a category:: ${categoryId} at ${url}/${categoryId}`);
    let name = prompt('Provide the category\'s name')

    if (!name) {
        return;
    }
    if (!name || name.trim() === '') {
        alert('Category name cannot be empty');
        return;
    }
    if (name.length < 3) {
        alert('Category name must be at least 3 characters long');
        return;
    }
    try {
        const response = await fetch(`${url}/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        });

        if (response.ok) {
            alert('Category edited successfully.');
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