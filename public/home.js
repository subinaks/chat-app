    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BPDtXmNweWHXRbOGngz8XqgZOO81p3HnrN5xqwZmqcUCwyOc9Ltzl6hDF0INpicDyKQRoCqIaaXXxByUrSIhqbg");
    function sendTokenToServer(fcm_token) {
        const userId = window.userId;
        axios.post('/api/save-token', {
            fcm_token, user_id
        })
            .then(res => {
                console.log(res);
            })

    }

    function retreiveToken(){
        
        messaging.getToken().then((currentToken) => {
            if (currentToken) {
                sendTokenToServer(currentToken);
            } else {
            
                alert('You should allow notification!');
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }
    retreiveToken();
    messaging.onTokenRefresh(()=>{
       
        retreiveToken();
    });

    messaging.onMessage((payload)=>{
        location.reload();
    });
