document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sellForm');

    form.addEventListener('submit', function(event) {
        const imageInput = document.getElementById('itemImage');
        const titleInput = document.getElementById('itemTitle');
        const priceInput = document.getElementById('itemPrice');
        const descriptionInput = document.getElementById('itemDescription');
        const mobileInput = document.getElementById('itemMobile');

        //REGEX cheat sheet: https://cheatography.com/davechild/cheat-sheets/regular-expressions/
        const mobilePattern = /^08\d{8}$/;

        let valid = true;
        let errorMessage = '';

        // Validate image
        const file = imageInput.files[0];
        if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
            valid = false;
            errorMessage += 'Please upload a PNG or JPEG image of your item. \n';
        }

        // Validate title
        if (titleInput.value.length > 50) {
            valid = false;
            errorMessage += 'Title must be under 50 characters. \n';
        }

        // Validate price
        const price = parseInt(priceInput.value, 10);
        if (isNaN(price) || price >= 10000) {
            valid = false;
            errorMessage += 'Price must under €10,000. \n';
        }

        // Validate description
        if (descriptionInput.value.length > 250) {
            valid = false;
            errorMessage += 'Description must be less than 250 characters.\n';
        }

        // Validate mobile number
        if (!mobilePattern.test(mobileInput.value)) {
            valid = false;
            errorMessage += 'Please enter a valid 08 Mobile number. \n';
        }

        if (!valid) {
            alert(errorMessage);
            event.preventDefault(); // Prevent form submission
        } else {
            
            //Source for storing items locally: https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/
            const reader = new FileReader();
            reader.onload = function(e) {
                const newItem = {
                    image: e.target.result,
                    title: titleInput.value,
                    price: priceInput.value,
                    description: descriptionInput.value,
                    mobile: mobileInput.value
                };

                let items = JSON.parse(localStorage.getItem('marketplaceItems')) || [];
                items.push(newItem);
                localStorage.setItem('marketplaceItems', JSON.stringify(items));

                
                console.log('Item saved:', newItem);
                console.log('Redirecting to marketplace...');

                //if an item is saved, redirect to marketplace
                window.location.href = 'marketplace.html';
            };
            reader.readAsDataURL(file);

            event.preventDefault(); // Prevent form submission to allow for redirect
        }
    });
});

