document.addEventListener('DOMContentLoaded', function() {
    const marketplace = document.querySelector('.marketplace');

    // local storage source: https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/
    const items = JSON.parse(localStorage.getItem('marketplaceItems')) || [];
    console.log('Loaded items from local storage:', items);

    // display items
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="max-width: 100%; height: auto;"/>
            <div class="item-info">
                <span>${item.title}</span>
                <span class="price">€${item.price}</span>
                <!-- Description to stay hidden -->
                <p class="description" style="display: none;">${item.description}</p>
                <p class="mobile" style="display: none;">${item.mobile}</p>
            </div>
        `;

        marketplace.appendChild(itemDiv);
    });

    // Function to open the overlay
    function openOverlay(content) {
        document.getElementById('overlayContent').innerHTML = content;
        document.getElementById('overlay').style.width = '100%';
    }

    // Function to close the overlay
    window.closeOverlay = function() {
        document.getElementById('overlay').style.width = '0%';
    }

    // Function to add click event listener to each item image
    function addClickListenerToItems() {
        document.querySelectorAll('.item img').forEach(function(img) {
            img.addEventListener('click', function() {
                const parentItem = this.parentElement;
                const title = parentItem.querySelector('.item-info span').textContent;
                const price = parentItem.querySelector('.item-info .price').textContent;
                const description = parentItem.querySelector('.description').textContent;
                const mobile = parentItem.querySelector('.mobile').textContent;

                const content = `
                    <div class="details">
                        <p><strong>Title:</strong> ${title}</p>
                        <p><strong>Price:</strong> ${price}</p>
                        <p><strong>Description:</strong> ${description}</p>
                        <p><strong>Mobile:</strong> ${mobile}</p>
                    </div>
                    <img src="${this.src}" alt="${this.alt}"/>
                `;

                openOverlay(content);
            });
        });
    }

    // Apply click event listeners to all items
    addClickListenerToItems();
});


