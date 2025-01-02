import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen pb-20 mx-4 sm:p-4 font-[family-name:var(--font-geist-sans)]">
        <main className="">

          <header className="flex justify-between items-center relative">
            <h1 className="text-2xl z-10">Soul Solidity</h1>
            <div className="flex gap-4">
              <Link href="/docs">
                <button className="bg-teal-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105">Docs</button>
              </Link>
              <Link href="/contact">
                <button className="bg-teal-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105">Contact</button>
              </Link>
            </div>
          </header>

          <div className="flex justify-center items-center">
            <div className="max-w-screen-md mt-28">
              <div className="flex flex-col  row-start-2 items-center sm:items-start">
                <div className="relative">
                  <Image
                    src="/lightning.png"
                    alt="lightning"
                    width={400}
                    height={400}
                    className="absolute z-[-1]"
                    style={{ top: '-150px', left: '-200px' }}
                  />
                  <h1 className="text-6xl font-bold mb-0">Simplify Your</h1>
                  <h1 className="text-teal-600 text-6xl font-bold">Crypto Transactions</h1>
                </div>
              </div>
              <h2 className="text-xl mt-10">Enhance user experience with our zap solution. Consolidate multiple transactions into one, reduce the number of clicks, and keep your users coming back for more with a smoother, faster process.</h2>

              <div className="my-12">
                <Link href="https://soulsolidity.mintlify.app/" target="_blank">
                  <button className="bg-teal-600 text-white px-6 py-3 text-xl rounded font-bold transition-transform transform hover:scale-105">Get Started</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex justify-center gap-8 mt-16">
              <div className="flex flex-col items-center mx-12">
                <Image src="/globe.svg" alt="ApeBond" width={60} height={60} />
                <span className="mt-2">ApeBond</span>
              </div>
              <div className="flex flex-col items-center mx-12">
                <Image src="/globe.svg" alt="Quickswap" width={60} height={60} />
                <span className="mt-2">Quickswap</span>
              </div>
              <div className="flex flex-col items-center mx-12">
                <Image src="/globe.svg" alt="AI Tech" width={60} height={60} />
                <span className="mt-2">AI Tech</span>
              </div>
              <div className="flex flex-col items-center mx-12">
                <Image src="/globe.svg" alt="BasePad" width={60} height={60} />
                <span className="mt-2">BasePad</span>
              </div>
              <div className="flex flex-col items-center mx-12">
                <Image src="/globe.svg" alt="Lynex" width={60} height={60} />
                <span className="mt-2">Lynex</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex flex-wrap justify-center mt-10">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 m-4 max-w-xs">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">$1M+ Volume</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 m-4 max-w-xs">
                <p className="text-gray-700 dark:text-gray-300">10K+ Transactions</p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 m-4 max-w-xs">
                <p className="text-gray-700 dark:text-gray-300">80% Less Clicks</p>
              </div>
              {/* Add more cards as needed */}
            </div>
          </div>

          {/* Info 1 */}
          <div className="flex justify-center items-center mt-10 mx-10">
            <div className="flex flex-col items-center mx-12">
              <Image src="/ZapImage.png" alt="zap" width={1000} height={1000} />
            </div>
            <div className="flex flex-col justify-center mx-12">
              <h2 className="text-3xl mb-3">Dynamic plug and play zap solution. </h2>
              <p>Our zap solution is designed to be dynamic. </p>
            </div>
          </div>

          {/* Info 2 */}
          <div className="flex justify-center items-center mt-10 mx-10">
            <div className="flex flex-col items-center mx-12">
              <h2 className="text-3xl mb-3">Improve your UX and user retention</h2>
              <p>Decrease the number of clicks massively and improve the user experience. Just one click, one transaction, one zap.</p>
            </div>
            <div className="flex flex-col items-center justify-center mx-12">
              <Image src="/lessclicks.png" alt="improvedUX" width={2000} height={1000} />
            </div>
          </div>

          {/* Info 3 */}
          <div className="flex justify-center items-center mt-10 mx-10">
            <div className="flex flex-col items-center mx-12">
              <Image src="/customzap.png" alt="custom" width={200} height={200} />
            </div>
            <div className="flex flex-col items-center justify-center mx-12">
              <h2 className="text-3xl mb-3">Custom zap solution</h2>
              <p>Do you need a custom zap solution for your protocol? We can help you with that.</p>
            </div>
          </div>



        </main >
      </div >

      <footer className="flex flex-wrap items-center justify-center mt-16 py-4 bg-gray-200 dark:bg-gray-800">
        <span className="">@SoulSolidity</span>
      </footer>
    </div >
  );
}
