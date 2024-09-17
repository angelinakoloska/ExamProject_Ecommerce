document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // const username = document.getElementById('username').value;
    // const password = document.getElementById('password').value;\
  
    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        window.location.href = '/admin/dashboard.html';
      } else {
        const errorData = await response.json();
        alert('Login failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  });