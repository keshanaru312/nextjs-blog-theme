import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import LanguageToggle from '../../components/LanguageToggle';
import { useLanguage } from '../../utils/language-context';
import { translations } from '../../utils/translations';
import { getGlobalData } from '../../utils/global-data';


const calculatorDetails = {
  'emergency-fund': {
    title: 'Emergency Fund Calculator',
    icon: '💰',
    description: 'Calculate how much you need for financial emergencies',
  },
  'budget-planner': {
    title: 'Budget Planner',
    icon: '📊',
    description: 'Track income and expenses to manage your money better',
  },
  'debt-payoff': {
    title: 'Debt Payoff Calculator',
    icon: '💳',
    description: 'Plan your strategy to become debt-free faster',
  },
  'savings-goal': {
    title: 'Savings Goal Calculator',
    icon: '🎯',
    description: 'Calculate how much to save monthly for your goal',
  },
  'compound-interest': {
    title: 'Compound Interest Calculator',
    icon: '📈',
    description: 'See how your savings grow over time',
  },
  'tax-calculator': {
    title: 'Tax Calculator',
    icon: '🧾',
    description: 'Estimate your tax obligations for the year',
  },
  'income-calculator': {
    title: 'Income Calculator',
    icon: '💵',
    description: 'Calculate your net income after deductions',
  },
  'expense-tracker': {
    title: 'Expense Tracker',
    icon: '📝',
    description: 'Track and categorize your spending habits',
  },
  'currency-converter': {
    title: 'Currency Converter',
    icon: '💱',
    description: 'Convert between MYR and other currencies',
  },
  'loan-calculator': {
    title: 'Loan Calculator',
    icon: '🏦',
    description: 'Calculate monthly payments for personal loans',
  },
  'salary-calculator': {
    title: 'Salary Calculator',
    icon: '💼',
    description: 'Compare gross and net salary amounts',
  },
  'inflation-calculator': {
    title: 'Inflation Calculator',
    icon: '📉',
    description: 'See how inflation affects your purchasing power',
  },
  'retirement-calculator': {
    title: 'Retirement Fund Calculator',
    icon: '🏖️',
    description: 'Plan for a comfortable retirement lifestyle',
  },
  'investment-return': {
    title: 'Investment Return Calculator',
    icon: '💹',
    description: 'Calculate potential returns on your investments',
  },
  'education-fund': {
    title: 'Education Fund Calculator',
    icon: '🎓',
    description: "Save for your children's education expenses",
  },
  'epf-calculator': {
    title: 'EPF Calculator',
    icon: '🏛️',
    description: 'Estimate your EPF savings at retirement age',
  },
  'dividend-calculator': {
    title: 'Dividend Calculator',
    icon: '💸',
    description: 'Calculate passive income from dividend stocks',
  },
  'net-worth-calculator': {
    title: 'Net Worth Calculator',
    icon: '💎',
    description: 'Track your total assets and liabilities',
  },
  'fire-calculator': {
    title: 'FIRE Calculator',
    icon: '🔥',
    description: 'Calculate when you can achieve financial independence',
  },
  'pension-calculator': {
    title: 'Pension Calculator',
    icon: '👴',
    description: 'Estimate your monthly pension benefits',
  },
  'insurance-needs': {
    title: 'Insurance Needs Calculator',
    icon: '🛡️',
    description: 'Calculate life insurance coverage required',
  },
  'home-affordability': {
    title: 'Home Affordability Calculator',
    icon: '🏠',
    description: 'Determine how much house you can afford',
  },
  'car-loan': {
    title: 'Car Loan Calculator',
    icon: '🚗',
    description: 'Calculate monthly payments for your vehicle',
  },
  'wedding-budget': {
    title: 'Wedding Budget Calculator',
    icon: '💍',
    description: 'Plan and track expenses for your big day',
  },
  'mortgage-calculator': {
    title: 'Mortgage Calculator',
    icon: '🏡',
    description: 'Calculate home loan payments and interest',
  },
  'renovation-budget': {
    title: 'Renovation Budget Calculator',
    icon: '🔨',
    description: 'Plan costs for home improvements',
  },
  'property-tax': {
    title: 'Property Tax Calculator',
    icon: '🏘️',
    description: 'Estimate annual property tax obligations',
  },
  'moving-costs': {
    title: 'Moving Costs Calculator',
    icon: '📦',
    description: 'Calculate expenses for relocating homes',
  },
  'down-payment': {
    title: 'Down Payment Calculator',
    icon: '💰',
    description: 'Calculate savings needed for property purchase',
  },
  'rent-vs-buy': {
    title: 'Rent vs Buy Calculator',
    icon: '⚖️',
    description: 'Compare costs of renting vs buying a home',
  },
};

