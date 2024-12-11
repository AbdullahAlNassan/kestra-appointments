// API endpoint configuration
const API_BASE_URL = 'http://localhost:3000';

// Form submission handler
document.getElementById('appointmentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const appointment = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        duration: document.getElementById('duration').value,
        email: document.getElementById('email').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create appointment');
        }
        
        // Clear form
        this.reset();
        
        // Refresh display
        await displayAppointments();
        
        alert('Appointment created! Check your email for the calendar invite.');
    } catch (error) {
        console.error('Error creating appointment:', error);
        alert('Error creating appointment. Please try again.');
    }
});

async function displayAppointments() {
    try {
        const response = await fetch(`${API_BASE_URL}/appointments`);
        const appointments = await response.json();
        
        const appointmentsList = document.getElementById('appointmentsList');
        appointmentsList.innerHTML = appointments
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(apt => `
                <div class="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 class="font-semibold">${apt.title}</h3>
                    <p class="text-sm text-gray-600">
                        ${moment(apt.date + ' ' + apt.time).format('MMMM D, YYYY h:mm A')}
                    </p>
                    <p class="text-sm text-gray-500">${apt.description || 'No description'}</p>
                </div>
            `)
            .join('');
    } catch (error) {
        console.error('Error fetching appointments:', error);
        document.getElementById('appointmentsList').innerHTML = 
            '<p class="text-red-500">Error loading appointments</p>';
    }
}

// Initial display
displayAppointments();