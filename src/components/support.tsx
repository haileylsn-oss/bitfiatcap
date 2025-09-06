import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";

const SupportBot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = '8d05adc4a0b26322e115c3c5b11449d3ab26e675';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';
        s.parentNode.insertBefore(c,s);
      })(document);
    `;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="fixed bottom-[100px] left-5 z-50 flex flex-col items-center space-y-1">
        <a href="mailto:danbraunstein57@gmail.com">
          <button className="p-3 rounded-full shadow-lg bg-blue-800 hover:bg-blue-700 text-white">
            <FaEnvelope />
          </button>
        </a>
        <span className="text-sm text-black font-bold">Email Us</span>
      </div>
    </>
  );
};

export default SupportBot;
