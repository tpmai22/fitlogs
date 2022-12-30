import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { Outlet, useLoaderData } from "@remix-run/react";

export async function loader({request}: LoaderArgs) {
  const logs = await prisma.fitlog.findMany();
  return json({
    logs
  });
}


export default function FitlogsPage(){
  const logs = useLoaderData<typeof loader>();
  console.log(JSON.stringify(logs));
  return (
    <>
    <div>
      Fitlog List
      {JSON.stringify(logs, null, 2)}
    </div>
    <div>
      <Outlet />      
    </div>
    
    </>
  )
}