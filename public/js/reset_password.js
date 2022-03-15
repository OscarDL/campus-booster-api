document.getElementById('submit').disabled = true;

const enableBtn = () => {
    return (
        document.getElementById('password').value === document.getElementById('password_repeat').value &&
        document.getElementById('password').value.length > 6
    );
}

document.getElementById('password').addEventListener('keyup', () => {
    document.getElementById('submit').disabled = !enableBtn();
});

document.getElementById('password_repeat').addEventListener('keyup', () => {
    document.getElementById('submit').disabled = !enableBtn();
});


document.getElementById('submit').addEventListener('click', () => {
    const urlParams = new URLSearchParams(window.location.search);
    $.ajax({
        url: `/auth/change_password?email=${urlParams.get('email')}&token=${urlParams.get('token')}`,
        type: 'POST',
        data: {
            password: document.getElementById('password').value,
        },
        error: (err) => {
            console.log(err)
        }
    }).done(() => {
        window.location.href = urlParams.get('redirectUri');
    });
});
