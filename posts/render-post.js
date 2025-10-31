document.addEventListener("DOMContentLoaded", function() {
    const postViewSection = document.getElementById('post-view-section');
    const markdownPath = window.postMarkdownPath;

    if (!markdownPath) return;

    fetch(markdownPath)
        .then(response => response.text())
        .then(markdownText => {
            
            // Suponemos que quieres el título del post
            const postTitle = document.title.replace('k4ixer - ', ''); 
            
            // APLICADO: Estructura de la tarjeta y clases de botón consistentes
            postViewSection.innerHTML = `
                <div class="card p-6 sm:p-8">
                    <a href="/index.html" class="mb-6 inline-block 
                        px-4 py-1 border border-neutral-800 bg-neutral-900 text-gray-200 
                        hover:bg-neutral-800 transition duration-200 ease-in-out text-sm font-medium">
                        ← Volver al Índice
                    </a>
                    <h1 class="text-3xl font-bold mb-2 text-gray-100">${postTitle}</h1>
                    <span class="inline-block px-2 py-1 text-xs font-semibold bg-green-500 text-black mb-6">Writeup</span>

                    <div class="markdown-content text-left space-y-4">
    ${marked.parse(markdownText)}
</div>
                    
                    <a href="/index.html" class="mt-8 inline-block 
                        px-6 py-2 border border-neutral-800 bg-neutral-900 text-gray-200 
                        hover:bg-neutral-800 transition duration-200 ease-in-out text-sm font-medium">
                        ← Volver al Índice
                    </a>
                </div>
            `;
        })
        .catch(error => {
            postViewSection.innerHTML = `<p class="text-red-500">Error al cargar el post: ${error}</p>`;
            console.error(error);
        });
});