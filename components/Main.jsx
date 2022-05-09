import { useState } from 'react'
import { useERC20Balances, useNativeBalance } from 'react-moralis'
import Error from './Error'
import Loader from './Loader'
import Table from './Table'

// 0xd24400ae8BfEBb18cA49Be86258a3C749cf46853 Whale account for testing

function Main() {
  const [address, setAddress] = useState('')
  const [BtcBalance, setBtcBalance] = useState(null)

  const { fetchERC20Balances, data, isLoading, isFetching, error } =
    useERC20Balances()
  const {
    getBalances,
    data: EthBalance,
    nativeToken,
    error: EthEerror,
    isLoading: EthIsLoading,
  } = useNativeBalance()

  const getBTCBalance = (address) => {
    const response = fetch(
      `https://blockchain.info/q/addressbalance/${address}`
    )
      .then((response) => response.json())
      .then((JsonResponse) =>
        setBtcBalance(parseInt(JsonResponse, 10) / 10 ** 8)
      )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const isEthAdress = address && address.substring(0, 2) === '0x'
      if (isEthAdress) {
        fetchERC20Balances({ params: { address } })
        getBalances({ params: { address } })
      } else {
        getBTCBalance(address)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading || isFetching || EthIsLoading) return <Loader />
  if (error || EthEerror) console.log(error)

  return (
    <div className="w-full">
      <form
        className="mx-auto mb-4 mt-6 w-11/12 md:w-7/12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap items-center justify-center space-x-3 space-y-5 md:flex-nowrap md:space-y-0">
          <input
            type="text"
            className="w-full rounded-xl bg-slate-200 py-2 px-3 text-xl text-black focus:outline-none"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            className="w-6/12 rounded-xl bg-amber-400 py-2 px-3 text-xl font-semibold text-black md:w-32"
            type="submit"
          >
            Check
          </button>
        </div>
      </form>

      {error && <Error message={error?.message} />}
      <Table data={data} EthBalance={EthBalance} BtcBalance={BtcBalance} />
    </div>
  )
}

export default Main
