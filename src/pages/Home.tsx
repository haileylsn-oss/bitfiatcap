
import Footer from '../Home/footer';
import Header from '../Home/header';
import HelpSection from '../Home/hero2';
import Promotions from '../components/promotions';
import RatesSection from '../components/ratesection';
import SupportBot from '../components/support';
import CoinGeckoWidget from '../components/coingecko';
import PlatformOverview from '../components/PlatformOverview';
import TradingWidgets from '../components/tradingwidgets';
import InvestmentPlans from '../components/investmentplan';

const Home: React.FC = () => {



  return (
    <>
      <Header />
      <HelpSection />

    

    <CoinGeckoWidget/>


      <Promotions />
      <RatesSection />
      <PlatformOverview/>
      <TradingWidgets/>
      <InvestmentPlans/>
      <SupportBot />
      <Footer />
    </>
  );
};

export default Home;
