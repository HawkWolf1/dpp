document.addEventListener('DOMContentLoaded', function () {
    
    let detailsButton = document.getElementById('details');

    const token = localStorage.getItem('token')

    detailsButton.addEventListener('click', async function (event) {
        event.preventDefault()
        try{
            let customerName = document.getElementById("customerName").value;
            let phoneNo = document.getElementById("phoneNo").value;
            let movieName = document.getElementById("movieName").value;
            let rent = document.getElementById("rent").value;
            let daysRented = document.getElementById("daysRented").value;
            let deliveryCharge = document.getElementById("deliveryCharge").value;
            
            if (!customerName || !phoneNo || !movieName || !rent || !daysRented || !deliveryCharge) {
                alert('Fill in all inputs before adding details.');
                return;
            }


            const myObject = {
                customerName,
                phoneNo,
                movieName,
                rent,
                daysRented,
                deliveryCharge
            }
            console.log(myObject)
            const response = await axios.post("http://localhost:4000/user/delivery-details", myObject,  {headers: {'Authorization' : token}}) 
            console.log(response)
            console.log('aaaaaaaaa')
            if(response.status===200){
                alert('Delivery details added successfully')
                document.getElementById('customerName').value = '';
                document.getElementById('phoneNo').value = '';
                document.getElementById('movieName').value = '';
                document.getElementById('rent').value = '';
                document.getElementById('daysRented').value = '';
                
            }
        }catch(err){
            document.body.innerHTML = document.body.innerHTML + "<h3 style='color:red'> Error! Try in some time!!! </h3>"
            console.log("Error Block: ",err)
            }  
    });
});



