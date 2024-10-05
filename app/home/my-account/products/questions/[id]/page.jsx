import { auth } from "@/auth";
import Products from "../../../_components/QuestionPage";

export default async function Page({ params }) {
  const session = await auth();
  return <Products loginInfo={session} params={params} />;
}
