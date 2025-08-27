document.addEventListener("DOMContentLoaded", () => {
    // Lee la ruta del archivo Markdown desde una variable global
    const markdownFilePath = window.postMarkdownPath;
    const postViewSection = document.getElementById('post-view-section');

    if (!markdownFilePath) {
        postViewSection.innerHTML = '<p class="text-red-500">Error: No se ha especificado la ruta del post.</p>';
        return;
    }

    fetch(markdownFilePath)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            return res.text();
        })
        .then(md => {
            postViewSection.innerHTML = `
                <div class="bg-gray-900 rounded-lg shadow-md p-6 sm:p-5 border border-gray-800">
                    <a href="/" class="mb-4 inline-block px-4 py-1 border border-gray-600 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 hover:border-gray-400 transition duration-200 ease-in-out text-sm font-medium">
                        ← Atrás
                    </a>
                    <div class="markdown-body mt-4 text-left">
                        ${marked.parse(md)}
                    </div>
                    <a href="/" class="mt-6 inline-block px-6 py-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 hover:border-gray-400 transition duration-200 ease-in-out text-sm font-medium">
                        ← Atrás
                    </a>
                </div>
            `;
        })
        .catch(err => {
            postViewSection.innerHTML = `<p class="text-red-500">Error al cargar el post: ${err.message}</p>`;
            console.error(err);
        });
});