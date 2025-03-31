document.addEventListener("DOMContentLoaded", function () {
    // Cargar perfil (ya lo tienes, así que no lo repito)
    if (typeof perfil !== "undefined") {
        document.getElementById("nombre").textContent = perfil.nombre;
        document.getElementById("sobre-mi").textContent = perfil.sobre_mi;

        // Cargar certificaciones
        let certsHtml = "";
        perfil.certificaciones.forEach(cert => {
            certsHtml += `<li>${cert}</li>`;
        });
        document.getElementById("certificaciones").innerHTML = certsHtml;

        // Cargar redes sociales
        let redesHtml = "";
        for (let [nombre, url] of Object.entries(perfil.redes)) {
            redesHtml += `<a href="${url}" target="_blank">${nombre}</a><br>`;
        }
        document.getElementById("redes").innerHTML = redesHtml;
    }

    // Si estamos en la página principal, cargar los posts
    if (document.getElementById("posts-container")) {
        let postsHtml = "";
        let separatorClase = ""; // Variable para el color del separador

        posts.forEach(post => {
            let tipoClase = "";
            let tipoTexto = "";

            // Determinamos la clase y el texto según el tipo de post
            if (post.tipo === "writeup") {
                tipoClase = "post-writeup";
                tipoTexto = "📕 Writeup";
                separatorClase = "separator-writeup"; // Asignamos la clase para el separador verde
            } else if (post.tipo === "anuncio") {
                tipoClase = "post-anuncio";
                tipoTexto = "❗ Anuncio";
                separatorClase = "separator-anuncio"; // Asignamos la clase para el separador naranja
            } else if (post.tipo === "video") {
                tipoClase = "post-video";
                tipoTexto = "📛 Video";
                separatorClase = "separator-video"; // Asignamos la clase para el separador rojo
            } else if (post.tipo === "post") {  // Nuevo tipo de post (morado)
                tipoClase = "post-morado";
                tipoTexto = "🔰 Post";
                separatorClase = "separator-morado"; // Asignamos la clase para el separador morado
            }

            // Agregamos el post al HTML
            postsHtml += `
                <article class="post ${tipoClase}">
                    <h2><a href="${post.url}">${post.titulo}</a></h2>
                    <p class="post-meta">Publicado el <span>${post.fecha}</span></p>
                    ${post.contenido}
                    <div class="post-tipo ${tipoClase}">${tipoTexto}</div>
                </article>
            `;
        });

        // Establecemos el contenido de los posts
        document.getElementById("posts-container").innerHTML = postsHtml;

        // Cambiamos el color del separador al color correspondiente según el tipo de post
        const separator = document.querySelector('.separator');
        separator.classList.remove('separator-writeup', 'separator-anuncio', 'separator-video', 'separator-morado'); // Eliminamos clases previas
        separator.classList.add(separatorClase); // Añadimos la clase correspondiente
    }
});
