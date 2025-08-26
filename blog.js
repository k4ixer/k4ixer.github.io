document.addEventListener("DOMContentLoaded", () => {
    const postsListWrapper = document.getElementById('posts-list-wrapper');
    const postsList = document.getElementById('posts-list');
    const postView = document.getElementById('post-view');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    // Elementos de herramientas
    const toolsList = document.getElementById('tools-list');
    const prevToolPageBtn = document.getElementById('prev-tool-page');
    const nextToolPageBtn = document.getElementById('next-tool-page');

    const postsPerPage = 3;
    let allPosts = [];
    let allTools = [];
    let currentPage = 1;
    let currentToolPage = 1;

    // --- Funciones para Posts ---

    function renderPosts(posts) {
        postsList.innerHTML = '';
        posts.forEach((post) => {
            let badgeClass = "";
            let badgeText = "";
            switch (post.tipo) {
                case "post":
                    badgeClass = "bg-blue-500 text-black";
                    badgeText = "Post";
                    break;
                case "writeup":
                    badgeClass = "bg-green-500 text-black";
                    badgeText = "Writeup";
                    break;
                case "herramienta":
                    badgeClass = "bg-yellow-400 text-black";
                    badgeText = "Herramienta";
                    break;
                default:
                    badgeClass = "bg-gray-700 text-black";
                    badgeText = "Otro";
            }

            const card = document.createElement('div');
            card.className = `bg-gray-900 rounded-lg shadow-sm p-4 flex flex-col justify-between border border-gray-800 transition-all duration-300 cursor-pointer`;
            
            card.innerHTML = `
                <div>
                    <h3 class="text-lg font-bold text-gray-100 mb-2">${post.nombre}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-2">${post.descripcion}</p>
                    <span class="inline-block px-2 py-1 text-xs font-semibold rounded ${badgeClass} mb-2">${badgeText}</span>
                </div>
                <button class="mt-2 px-4 py-1 border border-gray-600 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 hover:border-gray-400 transition duration-200 ease-in-out text-sm font-medium">
                    Leer
                </button>
            `;

            card.querySelector("button").onclick = () => {
                showPost(post);
            };
            postsList.appendChild(card);
        });
    }

    function showPost(post) {
    fetch(post.ruta)
        .then(res => res.text())
        .then(md => {
            postView.innerHTML = `
                <div class="bg-gray-900 rounded-lg shadow-md p-6 sm:p-5 border border-gray-800">
                    <button id="back-top" class="mb-4 px-4 py-1 border border-gray-600 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 hover:border-gray-400 transition duration-200 ease-in-out text-sm font-medium">
                        ← Atrás
                    </button>
                    <div class="markdown-body mt-4 text-left">
                        ${marked.parse(md)}
                    </div>
                    <button id="back-bottom" class="mt-6 px-6 py-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 hover:border-gray-400 transition duration-200 ease-in-out text-sm font-medium">
                        ← Atrás
                    </button>
                </div>
            `;
            postsListWrapper.classList.add("hidden");
            postView.classList.remove("hidden");
            
            // --- Actualizar la URL ---
            const url = new URL(window.location.href);
            url.searchParams.set('md', post.id);
            window.history.pushState({postId: post.id}, '', url);

            // --- Actualizar título y descripción ---
            document.title = post.nombre; 
            let metaDesc = document.querySelector("meta[name='description']");
            if (!metaDesc) {
                metaDesc = document.createElement("meta");
                metaDesc.name = "description";
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = post.descripcion; 

            // Botones de volver
            const backBtns = postView.querySelectorAll(".bg-gray-800");
            backBtns.forEach(btn => {
                btn.onclick = () => {
                    // Simular ir al índice
                    window.history.pushState({}, '', 'index.html');
                    renderPostPage(1);
                    postView.classList.add("hidden");
                    postsListWrapper.classList.remove("hidden");
                    document.title = "k4ixer"; // restaurar título
                };
            });
        });
}

// --- Detectar botón atrás/adelante del navegador ---
window.addEventListener("popstate", (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('md');

    if (postId) {
        const postToLoad = allPosts.find(p => p.id === postId);
        if (postToLoad) {
            showPost(postToLoad);
        }
    } else {
        // Si no hay ?md=, mostrar lista normal
        renderPostPage(1);
        postView.classList.add("hidden");
        postsListWrapper.classList.remove("hidden");
        document.title = "k4ixer"; // restaurar título
    }
});



    function renderPostPage(page) {
        currentPage = page;
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const postsToShow = allPosts.slice(start, end);
        renderPosts(postsToShow);

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = end >= allPosts.length;
    }

    prevPageBtn.onclick = () => {
        if (currentPage > 1) {
            renderPostPage(currentPage - 1);
        }
    };

    nextPageBtn.onclick = () => {
        if ((currentPage * postsPerPage) < allPosts.length) {
            renderPostPage(currentPage + 1);
        }
    };

    // --- Funciones para Herramientas ---

    function renderTools(tools) {
        toolsList.innerHTML = '';
        tools.forEach((tool) => {
            const card = document.createElement('div');
            // Usamos las mismas clases de estilo que para las tarjetas de posts
            card.className = `bg-gray-900 rounded-lg shadow-sm p-4 flex flex-col justify-between border border-gray-800 transition-all duration-300 cursor-pointer`;
            
            card.innerHTML = `
                <div>
                    <h3 class="text-lg font-bold text-gray-100 mb-2">${tool.nombre}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-2">${tool.descripcion}</p>
                    <span class="inline-block px-2 py-1 text-xs font-semibold rounded bg-yellow-400 text-black mb-2">Herramienta</span>
                </div>
                <a href="${tool.url}" target="_blank" class="mt-2 px-4 py-1 border border-gray-600 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 hover:border-gray-400 transition duration-200 ease-in-out text-sm font-medium text-center">
                    Ver en GitHub
                </a>
            `;
            toolsList.appendChild(card);
        });
    }
    
    function renderToolPage(page) {
        currentToolPage = page;
        const start = (currentToolPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const toolsToShow = allTools.slice(start, end);
        renderTools(toolsToShow);
    
        prevToolPageBtn.disabled = currentToolPage === 1;
        nextToolPageBtn.disabled = end >= allTools.length;
    }

    prevToolPageBtn.onclick = () => {
        if (currentToolPage > 1) {
            renderToolPage(currentToolPage - 1);
        }
    };

    nextToolPageBtn.onclick = () => {
        if ((currentToolPage * postsPerPage) < allTools.length) {
            renderToolPage(currentToolPage + 1);
        }
    };

    // --- Carga de datos al inicio ---

    fetch('posts.json')
        .then(res => res.json())
        .then(posts => {
            allPosts = posts.filter(p => p.tipo !== 'herramienta').map(post => ({
                ...post,
                id: post.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
            }));
            
            allTools = posts.filter(p => p.tipo === 'herramienta').map(tool => ({
                ...tool,
                id: tool.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
            }));
            
            // Revisa si hay un parámetro 'md' en la URL al cargar
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('md');

            if (postId) {
                const postToLoad = allPosts.find(p => p.id === postId);
                if (postToLoad) {
                    showPost(postToLoad);
                } else {
                    renderPostPage(1);
                }
            } else {
                renderPostPage(1);
            }

            renderToolPage(1);
        });

    // Cambiar la visibilidad de los controles de paginación según la pestaña
    const tabBtns = document.querySelectorAll('.tab-btn');
    const postsPagination = document.getElementById('posts-pagination-controls');
    const toolsPagination = document.getElementById('tools-pagination-controls');
    
    function setActiveTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('border-gray-100');
            btn.classList.add('border-transparent');
        });
        const activeContent = document.getElementById(tabId + '-section');
        const activeBtn = document.getElementById('tab-' + tabId);
        if (activeContent) activeContent.classList.remove('hidden');
        if (activeBtn) {
            activeBtn.classList.add('border-gray-100');
            activeBtn.classList.remove('border-transparent');
        }
    
        // Mostrar u ocultar la paginación correcta
        if (tabId === 'posts') {
            if (postsPagination) postsPagination.classList.remove('hidden');
            if (toolsPagination) toolsPagination.classList.add('hidden');
        } else if (tabId === 'tools') {
            if (postsPagination) toolsPagination.classList.remove('hidden');
            if (postsPagination) postsPagination.classList.add('hidden');
        }
    }
    
    tabBtns.forEach(btn => {
        btn.onclick = () => {
            const tabId = btn.id.replace('tab-', '');
            setActiveTab(tabId);
        };
    });
    
    setActiveTab('posts');
});