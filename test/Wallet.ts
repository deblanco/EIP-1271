import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Wallet", function () {
  async function deployWalletFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Wallet = await ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy();

    return { wallet, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { wallet, owner } = await loadFixture(deployWalletFixture);
      const adminRole = await wallet.DEFAULT_ADMIN_ROLE();
      expect(await wallet.hasRole(adminRole, owner.address)).to.equal(true);
    });
  });

  describe("Signatures", function () {
    it("Should return MAGICVALUE as a success signature", async function () {
      const { wallet, owner } = await loadFixture(deployWalletFixture);
      const testMsg = ethers.utils.hashMessage("test message");
      const signature = await owner.signMessage(ethers.utils.arrayify(testMsg));
      const magicValue = await wallet.MAGICVALUE();
      expect(await wallet.isValidSignature(testMsg, signature)).to.equal(
        magicValue
      );
    });

    it("Should return '0xffffffff' because failed signature verification", async function () {
      const { wallet, otherAccount } = await loadFixture(deployWalletFixture);
      const testMsg = ethers.utils.hashMessage("test message");
      const signature = await otherAccount.signMessage(
        ethers.utils.arrayify(testMsg)
      );
      const magicValue = await wallet.MAGICVALUE();
      expect(await wallet.isValidSignature(testMsg, signature)).to.equal(
        "0xffffffff"
      );
    });
  });
});
