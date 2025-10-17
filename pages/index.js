import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout, { GradientBackground } from '../components/Layout';
import SEO from '../components/SEO';
import { getGlobalData } from '../utils/global-data';

const calculators = {
  popular: [
    {
      id: 'emergency-fund',
      title: 'Emergency Fund',
      description: 'Calculate how much you need\nfor financial emergencies',
      icon: '💰',
    },
    {
      id: 'budget-planner',
      title: 'Budget Planner',
      description: 'Track income and expenses\nto manage your money better',
      icon: '📊',
    },
    {
      id: 'debt-payoff',
      title: 'Debt Payoff',
      description: 'Plan your strategy to\nbecome debt-free faster',
      icon: '💳',
    },
  ],
  'financial-basics': [
    {
      id: 'savings-goal',
      title: 'Savings Goal',
      description: 'Calculate how much to save\nmonthly for your goal',
      icon: '🎯',
    },
    {
      id: 'compound-interest',
      title: 'Compound Interest',
      description: 'See how your savings\ngrow over time',
      icon: '📈',
    },
    {
      id: 'tax-calculator',
      title: 'Tax Calculator',
      description: 'Estimate your tax obligations\nfor the year',
      icon: '🧾',
    },
    {
      id: 'income-calculator',
      title: 'Income Calculator',
      description: 'Calculate your net income\nafter deductions',
      icon: '💵',
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker',
      description: 'Track and categorize\nyour spending habits',
      icon: '📝',
    },
    {
      id: 'currency-converter',
      title: 'Currency Converter',
      description: 'Convert between MYR\nand other currencies',
      icon: '💱',
    },
    {
      id: 'loan-calculator',
      title: 'Loan Calculator',
      description: 'Calculate monthly payments\nfor personal loans',
      icon: '🏦',
    },
    {
      id: 'salary-calculator',
      title: 'Salary Calculator',
      description: 'Compare gross and net\nsalary amounts',
      icon: '💼',
    },
    {
      id: 'inflation-calculator',
      title: 'Inflation Calculator',
      description: 'See how inflation affects\nyour purchasing power',
      icon: '📉',
    },
  ],
  'long-term-planning': [
    {
      id: 'retirement-calculator',
      title: 'Retirement Fund',
      description: 'Plan for a comfortable\nretirement lifestyle',
      icon: '🏖️',
    },
    {
      id: 'investment-return',
      title: 'Investment Return',
      description: 'Calculate potential returns\non your investments',
      icon: '💹',
    },
    {
      id: 'education-fund',
      title: 'Education Fund',
      description: 'Save for your children\'s\neducation expenses',
      icon: '🎓',
    },
    {
      id: 'epf-calculator',
      title: 'EPF Calculator',
      description: 'Estimate your EPF savings\nat retirement age',
      icon: '🏛️',
    },
    {
      id: 'dividend-calculator',
      title: 'Dividend Calculator',
      description: 'Calculate passive income\nfrom dividend stocks',
      icon: '💸',
    },
    {
      id: 'net-worth-calculator',
      title: 'Net Worth Calculator',
      description: 'Track your total assets\nand liabilities',
      icon: '💎',
    },
    {
      id: 'fire-calculator',
      title: 'FIRE Calculator',
      description: 'Calculate when you can\nachieve financial independence',
      icon: '🔥',
    },
    {
      id: 'pension-calculator',
      title: 'Pension Calculator',
      description: 'Estimate your monthly\npension benefits',
      icon: '👴',
    },
    {
      id: 'insurance-needs',
      title: 'Insurance Needs',
      description: 'Calculate life insurance\ncoverage required',
      icon: '🛡️',
    },
  ],
  'big-life-purchases': [
    {
      id: 'home-affordability',
      title: 'Home Affordability',
      description: 'Determine how much house\nyou can afford',
      icon: '🏠',
    },
    {
      id: 'car-loan',
      title: 'Car Loan',
      description: 'Calculate monthly payments\nfor your vehicle',
      icon: '🚗',
    },
    {
      id: 'wedding-budget',
      title: 'Wedding Budget',
      description: 'Plan and track expenses\nfor your big day',
      icon: '💍',
    },
    {
      id: 'mortgage-calculator',
      title: 'Mortgage Calculator',
      description: 'Calculate home loan\npayments and interest',
      icon: '🏡',
    },
    {
      id: 'renovation-budget',
      title: 'Renovation Budget',
      description: 'Plan costs for home\nimprovements',
      icon: '🔨',
    },
    {
      id: 'property-tax',
      title: 'Property Tax',
      description: 'Estimate annual property\ntax obligations',
      icon: '🏘️',
    },
    {
      id: 'moving-costs',
      title: 'Moving Costs',
      description: 'Calculate expenses for\nrelocating homes',
      icon: '📦',
    },
    {
      id: 'down-payment',
      title: 'Down Payment',
      description: 'Calculate savings needed\nfor property purchase',
      icon: '💰',
    },
    {
      id: 'rent-vs-buy',
      title: 'Rent vs Buy',
      description: 'Compare costs of renting\nvs buying a home',
      icon: '⚖️',
    },
  ],
};

const categoryTitles = {
  popular: 'Popular',
  'financial-basics': 'Financial Basics',
  'long-term-planning': 'Long-term Planning',
  'big-life-purchases': 'Big Life Purchases',
};

function CalculatorCard({ calculator }) {
  return (
    <Link
      href={`/calculators/${calculator.id}`}
      className="block p-6 transition border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 focus:outline-hidden focus:ring-4 focus:ring-primary/50"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 text-4xl">{calculator.icon}</div>
        <h3 className="mb-2 text-lg font-bold">{calculator.title}</h3>
        <p className="text-sm opacity-70 whitespace-pre-line">
          {calculator.description}
        </p>
      </div>
    </Link>
  );
}

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
