/*Banco de dados do estoque*/
let estoque = JSON.parse(localStorage.getItem('padaria_v2')) || [];

const render = () => {
    const container = document.getElementById('listaEstoque');
    container.innerHTML = '';

    estoque.forEach(item => {
        const isLow = item.quantidade < item.minimo;

        const row = document.createElement('div');
        row.className = `item-row ${isLow ? 'baixo-estoque' : ''}`;

        row.innerHTML = `
            <div class="info">
                <b>${item.nome}</b>
                <span>Qtd: ${item.quantidade} / Mín: ${item.minimo}</span>
            </div>

            <div class="controls">
                <button class="btn-qty" onclick="updateQty(${item.id}, -1)">-</button>
                <button class="btn-qty" onclick="updateQty(${item.id}, 1)">+</button>
                <button class="btn-del" onclick="remove(${item.id})">🗑</button>
            </div>
        `;

        container.appendChild(row);
    });

    localStorage.setItem('padaria_v2', JSON.stringify(estoque));
};

document.getElementById('formEstoque').onsubmit = (e) => {
    e.preventDefault();

    const item = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        quantidade: Number(document.getElementById('quantidade').value),
        minimo: Number(document.getElementById('minimo').value)
    };

    estoque.push(item);
    render();
    e.target.reset();
};

const updateQty = (id, change) => {
    const item = estoque.find(i => i.id === id);

    if (item) {
        item.quantidade = Math.max(0, item.quantidade + change);
        render();
    }
};

const remove = (id) => {
    estoque = estoque.filter(i => i.id !== id);
    render();
};

render();
