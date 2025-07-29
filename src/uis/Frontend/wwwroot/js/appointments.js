import { backendUrl, getRequest, deleteRequest } from './common.js';

const appointmentsContainer = document.querySelector('.appointments');
const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});

async function getAppointments() {
    const appointments = await getRequest(backendUrl + '/api/appointments');
    if (appointments && appointments.items) {
        appointments.items.forEach(item => {
            const appointmentElement = document.createElement('div');
            appointmentElement.classList.add('appointment');
            appointmentElement.innerHTML = `
                <h3>${item.serviceName}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ${item.price}</p>
                <button class="remove-from-appointment" data-id="${item.serviceId}">Remove</button>
            `;
            appointmentsContainer.appendChild(appointmentElement);
        });
    }

    const removeFromAppointmentButtons = document.querySelectorAll('.remove-from-appointment');
    removeFromAppointmentButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const serviceId = event.target.dataset.id;
            const response = await deleteRequest(backendUrl + '/api/appointments/items/' + serviceId);
            if (response) {
                alert('Service removed from appointment');
                window.location.reload();
            }
        });
    });
}

getAppointments();
