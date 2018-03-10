const { eos } = require('../config')
// eos.contract(code<string>, [options], [callback])


test('adds 1 + 2 to equal 3', async () => {
    const contract = await eos.contract('kingofeos')
    console.log(contract)
    const result = await contract.claim('kingofeos', 'King Of Eos', 'Image Url', 'Song Url')
    expect(result).toBe(true)
});