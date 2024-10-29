
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DeployModule = buildModule("TokenModule", (m) => {
  const sample = m.contract("Storage");
  return sample;
});

module.exports = DeployModule;
