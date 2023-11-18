import axios from "axios";
import React, { useEffect, useState } from "react";

function LatestClients() {
  const [clients, setClients] = useState([]); // Initially, there is no data
  const getRecentClients = async () => {
    try {
      const res = await axios.get(`/api/v1/users/clients?limited=5`);
      if (res.data.success) {
        setClients(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecentClients();
  }, []);
  return (
    <div className="ChartTransactions w-full md:w-6/12 h-auto px-6 py-6 bg-white rounded-2xl flex-col justify-start items-start gap-6 ">
      <div className="Top self-stretch justify-between items-start inline-flex">
        <div className="LatestTransactions text-black text-xl font-black">
          Latest Clients
        </div>
        <div className="IconsThreeDots w-6 h-6 relative" />
      </div>
      <div className=" self-stretch grow shrink basis-0 flex-col justify-start items-start gap-2.5 flex">
        {clients && clients.length > 0 &&
          clients.map((item, idx) => (
            <>
              <div
                className=" self-stretch grow shrink basis-0 py-2.5 justify-start items-center gap-5 inline-flex  flex-col sm:flex-row"
                key={idx}
              >
                <div className="justify-start items-start gap-5 flex">
                <div className="h-12 w-12 border-2 border-black overflow-hidden rounded-full">
                        <img src={item.pic} alt="Client Pic"></img>
                      </div>
                  <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="TransferToJohdi">
                      <span className="text-indigo-600 text-base font-extrabold ">
                        {item.name}
                      </span>
                    </div>
                    <div className="PersonalPayment text-gray-400 text-sm font-bold">
                      {item.businessName}
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-11 pl-2.5 py-2.5 justify-start items-start gap-2.5 flex">
                  <div className="3500 grow shrink basis-0 self-stretch text-right text-red-500 text-lg font-extrabold font-['Mulish']">
                    {item.serviceDuration}
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default LatestClients;
