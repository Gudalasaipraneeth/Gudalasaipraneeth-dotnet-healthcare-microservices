import { backendUrl, getRequest, postRequest } from './common.js';

const servicesContainer = document.querySelector('.services');
const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});

async function getServices() {
    const services = await getRequest(backendUrl + '/api/medical-services');
    services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.classList.add('service');
        serviceElement.innerHTML = `
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <p>Price: ${service.price}</p>
            <button class="add-to-appointment" data-id="${service.id}">Add to Appointment</button>
        `;
        servicesContainer.appendChild(serviceElement);
    });

    const addToAppointmentButtons = document.querySelectorAll('.add-to-appointment');
    addToAppointmentButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const serviceId = event.target.dataset.id;
            const response = await postRequest(backendUrl + '/api/appointments/items', {
                serviceId: serviceId,
                quantity: 1
            });
            if (response) {
                alert('Service added to appointment');
            }
        });
    });
}

getServices();
