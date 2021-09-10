const Web3 = require('web3');
const artifact = require('../build/contracts/MatechCoin.json');

window.onload = function () {
    let web3;
    let addressFrom;
    let BDMContract;
    let tokenAddress;
    const tokenSymbol = 'MTC';
    const tokenDecimals = '3';
    const tokenImage = 'http://localhost:9000/logo_simple.svg';

    const connectButton = document.getElementById('connect');
    const content = document.getElementById('content');
    const account = document.getElementById('account');

    const form = document.getElementById('send');
    const recipientInput = document.getElementById('recipient');
    const amountInput = document.getElementById('amount');

    const formERC20 = document.getElementById('sendERC20');
    const recipientInputERC20 = document.getElementById('recipientERC20');
    const amountInputERC20 = document.getElementById('amountERC20');
    const balanceERC20 = document.getElementById('balanceERC20');

    const connect = async () => {
        if (window.ethereum) {

            try {
                await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                web3 = new Web3(window.ethereum);

                let accounts = await web3.eth.getAccounts();
                
                addressFrom = accounts[0];

                const networkId = await web3.eth.net.getId();
                tokenAddress = artifact.networks[networkId].address

                BDMContract = new web3.eth.Contract(
                    artifact.abi,
                    tokenAddress
                );

                const balanceBDM = await BDMContract.methods.balanceOf(addressFrom).call();

                balanceERC20.innerText = balanceBDM;

                content.style.display = 'initial';
                connectButton.style.display = 'none';
                account.innerText = addressFrom;

                // This can be used anywhere, preferably after a transaction was performed
                await suggestAddTokens();

            } catch (err) {
                alert('User rejected the connection');
            }
        } else {
            alert('No Web3 providers available');
        }
    }

    const transact = (event) => {
        event.preventDefault();

        const amount = amountInput.value;
        const recipient = recipientInput.value;

        if (Number(amount) <= 0) {
            alert('Amount not permitted');
            return;
        }

        if (!web3.utils.isAddress(recipient)) {
            alert('Invalid recipient\'s address')
            return;
        }

        web3.eth.sendTransaction({
            from: addressFrom,
            to: recipient,
            value: amount
        });
    }

    const transactERC20 = async () => {
        event.preventDefault();

        const amount = amountInputERC20.value;
        const recipient = recipientInputERC20.value;

        if (Number(amount) <= 0) {
            alert('Amount not permitted');
            return;
        }

        if (!web3.utils.isAddress(recipient)) {
            alert('Invalid recipient\'s address')
            return;
        }

        BDMContract.methods.transfer(recipient, amount).send({
            from: addressFrom
        });
    }

    const suggestAddTokens = async () => {
        // Watch for a new token to be discoverd and ask the user if he/she
        // wants to add it to their wallet

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });
    
            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    connectButton.onclick = connect;
    form.onsubmit = transact;
    formERC20.onsubmit = transactERC20;
}