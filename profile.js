document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const profileUsername = document.getElementById('profileUsername');
    const profileEmail = document.getElementById('profileEmail');
    const profileFirstName = document.getElementById('profileFirstName');
    const profileLastName = document.getElementById('profileLastName');
    const profileMemberSince = document.getElementById('profileMemberSince');
    const profilePicture = document.getElementById('profilePicture');
    const profilePicturePreview = document.getElementById('profilePicturePreview');
    const editProfileButton = document.getElementById('editProfileButton');
    const editProfileForm = document.getElementById('editProfileForm');
    const editUsername = document.getElementById('editUsername');
    const editEmail = document.getElementById('editEmail');
    const editFirstName = document.getElementById('editFirstName');
    const editLastName = document.getElementById('editLastName');
    const editBio = document.getElementById('editBio');
    const editProfilePicture = document.getElementById('editProfilePicture');
    const saveProfileButton = document.getElementById('saveProfileButton');
    const cancelEditButton = document.getElementById('cancelEditButton');
    const message = document.getElementById('message');

    if (!userId) {
        alert('No user ID provided.');
        return;
    }

    fetch(`http://localhost:8000/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            const { userProfile } = data;
            profileUsername.textContent = userProfile.username;
            profileEmail.textContent = userProfile.email;
            profileFirstName.textContent = userProfile.first_name || '';
            profileLastName.textContent = userProfile.last_name || '';
            profileMemberSince.textContent = userProfile.member_since;
            profilePicture.src = userProfile.profile_picture ? `http://localhost:8000${userProfile.profile_picture}` : '';

            editUsername.value = userProfile.username;
            editEmail.value = userProfile.email;
            editFirstName.value = userProfile.first_name || '';
            editLastName.value = userProfile.last_name || '';
            editBio.value = userProfile.bio || '';
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching user data.');
        });

    editProfileButton.addEventListener('click', () => {
        editProfileForm.style.display = 'flex';
        editProfileButton.style.display = 'none';
    });

    cancelEditButton.addEventListener('click', () => {
        editProfileForm.style.display = 'none';
        editProfileButton.style.display = 'block';
        message.textContent = '';
    });

    editProfilePicture.addEventListener('change', () => {
        const file = editProfilePicture.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicturePreview.src = e.target.result;
                profilePicturePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            profilePicturePreview.style.display = 'none';
        }
    });

    saveProfileButton.addEventListener('click', () => {
        const formData = new FormData();
        formData.append('username', editUsername.value);
        formData.append('email', editEmail.value);
        formData.append('first_name', editFirstName.value);
        formData.append('last_name', editLastName.value);
        formData.append('bio', editBio.value);
        if (editProfilePicture.files[0]) {
            formData.append('profile_picture', editProfilePicture.files[0]);
        }

        fetch(`http://localhost:8000/users/${userId}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const { userProfile } = data;
                profileUsername.textContent = userProfile.username;
                profileEmail.textContent = userProfile.email;
                profileFirstName.textContent = userProfile.first_name || '';
                profileLastName.textContent = userProfile.last_name || '';
                profilePicture.src = userProfile.profile_picture ? `http://localhost:8000${userProfile.profile_picture}` : '';
                message.textContent = 'Profile updated successfully!';
                message.style.color = 'green';

                editProfileForm.style.display = 'none';
                editProfileButton.style.display = 'block';
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                message.textContent = 'An error occurred while updating the profile.';
                message.style.color = 'red';
            });
    });
});
