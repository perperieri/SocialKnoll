// Replace with your actual API Gateway URL
const url = 'https://dmc3oj2v8b.execute-api.eu-west-3.amazonaws.com/prod';

function sendMessage(message, confermaButton, responseDiv, confirm_text) {

    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.status === 200) {
                console.log(req.responseText);
                responseDiv.textContent = "Richiesta di giudizio collettivo inviata. Attendete il responso.";
                responseDiv.style.display = 'block';
            } else {
                console.error('Error:', req.status, req.statusText);
                responseDiv.textContent = "Errore nell'invio della richiesta. Riprova più tardi.";
                responseDiv.style.display = 'block';
            }
            confermaButton.disabled = false;
        }
    };

    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");

    req.send(giudizio);
    confermaButton.disabled = true;
}