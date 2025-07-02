const nfts = [
  { id: 1, name: "ZEN NFT #1" },
  { id: 2, name: "ZEN NFT #2" },
  { id: 3, name: "ZEN NFT #3" }
];

let stakedNFTs = [];
let rewards = 0;

const nftListDiv = document.getElementById("nft-list");
const stakedListDiv = document.getElementById("staked-list");
const rewardsP = document.getElementById("rewards");

function displayNFTs() {
  nftListDiv.innerHTML = "";
  nfts.forEach(nft => {
    const div = document.createElement("div");
    div.className = "nft";
    div.innerHTML = `
      <strong>${nft.name}</strong><br/>
      <button onclick="stakeNFT(${nft.id})">Stake</button>
    `;
    nftListDiv.appendChild(div);
  });
}

function displayStaked() {
  stakedListDiv.innerHTML = "";
  stakedNFTs.forEach(nft => {
    const div = document.createElement("div");
    div.className = "nft";
    div.innerHTML = `
      <strong>${nft.name}</strong><br/>
      Staked at: ${new Date(nft.stakeTime).toLocaleTimeString()}<br/>
      <button onclick="unstakeNFT(${nft.id})">Unstake</button>
    `;
    stakedListDiv.appendChild(div);
  });
}

function stakeNFT(id) {
  const nft = nfts.find(n => n.id === id);
  if (!nft) return;
  if (stakedNFTs.find(n => n.id === id)) {
    alert("Already staked");
    return;
  }
  nft.stakeTime = Date.now();
  stakedNFTs.push(nft);
  displayNFTs();
  displayStaked();
}

function unstakeNFT(id) {
  const index = stakedNFTs.findIndex(n => n.id === id);
  if (index === -1) return;
  const nft = stakedNFTs[index];
  const hoursStaked = (Date.now() - nft.stakeTime) / (1000 * 60 * 60);
  const rewardPoints = Math.floor(hoursStaked * 10);
  rewards += rewardPoints;
  stakedNFTs.splice(index, 1);
  displayNFTs();
  displayStaked();
  updateRewards();
}

function updateRewards() {
  rewardsP.textContent = rewards;
}

displayNFTs();
displayStaked();
updateRewards();
