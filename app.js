document.getElementById("imei-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const imei = document.getElementById("imei").value;
    const email = document.getElementById("email").value;
    const descripcion = document.getElementById("descripcion").value;
    const message = document.getElementById("message");

    // Validar el IMEI (debe tener 15 dígitos)
    if (!/^\d{15}$/.test(imei)) {
        message.textContent = "Por favor, ingrese un IMEI válido de 15 dígitos.";
        message.style.color = "red";
        return;
    }

    // Correos de las operadoras
    const operadoras = [
        "atencionclientes@telefonica.es", // Movistar
        "vodafone@vodafone.com",           // Vodafone
        "atencioncliente@orange.es",       // Orange
        "comunicacion@yoigo.com",          // Yoigo
        "contacto@masmovil.es",            // MásMóvil
        "hola@pepephone.com",              // Pepephone
        "atencioncliente@jazztel.com",     // Jazztel
        "info@simyo.es"                    // Simyo
    ];

    // Parámetros que se enviarán a EmailJS
    const templateParams = {
        imei: imei,
        email: email,
        descripcion: descripcion,
        destinatarios: operadoras.join(", ") // Convertimos el array a una cadena
    };

    // Opciones de configuración para la solicitud
    const data = {
        service_id: "service_acu5r2c",
        template_id: "template_c1sjtzn",
        user_id: "03IW_-nbOgjPnOnM9",
        template_params: templateParams
    };

    // Enviar el correo usando fetch
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok.');
    })
    .then(function(responseText) {
        console.log("SUCCESS!", responseText);
        message.textContent = "Su solicitud se ha enviado correctamente.";
        message.style.color = "green";
    })
    .catch(function(error) {
        console.error("FAILED...", error);
        message.textContent = "Error al enviar la denuncia. Inténtelo de nuevo más tarde.";
        message.style.color = "red";
    });

    // Resetear el formulario
    document.getElementById("imei-form").reset();
});
