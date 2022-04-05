const {expect, should} = require("chai");
const { ethers } = require("hardhat");

const toWei=(num)=>ethers.utils.parseEther(num.toString())
const fromWei=(num)=>ethers.utils.formatEther(num)

describe("NFTMarketplace", function(){
  let deployer,addr1,addr2, nft, marketplace
  let feePercent=1
  let URI="Sample URI"
  beforeEach(async function(){
    const Marketplace= await ethers.getContractFactory("Marketplace");
  const NFT= await ethers.getContractFactory("NFT");
  [deployer,addr1,addr2]=await ethers.getSigners()

  nft=await NFT.deploy();
  marketplace=await Marketplace.deploy(feePercent);
  });
  describe("Deployment",function(){
    it("Should track name and syumbol of the nft collection", async function(){
      expect(await nft.name()).to.equal("Test NFT")
      expect(await nft.symbol()).to.equal("TNFT")
    })
    it("Should track feeAccount and feePercent of the marketplace ", async function(){
      expect(await marketplace.feeAccount()).to.equal(deployer.address)
      expect(await marketplace.feePercent()).to.equal(feePercent)
    })
  })
  describe("Mininting NFTS", function(){
    it("should track each minted nft", async function(){

      await nft.connect(addr1).mint(URI)
      expect(await nft.tokenCount()).to.equal(1)
      expect(await nft.balanceOf(addr1.address)).to.equal(1)
      expect(await nft.tokenURI(1)).to.equal(URI)

      await nft.connect(addr2).mint(URI)
      expect(await nft.tokenCount()).to.equal(2)
      expect(await nft.balanceOf(addr2.address)).to.equal(1)
      expect(await nft.tokenURI(2)).to.equal(URI)

    })
  })
    describe("making marketplace items", function(){
      let price=1
      

      beforeEach(async function(){
      await nft.connect(addr1).mint(URI)

      await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
      })
      it("should track newly created item, transfert nft from seller to marketplace and emit offered event", async function(){

        await expect(marketplace.connect(addr1).makeItem(nft.address,1,toWei(1)))
        .to.emit(marketplace,"Offered")
        .withArgs(
          1,
          nft.address,
          1,
          toWei(1),
          addr1.address
        )

      // Owner of NFT should now be the marketplace
      expect(await nft.ownerOf(1)).to.equal(marketplace.address);
      // Item count should now equal 1
      expect(await marketplace.itemCount()).to.equal(1)
      // Get item from items mapping then check fields to ensure they are correct
      const item = await marketplace.items(1)
      expect(item.itemId).to.equal(1)
      expect(item.nft).to.equal(nft.address)
      expect(item.tokenId).to.equal(1)
      expect(item.price).to.equal(toWei(price))
      expect(item.sold).to.equal(false)
    });
      it("should fail if price is set to zero", async function(){
        await expect(
          marketplace.connect(addr1).makeItem(nft.address,1,0)
        ).to.be.revertedWith("Price must be greater than zero")
      })
    });

    describe("Purchasing marketplace items", function(){
      let price=2
      let totalPriceInWei
      beforeEach(async function(){
        await nft.connect(addr1).mint(URI)
        await nft.connect(addr1).setApprovalForAll(marketplace.address,true)
        await marketplace.connect(addr1).makeItem(nft.address,1,toWei(price))
      })
      it("Should update item as sold, pay seller, transfer NFT to buyer charge fees and emit a bought event", async function(){
        const sellerInitalEthBal= await addr1.getBalance()
        const feeAccountInitalEthBal= await deployer.getBalance()

         totalPriceInWei= await marketplace.getTotalPrice(1);

        await expect(marketplace.connect(addr2).purchaseItem(1,{value:totalPriceInWei}))
        .to.emit(marketplace, "Bought")
        .withArgs(
          1,
          nft.address,
          1,
          toWei(price),
          addr1.address,
          addr2.address
        
        )
        const sellerFinalEthBal= await addr1.getBalance()
        const feeAccountFinalEthBal= await deployer.getBalance()
          expect (+fromWei(sellerFinalEthBal)).to.equal(+price + +fromWei(sellerInitalEthBal))

          const fee=(feePercent/100)*price

          expect(+fromWei(feeAccountFinalEthBal)).to.equal(+fee + +fromWei(feeAccountInitalEthBal))


          expect(await nft.ownerOf(1)).to.equal(addr2.address);

          expect((await marketplace.items(1)).sold).to.equal(true)
      })
      it("Should fail for invalid item ids, sold items and when not enough ether is paid", async function(){
        await expect(
          marketplace.connect(addr2).purchaseItem(2,{value:totalPriceInWei})
        ).to.be.revertedWith("Item does not exist");

        await expect(
          marketplace.connect(addr2).purchaseItem(0,{value:totalPriceInWei})
        ).to.be.revertedWith("Item does not exist");

        await expect(
          marketplace.connect(addr2).purchaseItem(1,{value:toWei(price)})
        ).to.be.revertedWith("not enough ether to cover item price and market fee");

        await marketplace.connect(deployer).purchaseItem(1,{value:totalPriceInWei})
        await expect(
          marketplace.connect(addr2).purchaseItem(1,{value:totalPriceInWei})
        ).to.be.revertedWith("item already sold");
      });

    })

})