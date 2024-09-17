async function addUser(url) {
    let username = prompt('Provide the user\'s username');
    let email = prompt('Provide the user\'s email');
    let password = prompt('Provide the user\'s password');
    // let role = prompt('Provide the user\'s role (Admin/User)');
    
    if (!username || username.trim() === '' || !email || email.trim() === '' || !password || password.trim() === '' || !role || role.trim() === '') {
        alert('All fields are required');
        return;
    }

    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return;
    }

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: role
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Created a new user';
            location.reload();
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    }).catch((response) => {
        alert(response.statusText);
    });
}

async function deleteUser(url, userId) {
    console.log(`Deleting user with ID: ${userId} at ${url}/${userId}`);

    try {
        const response = await fetch(`${url}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('User deleted successfully.');
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

async function editUser(url, userId) {
    console.log(`edit a user:: ${userId} at ${url}/${userId}`);
    let username = prompt('Provide the new user\'s username');
    let email = prompt('Provide the new user\'s email');
    let password = prompt('Provide the new user\'s password');
    let role = prompt('Provide the new user\'s role (Admin/User)');

    if (!username || username.trim() === '' || !email || email.trim() === '' || !password || password.trim() === '' || !role || role.trim() === '') {
        alert('All fields are required');
        return;
    }

    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return;
    }

    try {
        const response = await fetch(`${url}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                role: role
            })
        });

        if (response.ok) {
            alert('User edited successfully.');
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