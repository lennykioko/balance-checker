import Image from 'next/image'
import { useMoralis } from 'react-moralis'

function Header() {
  const { isAuthenticated, authenticate, logout } = useMoralis()

  return (
    <header className="flex w-full items-center justify-between bg-slate-800 py-2">
      <div className="ml-1 flex items-center justify-start py-2">
        <Image
          className="object-contain hover:-translate-y-0.5"
          src="/eth.png"
          alt="Logo"
          width={70}
          height={50}
        />
        <div className="text-2xl font-semibold text-white">Balance Checker</div>
      </div>
      <div>
        <button
          onClick={() => {
            if (isAuthenticated) {
              logout()
            } else {
              authenticate({
                signingMessage:
                  'Kindly authorize linking of your Metamask wallet',
              })
            }
          }}
          className="mr-4 flex items-center rounded-xl bg-slate-100 px-3 py-1.5 text-black"
        >
          <Image
            className="object-contain"
            src="/metamask.png"
            alt="Logo"
            width={30}
            height={30}
          />
          <div className="ml-1 text-xl font-semibold text-black">
            {isAuthenticated ? `Logout` : `Login`}
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header
