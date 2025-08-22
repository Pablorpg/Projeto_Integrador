// ---------- ELEMENTOS ----------
const denunciaForm = document.getElementById("denunciaForm");
const denunciaList = document.getElementById("denunciaList");
const doacaoForm = document.getElementById("doacaoForm");
const doacaoList = document.getElementById("doacaoList");

const funcionarioBtn = document.getElementById("funcionarioBtn");
const loginFuncionario = document.getElementById("loginFuncionario");
const entrarFuncionario = document.getElementById("entrarFuncionario");

// ---------- FUNÇÕES DE ATUALIZAÇÃO ----------
async function atualizarDenuncias(){
    const res = await fetch("/denuncias");
    const denuncias = await res.json();
    denunciaList.innerHTML = "";
    denuncias.forEach(d => {
        const div = document.createElement("div");
        div.classList.add("list-item");
        if(d.urgencia) div.classList.add("urgente");
        div.textContent = `${d.tipo} - ${d.descricao} ${d.urgencia ? "⚠️ URGENTE" : ""}`;
        denunciaList.appendChild(div);
    });
}

async function atualizarDoacoes(){
    const res = await fetch("/doacoes");
    const doacoes = await res.json();
    doacaoList.innerHTML = "";
    doacoes.forEach(d => {
        const div = document.createElement("div");
        div.classList.add("list-item");
        div.textContent = `${d.item} - ${d.quantidade} unidade(s) 💝 doado por ${d.doador}`;
        doacaoList.appendChild(div);
    });
}

// ---------- FORMULÁRIOS ----------
denunciaForm.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(denunciaForm).entries());
    data.urgencia = data.urgencia === "on";
    await fetch("/denuncias", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });
    denunciaForm.reset();
    atualizarDenuncias();
});

doacaoForm.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(doacaoForm).entries());
    data.quantidade = Number(data.quantidade);
    await fetch("/doacoes", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });
    doacaoForm.reset();
    atualizarDoacoes();
});

// ---------- LOGIN FUNCIONÁRIO ----------
funcionarioBtn.addEventListener("click", () => loginFuncionario.classList.toggle("hidden"));

entrarFuncionario.addEventListener("click", async () => {
    const id = document.getElementById("funcId").value;
    const senha = document.getElementById("funcSenha").value;
    const res = await fetch("/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id,senha})
    });

    if(res.ok){
        alert("Login realizado! 🎉");
        mostraPainelFuncionario();
    } else {
        alert("ID ou senha incorretos ❌");
    }
});

// ---------- PAINEL FUNCIONÁRIO ----------
async function mostraPainelFuncionario(){
    // Esconder formulários e listas do visitante
    document.querySelectorAll("form").forEach(f => f.style.display = "none");
    document.querySelectorAll(".form-card, .list-card").forEach(c => c.style.display = "none");
    funcionarioBtn.style.display = "none";
    loginFuncionario.style.display = "none";

    // Criar painel do funcionário
    const painel = document.createElement("div");
    painel.classList.add("card");
    painel.innerHTML = `
        <h2>📋 Painel do Funcionário</h2>
        <h3>Denúncias</h3><div id="painelDenuncias" class="list"></div>
        <h3>Doações</h3><div id="painelDoacoes" class="list"></div>
    `;
    document.body.appendChild(painel);

    // Preencher denúncias
    const denuncias = await (await fetch("/denuncias")).json();
    const painelDenuncias = document.getElementById("painelDenuncias");
    denuncias.forEach(d => {
        const div = document.createElement("div");
        div.classList.add("list-item");
        if(d.urgencia) div.classList.add("urgente");
        div.textContent = `${d.tipo} - ${d.descricao} ${d.urgencia ? "⚠️ URGENTE" : ""}`;
        painelDenuncias.appendChild(div);
    });

    // Preencher doações
    const doacoes = await (await fetch("/doacoes")).json();
    const painelDoacoes = document.getElementById("painelDoacoes");
    doacoes.forEach(d => {
        const div = document.createElement("div");
        div.classList.add("list-item");
        div.textContent = `${d.item} - ${d.quantidade} unidade(s) 💝 doado por ${d.doador}`;
        painelDoacoes.appendChild(div);
    });
}

// ---------- INICIALIZAÇÃO ----------
atualizarDenuncias();
atualizarDoacoes();
