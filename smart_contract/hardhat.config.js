require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/FFVlxm6lqHFICN29zJt0VwYsdbhhZyBC',
      accounts: ['1248de43436adb7171a7646192a103474d7f87cb2772244f1c397fa14b03ebea']
    },
  },
}