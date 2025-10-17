import { useState } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Calculator({ globalData }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculateCompoundInterest = (e) => {
    e.preventDefault();
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const time = parseFloat(years);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(time)) {
      alert('Sila masukkan nilai yang sah');
      return;
    }

    const compoundInterest = principal * Math.pow(1 + annualRate, time);
    const interest = compoundInterest - principal;

    setResult({
      total: compoundInterest.toFixed(2),
      interest: interest.toFixed(2),
      principal: principal.toFixed(2),
    });
  };

  return (
    <Layout>
      <SEO title="Kalkulator Faedah Kompaun" description="Kira faedah kompaun untuk simpanan atau pelaburan anda" />
      <Header name={globalData.name} />
      <main className="w-full max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl lg:text-5xl">
            Kalkulator Faedah Kompaun
          </h1>
          <p className="text-lg opacity-60">
            Kira pulangan simpanan atau pelaburan anda dengan mudah
          </p>
        </div>

        <div className="p-8 border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 dark:border-white/10">
          <form onSubmit={calculateCompoundInterest} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium">
                Jumlah Awal (RM)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
                step="0.01"
                className="w-full px-4 py-3 border rounded-lg bg-white/50 dark:bg-black/50 border-gray-800/10 dark:border-white/10 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label htmlFor="rate" className="block mb-2 text-sm font-medium">
                Kadar Faedah Tahunan (%)
              </label>
              <input
                type="number"
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="5"
                step="0.01"
                className="w-full px-4 py-3 border rounded-lg bg-white/50 dark:bg-black/50 border-gray-800/10 dark:border-white/10 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label htmlFor="years" className="block mb-2 text-sm font-medium">
                Tempoh (Tahun)
              </label>
              <input
                type="number"
                id="years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="10"
                step="1"
                className="w-full px-4 py-3 border rounded-lg bg-white/50 dark:bg-black/50 border-gray-800/10 dark:border-white/10 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 font-medium text-white transition rounded-lg bg-primary hover:bg-primary/80 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            >
              Kira Sekarang
            </button>
          </form>

          {result && (
            <div className="p-6 mt-6 border rounded-lg bg-primary/10 border-primary/20">
              <h2 className="mb-4 text-xl font-bold">Keputusan:</h2>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="opacity-80">Modal Awal:</span>
                  <span className="font-bold">RM {result.principal}</span>
                </p>
                <p className="flex justify-between">
                  <span className="opacity-80">Faedah Diperoleh:</span>
                  <span className="font-bold">RM {result.interest}</span>
                </p>
                <p className="flex justify-between pt-2 mt-2 text-xl border-t border-gray-800/10 dark:border-white/10">
                  <span>Jumlah Akhir:</span>
                  <span className="font-bold text-primary">RM {result.total}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 transition border rounded-lg bg-white/10 border-gray-800/10 hover:bg-white/20 dark:bg-black/30 dark:hover:bg-black/50 dark:border-white/10"
          >
            Lawati Blog Kami
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();

  return { props: { globalData } };
}
