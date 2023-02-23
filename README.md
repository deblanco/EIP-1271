# EIP-1271

A simple demostration of the EIP-1271 and its implementation. This demostration uses [AccessControl](https://docs.openzeppelin.com/contracts/3.x/access-control), and on the `IERC1271#isValidSignature` method checks that the signer is part of `DEFAULT_ADMIN_ROLE` plus signature verification.

- Proposal: https://eips.ethereum.org/EIPS/eip-1271#specification

Check the [test](test/Wallet.ts) for more explanations.

## Tests

```shell
npm install
npm run test
```
