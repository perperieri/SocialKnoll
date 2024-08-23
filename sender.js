// sender.js
export function sendMessage(message, confermaButton, responseDiv, confirm_text) {
    return new Promise((resolve, reject) => {
        const url = 'https://dmc3oj2v8b.execute-api.eu-west-3.amazonaws.com/prod'; // Your API Gateway URL
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    console.log(req.responseText);
                    responseDiv.textContent = confirm_text;
                    responseDiv.style.display = 'block';
                    resolve(req.responseText); // Resolve the promise with the response
                } else {
                    console.error('Error:', req.status, req.statusText);
                    responseDiv.textContent = "Errore nell'invio della richiesta. Riprova più tardi.";
                    responseDiv.style.display = 'block';
                    reject(new Error(`Request failed with status ${req.status}`)); // Reject the promise with an error
                }
                confermaButton.disabled = false;
            }
        };

        // Construct the URL with the SQS API version
        const apiUrl = `${url}?Version=2012-11-05`;
        
        req.open("POST", apiUrl, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        const messageDeduplicationId = Date.now().toString();

        // Construct the request body
        const params = new URLSearchParams({
            Action: 'SendMessage',
            MessageBody: message,
            MessageGroupId: 'default',
            MessageDeduplicationId: messageDeduplicationId,
            Version: '2012-11-05'
        });
        
        req.send(params.toString());
        confermaButton.disabled = true; // Disable the button to prevent multiple clicks
    });
}
