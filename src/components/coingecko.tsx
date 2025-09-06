import { useEffect } from "react";

const CoinGeckoWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <coingecko-coin-price-marquee-widget
            coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
            currency="usd"
            background-color="#ffffff"
            font-color="#000000"
            locale="en">
          </coingecko-coin-price-marquee-widget>
        `,
      }}
    />
  );
};

export default CoinGeckoWidget;
