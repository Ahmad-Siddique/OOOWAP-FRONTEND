import { auth } from "@/auth";
import TradeInformation from "../../_components/TradeInformation";
import axios from "axios";

export default async function Page({ params }) {
     const session = await auth();
     const config = {
       headers: {
         Authorization: `Bearer ${session.user.token}`,
       },
    };
    // console.log(config)
    const tradeinfo = async (id) => {
      const data = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/trade/trade/" + id,
        config
      );
      return data.data;
    };
  const trade = await tradeinfo(params.id);
  console.log(trade)
  // console.log(session);
 
  return <TradeInformation loginInfo={session} trade={trade} />;
}
