const auctions = [
    {
        id: 1,
        title: "1962 Ferrari 250 GTO Blueprint & Model",
        category: "Luxury",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
        currentBid: 450000,
        bidsCount: 14,
        description: "An exceptional collector's scale model accompanied by original certified blueprint documents."
    },
    {
        id: 2,
        title: "18th Century French Rococo Grand Clock",
        category: "Antiques",
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80",
        currentBid: 85000,
        bidsCount: 8,
        description: "Meticulously carved gilded bronze woodwork featuring original mechanical movement."
    },
    {
        id: 3,
        title: "Abstract Harmony - Oil on Canvas (1954)",
        category: "Art",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
        currentBid: 120000,
        bidsCount: 22,
        description: "A profound statement piece from the mid-century modern abstract expressionism movement."
    },
    {
        id: 4,
        title: "Vintage Rolex Cosmograph Daytona",
        category: "Jewelry",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        currentBid: 62000,
        bidsCount: 19,
        description: "Pristine condition vintage chronograph wristwatch with original oyster bracelet."
    }
];

let selectedAuctionId = null;

function renderAuctions(filter = 'All') {
    const grid = document.getElementById('auctionGrid');
    if(!grid) return;
    grid.innerHTML = '';

    const filtered = filter === 'All' ? auctions : auctions.filter(a => a.category === filter);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'auction-card';
        card.innerHTML = `
            <div class="auction-img-container">
                <span class="badge">${item.category}</span>
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="auction-body">
                <h3>${item.title}</h3>
                <p>${item.description.substring(0, 75)}...</p>
                <div class="countdown">
                    Ends in: <span class="timer">04h : 32m : 15s</span>
                </div>
                <div class="bid-info">
                    <div>
                        <span class="label">Current Bid</span>
                        <div class="value">$${item.currentBid.toLocaleString()}</div>
                    </div>
                    <div>
                        <span class="label">Bids Placed</span>
                        <div class="value" style="color:var(--text-white);">${item.bidsCount}</div>
                    </div>
                </div>
                <button class="btn-gold" onclick="openBidModal(${item.id})">View & Bid</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent.includes(category) || (category === 'All' && btn.textContent.includes('All'))) {
            btn.classList.add('active');
        }
    });
    renderAuctions(category);
}

function openBidModal(id) {
    selectedAuctionId = id;
    const item = auctions.find(a => a.id === id);
    document.getElementById('modalItemTitle').textContent = item.title;
    document.getElementById('modalItemDesc').textContent = item.description;
    document.getElementById('modalCurrentBid').textContent = `$${item.currentBid.toLocaleString()}`;
    document.getElementById('modalTotalBids').textContent = item.bidsCount;
    document.getElementById('bidAmount').value = item.currentBid + 1000;
    document.getElementById('bidModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('bidModal').style.display = 'none';
}

function submitBid() {
    const bidInput = parseFloat(document.getElementById('bidAmount').value);
    const item = auctions.find(a => a.id === selectedAuctionId);

    if (bidInput <= item.currentBid) {
        alert('Your bid must be higher than the current highest bid!');
        return;
    }

    item.currentBid = bidInput;
    item.bidsCount += 1;
    alert(`Success! Your bid of $${bidInput.toLocaleString()} has been placed.`);
    closeModal();
    renderAuctions();
}

function openLoginModal() {
    alert('Authentication Module: Redirecting to Login/Register screen.');
}

window.onload = () => {
    renderAuctions('All');
};