function EmergencyFundCalculator() {
  const { language } = useLanguage();
  const t = translations.emergencyFund[language];
  
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [selectedMonths, setSelectedMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState('');

  const expenses = parseFloat(monthlyExpenses) || 0;
  const savings = parseFloat(currentSavings) || 0;
  const targetAmount = expenses * selectedMonths;
  const remainderToSave = Math.max(0, targetAmount - savings);

  const getMotivationalMessage = () => {
    if (remainderToSave === targetAmount) {
      return t.motivational.goodStart;
    } else if (remainderToSave > targetAmount * 0.5) {
      return t.motivational.goodProgress;
    } else if (remainderToSave > 0) {
      return t.motivational.almostThere;
    } else {
      return t.motivational.complete;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 md:p-6 transition border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 dark:border-white/10">
        <h2 className="mb-3 text-xl font-bold">{t.whatIsTitle}</h2>
        <p className="text-sm md:text-base leading-relaxed opacity-90">
          {t.whatIsContent}
        </p>
      </div>

      <div className="p-4 md:p-6 transition border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 dark:border-white/10">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              {t.monthlyExpenses}
            </label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder={t.monthlyExpensesPlaceholder}
              className="w-full px-4 py-3 text-base transition border rounded-lg bg-white/20 border-gray-800/10 backdrop-blur-lg dark:bg-black/20 dark:border-white/10 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block mb-3 text-sm font-medium">
              {t.targetMonths}
            </label>
            <div className="space-y-3">
              {[1, 3, 6].map((months) => (
                <label
                  key={months}
                  className="flex items-start p-3 md:p-4 transition border rounded-lg cursor-pointer bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30"
                >
                  <input
                    type="radio"
                    name="months"
                    value={months}
                    checked={selectedMonths === months}
                    onChange={(e) => setSelectedMonths(parseInt(e.target.value))}
                    className="mt-1 w-4 h-4"
                  />
                  <div className="flex-1 ml-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{t.months[months]}</span>
                      {months === 6 && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                          {t.recommended}
                        </span>
                      )}
                    </div>
                    {t.messages[months] && (
                      <p className="mt-1 text-xs md:text-sm opacity-70">
                        {t.messages[months]}
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              {t.currentSavings}
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder={t.currentSavingsPlaceholder}
              className="w-full px-4 py-3 text-base transition border rounded-lg bg-white/20 border-gray-800/10 backdrop-blur-lg dark:bg-black/20 dark:border-white/10 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {expenses > 0 && (
        <div className="p-4 md:p-6 transition border rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 backdrop-blur-lg">
          <h3 className="mb-4 text-lg md:text-xl font-bold">{t.targetAmount}</h3>
          <div className="mb-6 text-3xl md:text-4xl font-bold text-primary">
            {formatCurrency(targetAmount)}
          </div>
          
          {remainderToSave > 0 && (
            <div className="mb-4 pb-4 border-b border-primary/20">
              <p className="mb-2 text-sm opacity-70">{t.stillNeedToSave}</p>
              <div className="text-2xl md:text-3xl font-bold">
                {formatCurrency(remainderToSave)}
              </div>
            </div>
          )}
          
          <p className="text-sm md:text-base font-medium opacity-90">
            {getMotivationalMessage()}
          </p>
        </div>
      )}
    </div>
  );
}

export default function CalculatorPage({ globalData }) {
  const router = useRouter();
  const { id } = router.query;
  const calculator = calculatorDetails[id];

  if (!calculator) {
    return (
      <Layout>
        <SEO
          title={`Calculator Not Found - ${globalData.name}`}
          description="Calculator not found"
        />
        <Header name={globalData.name} />
        <LanguageToggle />
        <main className="w-full">
          <div className="py-20 text-center">
            <h1 className="mb-4 text-3xl lg:text-5xl">Calculator Not Found</h1>
            <p className="mb-8 opacity-70">
              The calculator you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/calculators"
              className="inline-block px-6 py-3 transition rounded-lg bg-primary text-white hover:opacity-80"
            >
              Back to Calculators
            </Link>
          </div>
        </main>
        <Footer copyrightText={globalData.footerText} />
        <GradientBackground
          variant="large"
          className="fixed top-20 opacity-40 dark:opacity-60"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`${calculator.title} - ${globalData.name}`}
        description={calculator.description}
      />
      <Header name={globalData.name} />
      <LanguageToggle />
      <main className="w-full">
        <div className="mb-6">
          <Link
            href="/calculators"
            className="inline-flex items-center text-sm transition opacity-70 hover:opacity-100"
          >
            ← Back to Calculators
          </Link>
        </div>
        
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">{calculator.icon}</div>
          <h1 className="mb-4 text-3xl lg:text-5xl">{calculator.title}</h1>
          <p className="opacity-70">{calculator.description}</p>
        </div>

        {id === 'emergency-fund' ? (
          <EmergencyFundCalculator />
        ) : (
          <div className="p-8 transition border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 dark:border-white/10">
            <div className="py-20 text-center opacity-50">
              <p className="text-lg">
                Calculator functionality will be implemented here
              </p>
              <p className="mt-2 text-sm">
                Add your calculator form and logic in this section
              </p>
            </div>
          </div>
        )}
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

export async function getStaticPaths() {
  const paths = Object.keys(calculatorDetails).map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps() {
  const globalData = getGlobalData();
  return { props: { globalData } };
}
