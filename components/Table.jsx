import { ethers } from 'ethers'

function Table({ data, EthBalance, BtcBalance }) {
  return data || EthBalance?.balance || BtcBalance ? (
    <div className="mx-auto mt-20 w-11/12 border border-slate-600 md:w-7/12">
      <div className="mb-2 text-center text-xl font-bold">Balances</div>
      <div className="border-slate flex items-center justify-between border p-2">
        <div className="w-5/12 text-xl font-bold">Symbol</div>
        <div className="border border-slate-600 py-4"> </div>
        <div className="w-5/12 text-xl font-bold">Balance</div>
      </div>
      {BtcBalance !== NaN && BtcBalance ? (
        <div className="border-slate flex items-center justify-between border p-2">
          <div className="w-5/12">BTC</div>
          <div className="border border-slate-600 py-4"> </div>
          <div className="w-5/12">{BtcBalance}</div>
        </div>
      ) : (
        <></>
      )}
      {EthBalance?.balance && (
        <div className="border-slate flex items-center justify-between border p-2">
          <div className="w-5/12">ETH</div>
          <div className="border border-slate-600 py-4"> </div>
          <div className="w-5/12">
            {EthBalance.balance &&
              String(ethers.utils.formatEther(EthBalance.balance)).substring(
                0,
                9
              )}
          </div>
        </div>
      )}
      {data &&
        data?.map((token, idx) => (
          <div
            key={idx}
            className="border-slate flex items-center justify-between border p-2"
          >
            <div className="w-5/12">{token.symbol}</div>
            <div className="border border-slate-600 py-4"> </div>
            <div className="w-5/12">
              {token.balance &&
                String(ethers.utils.formatEther(token.balance)).substring(0, 9)}
            </div>
          </div>
        ))}
    </div>
  ) : (
    <></>
  )
}

export default Table
