const delivery = document.getElementById('delivery');

delivery.addEventListener('click', function (e) {
    e.preventDefault();

    alert('Navigating to DVD Delivery page');
    window.location.href = "./delivery.html";
});


document.addEventListener('DOMContentLoaded', async function () {
    let pickup = document.getElementById('pickup');

    pickup.addEventListener('click', async function (e) {
        e.preventDefault();

        const phoneNo = prompt('Enter the phone number:');
        if (!phoneNo) {
            alert('Phone number is required.');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(
                `http://localhost:4000/user/pickup-details?phoneNo=${phoneNo}`, { headers: { 'Authorization': token } }
            );

            console.log(response);

            if (response.status === 200) {
                const movieDetails = response.data.movieDetails;

                if (movieDetails.length === 0) {
                    alert('No movie details found for pickup.');
                } else {
                    const groupedDetails = new Map();

                    movieDetails.forEach(detail => {
                        const phoneNo = detail.mobile;

                        if (!groupedDetails.has(phoneNo)) {
                            groupedDetails.set(phoneNo, []);
                        }

                        groupedDetails.get(phoneNo).push(detail);
                    });

                    const newWindow = window.open('', 'Movie Details for Pickup', 'width=600,height=400');

                    const table = newWindow.document.createElement('table');
                    table.style.width = '100%';
                    table.style.borderCollapse = 'collapse';
                    table.style.marginTop = '20px';

                    const headerRow = table.insertRow();
                    ['Phone No', 'Movie', 'Rent', 'Select'].forEach(headerText => {
                        const th = newWindow.document.createElement('th');
                        th.textContent = headerText;
                        th.style.border = '1px solid #ddd';
                        th.style.padding = '8px';
                        th.style.textAlign = 'left';
                        th.style.backgroundColor = '#f2f2f2';
                        headerRow.appendChild(th);
                    });

                    const selectedMovies = new Set();

                    groupedDetails.forEach((details, phoneNo) => {
                        details.forEach(detail => {
                            const row = table.insertRow();
                            [phoneNo, detail.movie, detail.rent].forEach(value => {
                                const cell = row.insertCell();
                                cell.textContent = value;
                                cell.style.border = '1px solid #ddd';
                                cell.style.padding = '8px';
                                cell.style.textAlign = 'left';
                            });

                    
                            const checkboxCell = row.insertCell();
                            const checkbox = newWindow.document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.name = 'pickupCheckbox';
                            checkbox.value = detail.movie;
                            checkboxCell.appendChild(checkbox);

                 
                            checkbox.addEventListener('change', function () {
                                if (checkbox.checked) {
                                    selectedMovies.add(detail.movie);
                                } else {
                                    selectedMovies.delete(detail.movie);
                                }
                            });
                        });
                    });

                    newWindow.document.body.appendChild(table);

                    const confirmButton = newWindow.document.createElement('button');
                    confirmButton.textContent = 'Confirm Pickup';
                    confirmButton.style.marginTop = '20px';
                    newWindow.document.body.appendChild(confirmButton);

                    confirmButton.addEventListener('click', async function () {
                        if (selectedMovies.size > 0) {
                            try {
                                const updateResponse = await axios.post(
                                    'http://localhost:4000/user/update-pickup', 
                                    { phoneNo, selectedMovies: Array.from(selectedMovies) },
                                    { headers: { 'Authorization': token } }
                                );
                                console.log(updateResponse)

                                if (updateResponse.status === 200) {
                                    alert('Movies confirmed for pickup!');
                                    newWindow.close();
                                } else {
                                    alert('Failed to update the database. Try again later.');
                                }
                            } catch (updateError) {
                                console.error(updateError);
                                alert('Failed to update the database. Try again later.');
                            }
                        } else {
                            alert('Please select at least one movie for pickup.');
                        }
                    });
                }
            }
        } catch (err) {
            console.error(err);
            alert('Invalid No! Try again');
        }
    });
});


